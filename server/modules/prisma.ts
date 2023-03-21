import debug from 'debug';
import { PrismaClient } from '@prisma/client';
import appMode from '../config/mode';

const log = debug('app:db');

const prisma = new PrismaClient({
  log: appMode.isProd()
    ? ['warn', 'error']
    : ['query', 'info', 'warn', 'error'],
});

(async () => {
  await prisma.$connect();
})()
  .then(() => {
    log('DB connected');
  })
  .catch((err) => {
    log('Connect db err %O', err);
    prisma.$disconnect();
    process.exit(1);
  });

export default prisma;

process.on('close', () => {
  prisma.$disconnect();
});
