import { LessonType, User, UserLessons } from '@prisma/client';

export type LessonData = Pick<UserLessons, 'since' | 'until'>;

export type BookParam = {
  lessonsData: LessonData[];
  tutorId: User['id'];
  type: LessonType;
};
