'use strict';

exports.up = async function up(knex) {
  // Create users table
  return knex.schema
    .createTable('users', (table) => {
      table
        .increments('id')
        .primary();

      table
        .uuid('uuid')
        .defaultTo(knex.raw('uuid_generate_v4()'))
        .notNullable();

      table
        .string('email', 320)
        .unique()
        .notNullable();

      table
        .specificType('password', 'CHAR(95)')
        .notNullable();

      table.string('github_url', 2083);
      table.timestamps(true, true);
    })

    // Add user_id as FK to pastes table
    .then(() => knex.schema.alterTable('pastes', (table) => {
      table
        .integer('user_id')
        .unsigned();

      table
        .foreign('user_id')
        .references('users.id');
    }));
};


exports.down = async function down(knex) {
  return knex.schema
    .alterTable('pastes', (table) => {
      table.dropForeign('user_id', 'users.id');
      table.dropColumn('user_id');
    })
    .then(() => knex.schema.dropTableIfExists('users'));
};
