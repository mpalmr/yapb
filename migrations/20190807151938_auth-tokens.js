'use strict';

exports.up = async function (knex) {
  return knex.schema.createTable('auth_tokens', (table) => {
    table
      .increments('id')
      .primary();

    table
      .integer('user_id')
      .unsigned()
      .notNullable();
    table
      .foreign('user_id')
      .references('users.id');

    table
      .specificType('token', 'CHAR(128)')
      .notNullable();

    table.boolean('deactivated');

    table
      .datetime('expires_at')
      .defaultTo(knex.fn.now());

    table.timestamps(true, true);
  });
};


exports.down = async function (knex) {
  return knex.schema.dropTableIfExists('auth_tokens');
};
