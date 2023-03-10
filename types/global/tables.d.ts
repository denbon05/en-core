import { Knex } from 'knex';

declare module 'knex/types/tables' {
  interface User {
    first_name: string;
    last_name: string;
    id: number;
    email: string;
    password_digest: string;
    created_at: Date;
    updated_at: Date;
    role_id: number;
    oauth_digest: string | null;
  }

  interface ACLRole {
    id: number;
    name: string;
  }

  interface ACLPermission {
    id: number;
    name: string;
  }

  interface RolePermission {
    role_id: number;
    permission_id: number;
  }

  interface Tables {
    users: User;
    users_composite: Knex.CompositeTableType<
      User,
      // insert
      Partial<Omit<User, 'id' | 'created_at'>>,
      // update
      Partial<Omit<User, 'id' | 'created_at'>>
    >;

    acl_roles: ACLRole;
    acl_roles_composite: Knex.CompositeTableType<
      ACLRole,
      Omit<ACLRole, 'id'>
      // update by default as insert
    >;

    acl_permissions: ACLPermission;
    acl_permissions_composite: Knex.CompositeTableType<ACLRole>;

    role_permission: RolePermission;
  }
}
