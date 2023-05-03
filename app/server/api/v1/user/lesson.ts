import type { UserLessons } from '@prisma/client';
import prisma from '../../../modules/prisma';
import { BookParam } from '@/types/api/lesson';
import { UserDataOrNull } from '@/types/api/user';

export async function book(
  { lessonsData, tutorId, type }: BookParam,
  userDataOrNull: UserDataOrNull
) {
  // get tutor schedule
  const tutorSchedule = await prisma.userSchedule.findUniqueOrThrow({
    where: { userId: tutorId },
  });
  // format lessons
  const tutorLessons: Omit<UserLessons, 'id'>[] = lessonsData.map((values) => ({
    scheduleId: tutorSchedule!.id,
    ...values,
    type,
  }));

  if (!userDataOrNull?.id && type === 'TRIAL') {
    // book trial for unauthorized user
    await prisma.userLessons.createMany({
      data: tutorLessons,
    });
    return {
      isSuccess: true,
    };
  }

  // get student schedule
  const studentSchedule = await prisma.userSchedule.findUniqueOrThrow({
    where: { userId: userDataOrNull?.id },
  });
  const studentLessons: Omit<UserLessons, 'id'>[] = tutorLessons.map(
    (values) => ({
      ...values,
      scheduleId: studentSchedule!.id,
    })
  );

  // write all or nothing
  await prisma.$queryRaw`BEGIN;`;
  await prisma.userLessons.createMany({
    data: tutorLessons,
  });
  await prisma.userLessons.createMany({
    data: studentLessons,
  });
  await prisma.$queryRaw`COMMIT;`;

  return {
    isSuccess: true,
  };
}
