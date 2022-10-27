import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('bot_erros', table => {
    table.bigIncrements('id');
    table.string('tipo_erro').notNullable();
    table.string('data').notNullable();
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('bot_erros');
}

