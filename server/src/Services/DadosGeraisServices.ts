import db from "../database/connection";
import { mongoose } from "../database/mongo/mongoose";
import moment from "moment";
import { RegistroPergunta } from "../database/mongo/perguntas_respostas";


const converterData = (data: string) => {
  const format = "DD/MM/YYYY HH:mm:ss";
  return moment(data).subtract(3, 'hours').format(format);
}

class DadosGeraisServices {
  async execute() {
    const trx = await db.transaction();

    try {
      const queryQuantidadePerguntas = await trx("perguntas").count("id", {
        as: "quantidade_perguntas",
      });

      const queryQuantidadePerguntasPlacas = await trx("perguntas")
        .count("id", { as: "quantidade_perguntas_placas" })
        .where("perguntas.imagem_url", "<>", "")
        .where("perguntas.imagem_url", "not like", "%QUESTAO%");

      const queryQuantidadeDeErros = await trx("bot_erros").count("id", {
        as: "quantidade_erros",
      });

      const queryUltimoErro = await trx("bot_erros")
        .select()
        .orderBy("data", "desc")
        .limit(1);

      const queryQuantidadeRequest = await trx("requisicoes_perguntas")
        .count("id", { as: "quantidade_request" })
        .from("requisicoes_perguntas");

      const queryUltimoRequest = await trx("requisicoes_perguntas")
        .select()
        .orderBy("data", "desc")
        .limit(1);

      const queryUltimoRequestComDados = await trx("requisicoes_perguntas")
        .select()
        .where("quantidade_insert", "<>", 0)
        .orderBy("data", "desc")
        .limit(1);

      const mongo_quantidade_registros_perguntas = await RegistroPergunta.count();


      const { quantidade_perguntas } = queryQuantidadePerguntas[0];
      const { quantidade_perguntas_placas } = queryQuantidadePerguntasPlacas[0];

      const { quantidade_erros } = queryQuantidadeDeErros[0];
      const { quantidade_request } = queryQuantidadeRequest[0];

      const ultimo_request = `${converterData(queryUltimoRequest[0].data)} com ${queryUltimoRequest[0].quantidade_insert} insert`;

      const ultimo_request_dados = `${converterData(queryUltimoRequestComDados[0].data)} com ${
        queryUltimoRequestComDados[0].quantidade_insert
      } insert`;

      const ultimo_erro = queryUltimoErro[0]
        ? `${converterData(queryUltimoErro[0].data)} - ${
            queryUltimoErro[0].tipo_erro
          }`
        : 0;

      return {
        quantidade_perguntas,
        quantidade_perguntas_placas,

        quantidade_request,
        ultimo_request,
        ultimo_request_dados,

        quantidade_erros,
        ultimo_erro,
        mongo_quantidade_registros_perguntas,
      };
    } catch (err) {
      console.log(err);
    }
  }
}

export { DadosGeraisServices };
