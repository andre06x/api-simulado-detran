import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('respostas', table => {
    table.uuid('id').primary();
    
    table.uuid('pergunta_id')
      .references('id')
      .inTable('perguntas')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table.string('nome_alternativa')
    table.string('numero_alternativa')
    table.boolean('correta')

  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('respostas');
}

