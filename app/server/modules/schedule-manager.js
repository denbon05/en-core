// @ts-check
import { parentPort } from 'worker_threads';
import { schedule } from 'node-cron';
import debug from 'debug';
import queue from 'queue';
import moment from 'moment';
import appMode from '../config/mode';
import prisma from './prisma';

const MAX_POOL_AT_ONCE = 3;

const log = debug('app:worker:schedule-auto-manager');
const q = queue({ concurrency: MAX_POOL_AT_ONCE, autostart: true });

// TODO remove old data

/**
 * Fullfil users' regular schedules.
 */
const fullfilUserSchedules = async () => {
  const now = moment();

  // fetch all users' identifiers with unavailable regular
  // times for the last week
  const users = await prisma.user.findMany({
    select: {
      id: true,
      schedule: {
        select: {
          userUnavailable: {
            where: {
              NOT: {
                type: 'ONCE',
              },
              AND: {
                since: {
                  lte: now.subtract(1, 'week').toISOString(),
                  gte: now.toISOString(),
                },
              },
            },
            select: {
              since: true,
              until: true,
              type: true,
              scheduleId: true,
            },
            orderBy: {
              since: 'asc', // older first
            },
          },
        },
      },
    },
  });

  // re-insert regular unavailable times
  users.forEach(({ schedule }) => {
    if (!schedule?.userUnavailable) {
      return;
    }

    // add to queue update all unavailable times for the user
    // for the next week
    q.push(async () => {
      const promises = schedule.userUnavailable.map(
        ({ scheduleId, type, since: prevSince, until: prevUntil }) => {
          const nextSince = moment(prevSince).add(1, 'week').toISOString();
          const nextUntil = moment(prevUntil).add(1, 'week').toISOString();

          return prisma.userUnavailable.createMany({
            data: {
              since: nextSince,
              until: nextUntil,
              type,
              scheduleId,
            },
          });
        }
      );

      return await Promise.all(promises);
    });
  });
};

/**
 * Fulfilling schedules on specific time.
 * @param {string} cronExpression Each 5 days by default.
 */
const enableAutoManager = (cronExpression = '0 0 */5 * *') =>
  schedule(
    cronExpression,
    async () => {
      try {
        await fullfilUserSchedules();
      } catch (err) {
        log('Error during fulfilling schedules %O', err);
      }
    },
    {
      timezone: 'Europe/Berlin',
      runOnInit: !appMode.isProd,
    }
  );

/**
 * @type {import("node-cron").ScheduledTask}
 */
let task;

parentPort?.on('message', (key) => {
  switch (key) {
    case 'enable':
      q.start();
      task = enableAutoManager();
      break;
    case 'disable':
      q.stop();
      task?.stop();
      break;
    default:
      throw new Error(`There is no such key for schedule manager "${{ key }}"`);
  }
});

parentPort?.postMessage('Auto fullfil regular schedules enabled');
