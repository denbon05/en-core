/* eslint-disable no-console */
// import debug from 'debug';
import prisma from '../../server/modules/prisma';
import { UserData } from '@/types/api/user';
import { FetchParam, FetchReturn } from '@/types/api/schedule';

// const log = debug('app:api:calendar');

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
          userUnavailable: true,
        },
      },
    },
  });

  return {
    // schedule: user!.schedule, // todo
    isSuccess: true,
  };
}
