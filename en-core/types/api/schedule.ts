import {
  LessonType,
  User,
  UserUnavailable,
  UserUnavailableType,
} from '@prisma/client';
import { unitOfTime } from 'moment';
import { DateRange } from 'moment-range';
import type { ApiReturn } from './common';
import { CalendarEventsParam } from './google';

export type SpreadTimeParam = {
  range: DateRange;
  since: { hours: number; minutes: number } | Date;
  until: { hours: number; minutes: number } | Date;
  interval: unitOfTime.Diff;
};

export type ScheduledTime = Pick<UserUnavailable, 'since' | 'until'>;

export type ISOScheduledTime = {
  [key in keyof ScheduledTime]: string;
};

export type ScheduledTimeWithType = ScheduledTime & {
  type?: Partial<UserUnavailableType | LessonType>;
};

type FetchedUnavailable = ApiReturn & {
  scheduledTimes: ISOScheduledTime[];
};

export type FetchReturn = Promise<FetchedUnavailable>;

export type FetchParam = CalendarEventsParam & {
  userId: User['id'];
};
