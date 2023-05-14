import { User } from '@prisma/client';
import { hashValue } from '@/server/modules/crypto';

const users: User[] = [
  {
    id: 10,
    email: 'sam-tutor@gmail.com',
    firstName: 'Sam',
    lastName: 'Altman',
    createdAt: new Date('2023-04-12T16:33:01.317Z'),
    updatedAt: new Date('2023-04-12T16:33:01.317Z'),
    passwordDigest: hashValue('openaiboss'),
  },
];

export default users;
