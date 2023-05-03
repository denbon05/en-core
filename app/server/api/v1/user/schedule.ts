import { UserUnavailableType } from '@prisma/client';
import debug from 'debug';
import { DateRange, MomentRange } from 'moment-range';
import prisma from '../../../modules/prisma';
import { generateUnavailableTimes } from '../../../utils/schedule';
import { events as fetchUserGoogleCalendarEvents } from '../google/calendar';
import { t } from '../../../utils/i18n';
import { UserDataOrNull } from '@/types/api/user';
import {
  FetchParam,
  FetchReturn,
  ISOScheduledTime,
  ScheduledTime,
  ScheduledTimeWithType,
} from '@/types/api/schedule';

// TODO change to import after https://github.com/rotaready/moment-range/issues/295
const m = require('moment');
const momentRange = require('moment-range');

const moment: MomentRange = momentRange.extendMoment(m);

const log = debug('app:api:user:schedule');

export async function fetch(
  { timeMin, timeMax, userId }: FetchParam,
  // user can be unauthorized
  userData: UserDataOrNull
): FetchReturn {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      schedule: {
        select: {
          userUnavailable: {
            select: {
              since: true,
              until: true,
              type: true,
            },
            where: {
              OR: [
                {
                  since: {
                    gte: timeMin,
                  },
                  until: {
                    lt: timeMax,
                  },
                },
                { type: UserUnavailableType.DAILY },
                { type: UserUnavailableType.WEEKLY },
              ],
            },
            orderBy: {
              since: 'asc',
            },
          },
          userLesson: {
            select: {
              since: true,
              until: true,
              type: true,
            },
            where: {
              OR: [
                { type: 'WEEKLY' },
                {
                  AND: [
                    {
                      since: {
                        gte: timeMin,
                      },
                    },
                    { until: { lt: timeMax } },
                  ],
                },
              ],
            },
          },
        },
      },
      google: {
        select: {
          calendarIds: true,
          oauth: true,
        },
      },
    },
  });

  if (!user) {
    return {
      isSuccess: false,
      scheduledTimes: [],
    };
  }

  const { schedule, google } = user;

  if (
    !schedule?.userUnavailable &&
    !google?.calendarIds.length &&
    !schedule?.userLesson.length
  ) {
    log('there is no scheduled time for the user %O', user);
    // there is no scheduled time for the user
    return {
      isSuccess: true,
      scheduledTimes: [],
    };
  }

  const messages: string[] = [];
  // the variable going to collect app's schedule and google data
  let scheduledTimeMixed: ScheduledTimeWithType[] =
    schedule?.userUnavailable ?? [];

  if (userData && google?.calendarIds.length) {
    // the user should be authorized
    // user has synced google calendars
    try {
      const { isSuccess, events, message } =
        await fetchUserGoogleCalendarEvents({ timeMax, timeMin }, userData);

      if (!isSuccess) {
        // avoid google calendar events
        log('Fail to fetch google calendar events %O', { message, userId });
      } else {
        const googleScheduled: ScheduledTime[] = events!.map(
          ({ start, end }) => ({
            since: new Date(start),
            until: new Date(end),
          })
        );
        scheduledTimeMixed = [...scheduledTimeMixed, ...googleScheduled];
      }
    } catch (err) {
      messages.push(t('warn.calendar.google.unreached'));
      // avoid google calendar events
      log('Error during fetching google events %O', err);
    }
  }

  const totalSince = moment(timeMin);
  const totalUntil = moment(timeMax);
  const totalRange: DateRange = moment
    .range(totalSince, totalUntil)
    .snapTo('days');

  const userLessons = schedule?.userLesson ?? [];
  const scheduledTimes: ISOScheduledTime[] = generateUnavailableTimes(
    [...scheduledTimeMixed, ...userLessons],
    totalRange
  );

  return {
    scheduledTimes,
    isSuccess: true,
    message: messages.join('\n'),
  };
}
