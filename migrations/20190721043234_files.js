'use strict';

exports.up = async function up(knex) {
  return knex.schema
    // Remove contents column
    .alterTable('pastes', (table) => {
      table.dropColumn('contents');
    })

    // Create files table
    .then(() => knex.schema.createTable('files', (table) => {
      table
        .increments('id')
        .primary();

      table
        .uuid('uuid')
        .defaultTo(knex.raw('uuid_generate_v4()'))
        .notNullable();

      table
        .integer('paste_id')
        .unsigned()
        .notNullable();
      table
        .foreign('paste_id')
        .references('pastes.id');

      table
        .string('name', 260)
        .notNullable();

      table.timestamps(true, true);
    }));
};


exports.down = async function down(knex) {
  return knex.schema
    .dropTableIfExists('files')
    .then(() => knex.schema.alterTable('pastes', (table) => {
      table
        .text('contents')
        .notNullable();
    }));
};
