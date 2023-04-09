import { User, UserUnavailable } from '@prisma/client';
import { DateRange } from 'moment-range';
import { unitOfTime } from 'moment';
import type { ApiReturn } from './common';
import { CalendarEventsParam } from './google';

export type SpreadTimeParam = {
  range: DateRange;
  since: { hours: number; minutes: number };
  until: { hours: number; minutes: number };
  interval: unitOfTime.Diff;
};

export type ScheduledTime = Pick<UserUnavailable, 'since' | 'until'>;
export type ScheduledTimeWithType = ScheduledTime &
  Partial<Pick<UserUnavailable, 'type'>>;

type FetchedUnavailable = ApiReturn & {
  scheduledTime: ScheduledTime[];
};

export type FetchReturn = Promise<FetchedUnavailable>;

export type FetchParam = CalendarEventsParam & {
  userId: User['id'];
};
