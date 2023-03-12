import { join } from 'path';
import {
  AnyQueryBuilder,
  JSONSchema,
  Model,
  ModelOptions,
  Modifiers,
  Pojo,
  RelationMappings,
} from 'objection';

export default class User extends Model {
  static tableName = 'users';

  $parseJson(json: Pojo, options: ModelOptions): Pojo {
    const parsed = super.$parseJson(json, options);
    return {
      ...parsed,
      ...(parsed.name && { name: parsed.name.trim() }),
    };
  }

  static modifiers: Modifiers<AnyQueryBuilder> = {
    withRole(qb) {
      qb.select(
        'users.id',
        'email',
        'firstName',
        'lastName',
        'oauthDigest'
      ).withGraphJoined('[roles as role]', {
        maxBatchSize: 1,
      });
    },
  };

  static get jsonSchema(): JSONSchema {
    return {
      type: 'object',
      required: ['email', 'passwordDigest'],
      properties: {
        id: { type: 'integer' },
        roleId: { type: 'integer' },
        email: { type: 'string' },
        passwordDigest: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
        oauthDigest: { type: 'string' },
      },
    };
  }

  static get relationMappings(): RelationMappings {
    return {
      roles: {
        relation: Model.HasOneRelation,
        modelClass: join(__dirname, 'AclRole.ts'),
        join: {
          from: 'users.roleId',
          to: 'acl_roles.id',
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
