import { join } from 'path';
import { Model } from 'objection';

export default class User extends Model {
  static tableName = 'users';

  $parseJson(json, options) {
    const parsed = super.$parseJson(json, options);
    return {
      ...parsed,
      ...(parsed.name && { name: parsed.name.trim() }),
    };
  }

  fullName() {
    return this.$pick('firstName') + ' ' + this.$pick('lastName');
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        id: { type: 'integer' },
        roleId: { type: 'integer' },
        email: { type: 'string', format: 'email' },
        passwordDigest: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        createdAt: { type: 'Date' },
        updatedAt: { type: 'Date' },
        oauthDigest: { type: 'string' },
      },
    };
  }

  static get relationMappings() {
    return {
      roles: {
        relation: Model.HasOneRelation,
        modelClass: join(__dirname, 'AclRole'),
        join: {
          from: 'users.id',
          to: 'acl_role.id',
        },
      },
      permissions: {
        relation: Model.ManyToManyRelation,
        modelClass: join(__dirname, 'AclPermission.ts'),
        join: {
          from: 'users.id',
          through: {
            from: 'role_permission.roleId',
            to: 'role_permission.permissionId',
          },
          to: 'acl_permissions.id',
        },
      },
    };
  }
}
