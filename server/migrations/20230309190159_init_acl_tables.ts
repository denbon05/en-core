import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('acl_permissions', (table) => {
    table.increments('id').primary();
    table.string('name').unique();
  });

  await knex.schema.createTable('acl_roles', (table) => {
    table.increments('id').primary();
    table.string('name').unique();
  });

  await knex.schema.createTable('role_permission', (table) => {
    table.integer('role_id').notNullable();
    table.integer('permission_id').notNullable();
    table
      .foreign('role_id')
      .references('id')
      .inTable('acl_roles')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table
      .foreign('permission_id')
      .references('id')
      .inTable('acl_permissions')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.unique(['role_id', 'permission_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('role_permission');
  await knex.schema.dropTable('acl_permissions');
  await knex.schema.dropTable('acl_roles');
}
