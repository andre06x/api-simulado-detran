import db from "../database/connection";
import { v4 } from "uuid";
import moment from "moment";
import { RegistroPergunta } from "../database/mongo/perguntas_respostas";

interface Perguntas {
  titulo: string;
  imagem_url: string;
  numero_questao: string;
  respostas: Alternativas[];
  data_isercao: string;
}

interface Alternativas {
  nome_alternativa: string;
  numero_alternativa: string;
  correta: string;
}

const InsertRegistroPergunta = async (id_pergunta: string, titulo: string) => {
  const data_completa = moment().format("DD/MM/YYYY HH:mm:ss");

  const data_sub_utc3 = moment().subtract(3, "hours");
  const data_utc3 = moment(data_sub_utc3).format("DD/MM/YYYY HH:mm:ss");
  const dia_utc3 = moment(data_sub_utc3).format("DD");
  const mes_utc3 = moment(data_sub_utc3).format("MM");
  const ano_utc3 = moment(data_sub_utc3).format("YYYY");
  const hora_utc3 = moment(data_sub_utc3).format("HH");
  const dia_semana_utc3 = moment(data_sub_utc3).day();

  const data = {
    id_pergunta,
    titulo,
    data_completa,
    data_utc3,
    dia_utc3,
    mes_utc3,
    ano_utc3,
    hora_utc3,
    dia_semana_utc3,
  };

  await RegistroPergunta.create(data, function (err, small) {
    if (err) console.log(err);
  });
};

const converterDataUTC = (data: Perguntas[]) => {
  const dataUTC = data.map((r) => ({
    ...r,
    data_insercao_utc: moment(r.data_isercao)
      .subtract(3, "hours")
      .format("DD/MM/YYYY HH:mm"),
  }));

  return dataUTC;
};

class PerguntasServices {
  async pesquisarPerguntas(
    palavras: string,
    limit: number = 5
  ) {
    const trx = await db.transaction();
    try {
      const perguntas = await trx("perguntas")
        .innerJoin("respostas", "perguntas.id", "respostas.pergunta_id")
        .select([
          "perguntas.id",
          "perguntas.titulo",
          "perguntas.imagem_url",
          "perguntas.frequencia",
          "perguntas.data_insercao",
          trx.raw("json_agg(respostas.*) as respostas"),
        ])
        .whereLike("titulo", `%${palavras}%`)
        .orderBy("perguntas.data_insercao", "desc")
        .groupBy("perguntas.id");
      trx.commit();

      if (!perguntas) {
        return {
          message: `Não foi encontrado pergunta com titulo contendo ${palavras}`,
        };
      }

      for (let i = 0; i < perguntas.length; i++) {
        const procurar = await RegistroPergunta.find({
          id_pergunta: perguntas[i].id,
        })
          .sort({ data_completa: "desc" })
          .limit(Number(limit));
        perguntas[i].requisicoes = procurar;
      }

      const perguntasUTC = converterDataUTC(perguntas);
      return perguntasUTC;

    } catch (err) {
      console.log(err);
      return { message: "Error ao procurar pergunta" };
    }
  }

  async postarPergunta(dataPerguntas: Perguntas) {
    const trx = await db.transaction();
    let quantidadeInsert = 0;

    try {
      const { titulo, imagem_url, numero_questao, respostas } = dataPerguntas;

      const idPergunta = v4();
      const id_conteudo = `${titulo}${respostas
        .map((r) => r.nome_alternativa)
        .sort()
        .join()}`
        .toLowerCase()
        .replace(/\s/g, "")
        .replace(/[^a-zA-Z-0-9\s]/g, "");

      const pergunta = await trx("perguntas").select().where({
        id_conteudo: id_conteudo,
        imagem_url: imagem_url,
      });

      if (pergunta.length > 0) {
        await trx("perguntas")
          .update({
            frequencia: Number(pergunta[0].frequencia) + 1,
          })
          .where("perguntas.id", pergunta[0].id);

        await trx.commit();
        await InsertRegistroPergunta(pergunta[0].id, pergunta[0].titulo);

      }

      if (pergunta.length === 0) {
        const pergunta = {
          id: idPergunta,
          id_conteudo,
          titulo: titulo,
          imagem_url: imagem_url,
          numero_questao: numero_questao,
          data_insercao: moment().format("YYYY-MM-DD HH:mm:ss"),
          tipo: "",
          frequencia: 1,
        };

        await trx("perguntas").insert(pergunta);

        const respostasInsert = respostas.map((dataRespostas) => ({
          id: v4(),
          pergunta_id: idPergunta,
          nome_alternativa: dataRespostas.nome_alternativa,
          numero_alternativa: dataRespostas.numero_alternativa,
          correta: dataRespostas.correta,
        }));

        await trx("respostas").insert(respostasInsert);
        await InsertRegistroPergunta(idPergunta, titulo);

        quantidadeInsert = 1;
      }

      await trx.commit();
      return { insert: quantidadeInsert };
    } catch (err) {
      console.log(err);
      return { error: 1 };
    }
  }

  async requisitarTodasPerguntas() {
    const trx = await db.transaction();

    const perguntas = await trx("perguntas")
      .innerJoin("respostas", "perguntas.id", "respostas.pergunta_id")
      .select([
        "perguntas.id",
        "perguntas.titulo",
        "perguntas.imagem_url",
        "perguntas.frequencia",
        "perguntas.data_insercao",
        trx.raw("json_agg(respostas.*) as respostas"),
      ])
      .orderBy("perguntas.data_insercao", "desc")
      .groupBy("perguntas.id");
    trx.commit();

    const perguntasUTC = converterDataUTC(perguntas);
    return perguntasUTC;
  }

  async requisitarPlacas() {
    const trx = await db.transaction();

    try {
      const placas = await trx("perguntas")
        .innerJoin("respostas", "perguntas.id", "respostas.pergunta_id")
        .select([
          "perguntas.id",
          "perguntas.titulo",
          "perguntas.imagem_url",
          "perguntas.frequencia",
          "perguntas.data_insercao",
          trx.raw("json_agg(respostas.*) as respostas"),
        ])
        .where("perguntas.imagem_url", "<>", "")
        .where("perguntas.imagem_url", "not like", "%QUESTAO%")
        .orderBy("perguntas.data_insercao", "desc")
        .groupBy("perguntas.id");
      trx.commit();

      const perguntasUTC = converterDataUTC(placas);
      return perguntasUTC;
    } catch (err) {
      return { message: "Erro" };
    }
  }

  async gerarSimulado(quantidadeEscolhida: number = 30) {
    const trx = await db.transaction();

    try {
      const queryQuantidadePerguntas = await trx("perguntas")
        .count("id", { as: "quantidadePerguntas" })
        .from("perguntas");

      const { quantidadePerguntas } = queryQuantidadePerguntas[0];

      const simulado = await trx("perguntas")
        .innerJoin("respostas", "perguntas.id", "respostas.pergunta_id")
        .select([
          "perguntas.id",
          "perguntas.titulo",
          "perguntas.imagem_url",
          "perguntas.frequencia",
          "perguntas.data_insercao",
          trx.raw("json_agg(respostas.*) as respostas"),
        ])
        .orderByRaw("RANDOM()")
        .limit(
          quantidadeEscolhida > quantidadePerguntas
            ? Number(quantidadePerguntas)
            : quantidadeEscolhida
        )
        .groupBy("perguntas.id");
      trx.commit();

      const perguntasUTC = converterDataUTC(simulado);
      return perguntasUTC;
    } catch (err) {
      console.log(err);
      return { message: "Erro" };
    }
  }
}

export { PerguntasServices };
