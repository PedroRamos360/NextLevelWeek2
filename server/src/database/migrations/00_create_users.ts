import knex from 'knex';
import Knex from 'knex';

// Alterações para colocar no banco de dados
export async function up(knex: Knex) {
   return knex.schema.createTable('users', table => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('avatar').notNullable();
      table.string('whatsapp').notNullable();
      table.string('bio').notNullable();
   });
}

// Se ocorrer algum problema voltar atrás
export async function down(knex: Knex) {
   return knex.schema.dropTable('users');
}
