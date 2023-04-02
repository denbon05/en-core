import { UserUnavailable } from '@prisma/client';
import type { ApiReturn } from './common';
import { CalendarEventsParam } from './google';

export type ScheduledTime = Pick<UserUnavailable, 'since' | 'until' | 'type'>;

type FetchedUnavailable = ApiReturn & {
  scheduledTime: ScheduledTime[];
};

export type FetchReturn = Promise<FetchedUnavailable>;

export type FetchParam = CalendarEventsParam;

// export type CalendarTimeRange = Calendar['unavailableTimeRanges'][number];

// export type TimeFormat<T extends CalendarTimeRange = CalendarTimeRange> =
//   T extends `${infer _Ch1}${infer _Ch2}:${infer _Ch3}${infer _Ch4}` ? T : never;

// export type TimeRangeFormat<
//   T1 extends CalendarTimeRange = CalendarTimeRange,
//   T2 extends CalendarTimeRange = CalendarTimeRange
// > = T1 extends TimeFormat<T1>
//   ? T2 extends TimeFormat<T2>
//     ? `${T1}-${T2}`
//     : never
//   : never;

// /**
//  * Time rage format 'HH:mm-HH:mm'
//  */
// export type CalendarUpdateConfigParam<
//   TR1 extends CalendarTimeRange,
//   TR2 extends CalendarTimeRange
// > = {
//   selectedTimeRanges: TimeRangeFormat<TR1, TR2>[];
//   unavailableTimeRanges: TimeRangeFormat<TR1, TR2>[];
// };
