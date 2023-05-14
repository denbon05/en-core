import { UnavailableTimesReturn } from '../types/schedule';
import prisma from '@/server/modules/prisma';

/**
 * Fetch min time from seeded data.
 * @param {number} userId should be the same as in seed
 * @returns {string} ISO time format
 */
export const getTimeMin = async (userId: number): Promise<string> => {
  const unavailableTimes = await prisma.userUnavailable.findFirst({
    where: { userSchedule: { userId } },
    select: {
      since: true,
    },
    orderBy: {
      since: 'asc',
    },
  });

  return unavailableTimes!.since.toISOString();
};

export const getUnavailableTimes = async (
  userId: number
): UnavailableTimesReturn => {
  const unavailableTimes = await prisma.userUnavailable.findMany({
    where: { userSchedule: { userId } },
    select: {
      since: true,
      until: true,
    },
  });

  return unavailableTimes;
};
