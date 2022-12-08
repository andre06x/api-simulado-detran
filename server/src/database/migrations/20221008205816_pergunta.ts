import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('perguntas', table => {
    table.uuid('id').primary();
    table.text('id_conteudo').unique();
    table.string('titulo').notNullable();
    table.string('imagem_url');
    table.string('numero_questao');
    table.bigInteger('frequencia')
    table.string('data_insercao');
    table.string('tipo');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('perguntas');
}

