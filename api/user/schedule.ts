import debug from 'debug';
import { sortBy } from 'lodash';
import prisma from '../../server/modules/prisma';
import { events as fetchUserGoogleCalendarEvents } from '../google/calendar';
import { FetchParam, FetchReturn, ScheduledTime } from '@/types/api/schedule';
import { UserData } from '@/types/api/user';
import { UserUnavailableType } from '@prisma/client';

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
  { timeMin, timeMax }: FetchParam,
  userData: UserData
): FetchReturn {
  const { id } = userData;
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      schedule: {
        select: {
          userUnavailable: {
            select: {
              since: true,
              until: true,
              type: true,
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
    (!user?.schedule?.userUnavailable && !user.google?.calendarIds.length)
  ) {
    // there is no scheduled time for the user
    return {
      isSuccess: true,
      scheduledTime: [],
    };
  }

  const { google, schedule } = user;
  let scheduledTime: ScheduledTime[] =
    sortBy(schedule?.userUnavailable, 'since') ?? [];

  if (google?.calendarIds.length) {
    // user has synced google calendars
    try {
      const { isSuccess, events, message } =
        await fetchUserGoogleCalendarEvents({ timeMax, timeMin }, userData);

      if (!isSuccess) {
        // avoid google calendar events
        log('Fail to fetch google calendar events %O', { message, userId: id });
      } else {
        const googleScheduled: ScheduledTime[] = events!.map(
          ({ start, end }) => ({
            since: new Date(start),
            until: new Date(end),
            type: UserUnavailableType.ONCE,
          })
        );
        scheduledTime = sortBy([...scheduledTime, ...googleScheduled], 'since');
      }
    } catch (err) {
      // avoid google calendar events
      log('Error during fetching google events %O', err);
    }
  }

  return {
    scheduledTime,
    isSuccess: true,
  };
}
