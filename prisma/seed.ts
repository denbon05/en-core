/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';
import { hashValue } from '../server/modules/crypto';

const {
  SUPER_ADMIN_EMAIL,
  SUPER_ADMIN_PASS,
  SUPER_ADMIN_FIRST_NAME,
  SUPER_ADMIN_LAST_NAME,
} = process.env;

const prisma = new PrismaClient();

async function main() {
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
      name: 'superadmin',
    },
    {
      id: 2,
      name: 'admin',
    },
    { id: 3, name: 'tutor' },
    { id: 4, name: 'student' },
    { id: 5, name: 'guest' },
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
    // no permissions for guest
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

  await prisma.rolePermissions.createMany({
    data: rolePermission,
    skipDuplicates: true,
  });
  await prisma.user.create({
    data: {
      id: 1,
      email: SUPER_ADMIN_EMAIL as string,
      passwordDigest: hashValue(SUPER_ADMIN_PASS as string),
      firstName: SUPER_ADMIN_FIRST_NAME as string,
      lastName: SUPER_ADMIN_LAST_NAME as string,
      roleId: 1, // superadmin
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
