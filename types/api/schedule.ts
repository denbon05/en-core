import { UserUnavailable } from '@prisma/client';
import type { ApiReturn } from './common';
import { CalendarEventsParam } from './google';

export type ScheduledTime = Pick<UserUnavailable, 'since' | 'until' | 'type'>;

type FetchedUnavailable = ApiReturn & {
  scheduledTime: ScheduledTime[];
};

export type FetchReturn = Promise<FetchedUnavailable>;

export type FetchParam = CalendarEventsParam;
