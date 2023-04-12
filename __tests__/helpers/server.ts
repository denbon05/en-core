import schedules from '@/__fixtures__/user-schedule';
import userUnavailable from '@/__fixtures__/user-unavailable';
import users from '@/__fixtures__/users';
import prisma from '@/server/modules/prisma';

export const seedDB = async () => {
  await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });
  await prisma.userSchedule.createMany({
    data: schedules,
    skipDuplicates: true,
  });
  await prisma.userUnavailable.createMany({
    data: userUnavailable,
    skipDuplicates: true,
  });
};

export const prepareDB = async () => {
  await seedDB();
};
