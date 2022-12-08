import db from "../database/connection";
import moment from "moment";

class RequisicoesPerguntasServices {
  async execute(insert: number, erros: number) {
    const trx = await db.transaction();

    try {
      const request_info = {
        quantidade_insert: insert,
        quantidade_falhas_insert: erros,
        exito: true,
        data: moment().format("YYYY-MM-DD HH:mm:ss"),
      };

      await trx("requisicoes_perguntas").insert(request_info);

      await trx.commit();
    } catch (err) {
      console.log(err);
    }
  }

  async requisicoesValidas() {
    try {
      const trx = await db.transaction();

      let request_validos = await trx("requisicoes_perguntas")
        .select()
        .where("quantidade_insert", "<>", 0)
        .orderBy("data", "desc");

      await trx.commit();

      const request_datautc = request_validos.map((r) => ({
        ...r,
        data_utc: moment(r.data).subtract(3, "hours").format("DD/MM/YYYY HH:mm"),
      }));

      return request_datautc;
    } catch (err) {}
  }
}

export { RequisicoesPerguntasServices };
