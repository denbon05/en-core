import { UserUnavailable } from '@prisma/client';

export type UnavailableTimes = Pick<UserUnavailable, 'since' | 'until'>[];

export type UnavailableTimesReturn = Promise<UnavailableTimes>;
