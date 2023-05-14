import { UserMessage } from '@prisma/client';

export type SendParam = Pick<UserMessage, 'email' | 'message' | 'name'> &
  Partial<Pick<UserMessage, 'userId'>>;
