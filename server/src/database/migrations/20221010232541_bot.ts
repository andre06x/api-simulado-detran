import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('requisicoes_perguntas', table => {
    table.bigIncrements('id');
    table.string('quantidade_insert').notNullable();
    table.string('quantidade_falhas_insert');
    table.boolean('exito').notNullable();
    table.string('data').notNullable();
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('requisicoes_perguntas')
}

