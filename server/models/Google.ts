import { join } from 'path';
import { Model, ModelOptions, Modifiers, Pojo } from 'objection';
import { decryptData, encryptData } from '../modules/crypto';
import { EncryptedData } from '@/types/utils/crypto';

export default class Google extends Model {
  static tableName = 'google';

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        calendarId: { type: ['string', 'null'] },
        oauth: {
          type: ['object', 'null'],
          additionalProperties: false,
          properties: {
            encrypted: { type: 'string' },
            key: { type: 'string' },
            iv: { type: 'string' },
          },
        },
      },
    };
  }

  $parseJson(json: Pojo, options: ModelOptions): Pojo {
    const parsed = super.$parseJson(json, options);
    console.log('Google parseJson INSERT', { parsed });
    const { oauth } = parsed;

    let oauthEncrypted: EncryptedData;
    if (oauth) {
      oauthEncrypted = encryptData(oauth);
    }
    console.log('Google parseJson 2', { oauth: oauthEncrypted });

    return {
      ...parsed,
      ...(oauth && { oauth: oauthEncrypted }),
    };
  }

  $parseDatabaseJson(json: Pojo): Pojo {
    const formattedJson = super.$formatJson(json);
    console.log('Google parseDatabaseJson FETCH', { formattedJson });
    const { oauth: oauthEncrypted } = formattedJson;
    return {
      ...formattedJson,
      ...(oauthEncrypted && { oauth: decryptData(oauthEncrypted) }),
    };
  }

  static get modifiers(): Modifiers {
    return {
      getCalendarId(qb) {
        qb.select('calendarId');
      },
    };
  }

  // static get relationMappings() {
  //   return {
  //     users: {
  //       relation: Model.HasOneRelation,
  //       modelClass: join(__dirname, 'User.ts'),
  //       join: {
  //         from: 'google.id',
  //         to: 'user.googleId',
  //       },
  //     },
  //   };
  // }
}
