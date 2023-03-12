import { join } from 'path';
import { Model, Modifiers } from 'objection';

export default class AclPermission extends Model {
  static tableName = 'acl_permissions';

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

  static get modifiers(): Modifiers {
    return {
      getName(qb) {
        qb.select('name');
      },
    };
  }

  static get relationMappings() {
    return {
      permissions: {
        relation: Model.ManyToManyRelation,
        modelClass: join(__dirname, 'AclRole.ts'),
        join: {
          from: 'acl_permissions.id',
          through: {
            from: 'role_permission.permissionId',
            to: 'role_permission.roleId',
          },
          to: 'acl_roles.id',
        },
      },
    };
  }
}
