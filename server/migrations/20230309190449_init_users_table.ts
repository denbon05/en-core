import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.string('first_name');
    table.string('last_name');
    table.increments('id').primary();
    table.string('email').unique();
    table.string('password_digest');
    table.timestamp('created_at', { useTz: false }).defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: false }).defaultTo(knex.fn.now());
    table.integer('role_id').defaultTo(5); // guest
    table.integer('google_id');
    table
      .foreign('google_id')
      .references('id')
      .inTable('google')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table
      .foreign('role_id')
      .references('id')
      .inTable('acl_roles')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
}
