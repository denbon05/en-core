import { UserUnavailableType } from '@prisma/client';
import debug from 'debug';
import prisma from '../../server/modules/prisma';
import { spreadTime } from '../../server/utils/schedule';
import { events as fetchUserGoogleCalendarEvents } from '../google/calendar';
import { UserData } from '@/types/api/user';
import {
  FetchParam,
  FetchReturn,
  ISOScheduledTime,
  ScheduledTime,
  ScheduledTimeWithType,
} from '@/types/api/schedule';

// TODO change to import after https://github.com/rotaready/moment-range/issues/295
const m = require('moment');
const MomentRange = require('moment-range');

const moment = MomentRange.extendMoment(m);

const log = debug('app:api:user:schedule');

// TODO CHANGE to schedule and Implement
// export async function update<
//   T1 extends CalendarTimeRange,
//   T2 extends CalendarTimeRange
// >(calendarData: CalendarUpdateConfigParam<T1, T2>, userData: UserData) {
//   if (!userData) {
//     return {
//       isSuccess: false,
//       message: 'Authenticate first',
//     };
//   }
//   const { id } = userData;

//   await prisma.user.update({
//     where: { id },
//     data: {
//       userSchedule: {
//         upsert: {
//           create: calendarData,
//           update: calendarData,
//         },
//       },
//     },
//   });

//   return {
//     isSuccess: true,
//   };
// }

export async function fetch(
  { timeMin, timeMax, userId }: FetchParam,
  // user can be unauthorized
  userData: UserData
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
                    lte: timeMax,
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

  if (
    !user ||
    (!user.schedule?.userUnavailable && !user.google?.calendarIds.length)
  ) {
    log('there is no scheduled time for the user %O', user);
    // there is no scheduled time for the user
    return {
      isSuccess: true,
      scheduledTimes: [],
    };
  }

  const { google, schedule } = user;
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
      // avoid google calendar events
      log('Error during fetching google events %O', err);
    }
  }

  const totalSince = moment(timeMin);
  const totalUntil = moment(timeMax);
  const isTotalRangeBiggerThanWeek =
    moment.duration(totalUntil.diff(totalSince)).asDays() > 7;
  const totalRange = moment.range(totalSince, totalUntil).snapTo('days');
  const scheduledTimes: ISOScheduledTime[] = scheduledTimeMixed.flatMap(
    ({ since, until, type }): ISOScheduledTime | ISOScheduledTime[] => {
      if (!type || type === UserUnavailableType.ONCE) {
        // google or single event
        return { since: since.toISOString(), until: until.toISOString() };
      }
      // in case there are regular scheduled times - spread it
      // ? spread time on the client in order to reduce network load

      const sinceTime = {
        hours: moment(since).get('hours'),
        minutes: moment(since).get('minutes'),
      };
      const untilTime = {
        hours: moment(until).get('hours'),
        minutes: moment(until).get('minutes'),
      };

      if (type === UserUnavailableType.WEEKLY && isTotalRangeBiggerThanWeek) {
        // each week the same unavailable time
        return spreadTime({
          range: totalRange,
          since: sinceTime,
          until: untilTime,
          interval: 'week',
        });
      }

      // daily regular unavailable time
      return spreadTime({
        range: totalRange,
        since: sinceTime,
        until: untilTime,
        interval: 'day',
      });
    }
  );
  console.log({ scheduledTimes });

  return {
    scheduledTimes,
    isSuccess: true,
  };
}
