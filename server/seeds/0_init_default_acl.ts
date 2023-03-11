import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // // Deletes ALL existing entries
  // await knex('acl_permissions').del();
  // await knex('acl_roles').del();
  // await knex('role_permission').del();

  // Inserts seed entries
  const defaultPermissions = [
    { id: 1, name: 'delete_own_account' },
    { id: 2, name: 'delete_user_account' },
    { id: 3, name: 'create_own_account' },
    { id: 4, name: 'create_user_account' },
    { id: 5, name: 'alter_own_account' },
    { id: 6, name: 'alter_user_account' },
    { id: 7, name: 'alter_own_password' },
    { id: 8, name: 'alter_user_password' },
    { id: 9, name: 'reset_own_password' },
    { id: 10, name: 'reset_user_password' },
    { id: 11, name: 'alter_own_role' },
    { id: 12, name: 'alter_user_role' },
    { id: 13, name: 'alter_acl_role' },
    { id: 14, name: 'alter_own_lesson' },
    { id: 15, name: 'alter_user_lesson' }, // tutor
    { id: 16, name: 'alter_tutor' }, // admin
    { id: 17, name: 'alter_admin' }, // superadmin
  ];
  await knex('acl_permissions')
    .insert(defaultPermissions)
    .onConflict()
    .ignore();

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
  await knex('acl_roles').insert(aclRoles).onConflict('id').ignore();

  // total access for superadmin
  const rolePermissionSuperadmin = defaultPermissions.map(
    ({ id: permission_id }) => ({ permission_id, role_id: 1 })
  );

  // can't manage another admin or superadmin
  const rolePermissionAdmin = defaultPermissions
    .filter(({ name }) => !name.includes('admin'))
    .map(({ id: permission_id }) => ({ permission_id, role_id: 2 }));

  const tutorKeyPattern = /(own|alter_user_lesson)/;
  const rolePermissionTutor = defaultPermissions
    .filter(({ name }) => tutorKeyPattern.test(name) && !name.includes('role'))
    .map(({ id: permission_id }) => ({ permission_id, role_id: 3 }));

  const studentKeyPattern = /(own)/;
  // only access for own account and manage own lesson
  const rolePermissionStudent = defaultPermissions
    .filter(
      ({ name }) => studentKeyPattern.test(name) && !name.includes('role')
    )
    .map(({ id: permission_id }) => ({ permission_id, role_id: 4 }));

  const rolePermission = [
    ...rolePermissionSuperadmin,
    ...rolePermissionAdmin,
    ...rolePermissionTutor,
    ...rolePermissionStudent,
    // no permissions for guest
  ];
  await knex('role_permission').insert(rolePermission).onConflict().ignore();
}
