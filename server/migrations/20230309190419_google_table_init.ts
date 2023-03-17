import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('google', (table) => {
    table.increments('id').primary();
    table.jsonb('oauth');
    table.string('calendar_id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('google');
}
