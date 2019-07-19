'use strict';

exports.up = async function up(knex) {
  // Allows for DB generated UUIDs
  return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

    // Create pastes table
    .then(() => knex.schema.createTable('pastes', (table) => {
      table
        .increments('id')
        .primary();

      table
        .uuid('uuid')
        .defaultTo(knex.raw('uuid_generate_v4()'))
        .notNullable();

      table
        .text('contents')
        .notNullable();

      table.timestamps(true, true);
    }));
};


exports.down = async function down(knex) {
  return knex.schema.dropTableIfExists('pastes')
    .then(() => knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp"'));
};
