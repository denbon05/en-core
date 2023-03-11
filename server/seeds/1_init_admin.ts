import { Knex } from 'knex';
import { config } from 'dotenv';
import { hashValue } from '../modules/crypto';

config();

const {
  SUPER_ADMIN_EMAIL,
  SUPER_ADMIN_PASS,
  SUPER_ADMIN_FIRST_NAME,
  SUPER_ADMIN_LAST_NAME,
} = process.env;

export async function seed(knex: Knex): Promise<void> {
  // // Deletes ALL existing entries
  // await knex('users').del();

  // Inserts seed entries
  await knex('users')
    .insert([
      {
        id: 1,
        email: SUPER_ADMIN_EMAIL,
        password_digest: hashValue(SUPER_ADMIN_PASS),
        first_name: SUPER_ADMIN_FIRST_NAME,
        last_name: SUPER_ADMIN_LAST_NAME,
        role_id: 1, // superadmin
      },
    ])
    .onConflict('id')
    .ignore();
}
