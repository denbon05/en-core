import { PrismaClient, Role, UserUnavailableType } from '@prisma/client';
import appMode from '../server/config/mode';
import { hashValue } from '../server/modules/crypto';

const {
  SUPER_ADMIN_EMAIL,
  SUPER_ADMIN_PASS,
  SUPER_ADMIN_FIRST_NAME,
  SUPER_ADMIN_LAST_NAME,
} = process.env;

const prisma = new PrismaClient();

async function main() {
  if (appMode.isDev()) {
    await prisma.google.deleteMany();
    await prisma.aclPermission.deleteMany();
    await prisma.aclRole.deleteMany();
    await prisma.rolesPermissions.deleteMany();
    await prisma.userUnavailable.deleteMany();
    await prisma.userSchedule.deleteMany();
    await prisma.userRoles.deleteMany();
    await prisma.user.deleteMany();
  }

  const defaultPermissions = [
    { id: 1, name: 'delete_own_account' },
    { id: 2, name: 'delete_user_account' },
    { id: 5, name: 'create_user_account' },
    { id: 6, name: 'alter_own_account' },
    { id: 7, name: 'alter_user_account' },
    { id: 8, name: 'alter_own_password' },
    { id: 9, name: 'alter_user_password' },
    { id: 10, name: 'reset_own_password' },
    { id: 11, name: 'reset_user_password' },
    { id: 12, name: 'alter_own_role' },
    { id: 13, name: 'alter_user_role' },
    { id: 14, name: 'alter_acl_role' },
    { id: 15, name: 'alter_own_lesson' },
    { id: 16, name: 'alter_user_lesson' }, // tutor
    { id: 17, name: 'alter_tutor' }, // admin
    { id: 18, name: 'alter_admin' }, // superadmin
  ];

  const aclRoles = [
    {
      id: 1,
      name: Role.SUPERADMIN,
    },
    {
      id: 2,
      name: Role.ADMIN,
    },
    { id: 3, name: Role.TUTOR },
    { id: 4, name: Role.STUDENT },
    { id: 5, name: Role.GUEST },
  ];

  // total access for superadmin
  const rolePermissionSuperadmin = defaultPermissions.map(
    ({ id: permissionId }) => ({ permissionId, roleId: 1 })
  );

  // can't manage another admin or superadmin
  const rolePermissionAdmin = defaultPermissions
    .filter(({ name }) => !name.includes('admin'))
    .map(({ id: permissionId }) => ({ permissionId, roleId: 2 }));

  const tutorKeyPattern = /(own|alter_user_lesson)/;
  const rolePermissionTutor = defaultPermissions
    .filter(({ name }) => tutorKeyPattern.test(name) && !name.includes('role'))
    .map(({ id: permissionId }) => ({ permissionId, roleId: 3 }));

  const studentKeyPattern = /(own)/;
  // only access for own account and manage own lesson
  const rolePermissionStudent = defaultPermissions
    .filter(
      ({ name }) => studentKeyPattern.test(name) && !name.includes('role')
    )
    .map(({ id: permissionId }) => ({ permissionId, roleId: 4 }));

  const rolePermission = [
    ...rolePermissionSuperadmin,
    ...rolePermissionAdmin,
    ...rolePermissionTutor,
    ...rolePermissionStudent,
    // permissions for guest create_user_account
    { permissionId: 5, roleId: 5 },
  ];

  // Insert data
  await prisma.aclPermission.createMany({
    data: defaultPermissions,
    skipDuplicates: true,
  });

  await prisma.aclRole.createMany({
    data: aclRoles,
    skipDuplicates: true,
  });

  await prisma.rolesPermissions.createMany({
    data: rolePermission,
    skipDuplicates: true,
  });
  await prisma.user.create({
    data: {
      id: 1,
      email: SUPER_ADMIN_EMAIL!,
      passwordDigest: hashValue(SUPER_ADMIN_PASS!),
      firstName: SUPER_ADMIN_FIRST_NAME!,
      lastName: SUPER_ADMIN_LAST_NAME!,
      roles: {
        create: {
          roleId: 1,
          name: Role.SUPERADMIN,
        },
      },
      schedule: {
        create: {
          userUnavailable: {
            createMany: {
              data: [
                {
                  since: new Date('2023-04-06T00:00:00'),
                  until: new Date('2023-04-06T08:00:00'),
                  type: UserUnavailableType.DAILY,
                },
                {
                  since: new Date('2023-04-06T19:00:00'),
                  until: new Date('2023-04-06T23:59:00'),
                  type: UserUnavailableType.DAILY,
                },
              ],
            },
          },
        },
      },
    },
  });

  if (appMode.isDev()) {
    // make superadmin tutor in dev mode
    await prisma.userRoles.create({
      data: {
        userId: 1,
        roleId: 3,
        name: Role.TUTOR,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
