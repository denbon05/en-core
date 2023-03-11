import { join } from 'path';
import { Model } from 'objection';

export default class AclRole extends Model {
  static tableName = 'acl_roles';

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
      },
    };
  }

  static get relationMappings() {
    return {
      permissions: {
        relation: Model.ManyToManyRelation,
        modelClass: join(__dirname, 'AclPermission.ts'),
        join: {
          from: 'acl_roles.id',
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
