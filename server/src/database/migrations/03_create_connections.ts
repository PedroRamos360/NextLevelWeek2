import Knex from 'knex';

export async function up(knex: Knex) {
   // Adiciona na tabela as chamadas de um usuário ao professor
   return knex.schema.createTable('connections', table => {
      table.increments('id').primary();

      // Pega o id da tabela users
      table.integer('user_id')
         .notNullable()
         .references('id')
         .inTable('users')
         .onUpdate('CASCADE')
         .onDelete('CASCADE');

      table.timestamp('create_at')
         .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
         .notNullable();
   });
};

export async function down(knex: Knex) {
   return knex.schema.dropTable('connections');
};
