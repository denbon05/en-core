import { UserUnavailable } from '@prisma/client';

const userUnavailable: UserUnavailable[] = [
  {
    id: 10,
    scheduleId: 10, // tutor Sam
    since: new Date('2023-04-06 00:00:00.000 +0200'),
    until: new Date('2023-04-06 08:00:00.000 +0200'),
    type: 'DAILY',
  },
  {
    id: 10,
    scheduleId: 10, // tutor Sam
    since: new Date('2023-04-06 20:00:00.000 +0200'),
    until: new Date('2023-04-06 23:59:00.000 +0200'),
    type: 'DAILY',
  },
];

export default userUnavailable;
