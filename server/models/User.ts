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
import { hashValue } from '../modules/crypto';

export default class User extends Model {
  static tableName = 'users';

  $parseJson(json: Pojo, options: ModelOptions): Pojo {
    const parsed = super.$parseJson(json, options);
    console.log('parseJson INSERT', { parsed });
    const { firstName, lastName, password } = parsed;

    return {
      ...parsed,
      ...(firstName && { firstName: firstName.trim() }),
      ...(lastName && { lastName: lastName.trim() }),
      ...(password && { passwordDigest: hashValue(password) }),
    };
  }

  static modifiers: Modifiers<AnyQueryBuilder> = {
    withRole(qb) {
      qb.select('users.id', 'email', 'firstName', 'lastName').withGraphJoined(
        '[roles as role]',
        {
          maxBatchSize: 1,
        }
      );
    },
    withGoogle(qb, id) {
      console.log('withGoogle', { id });
      qb.select('oauth', 'calendarId')
        .withGraphJoined('google', {
          maxBatchSize: 1,
        })
        .where({ id });
    },
  };

  static get jsonSchema(): JSONSchema {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        roleId: { type: 'integer' },
        email: { type: 'string' },
        passwordDigest: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
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
      google: {
        relation: Model.HasOneRelation,
        modelClass: join(__dirname, 'Google.ts'),
        join: {
          from: 'user.googleId',
          to: 'google.id',
        },
      },
    };
  }
}
