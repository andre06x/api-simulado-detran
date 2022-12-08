import moment from "moment";
import db from "../database/connection";

class BotErrosServices {
  async execute(data: any) {
    const trx = await db.transaction();
    try {
      const errosInsert = {
        tipo_erro: data.tipo,
        data: data.data,
      };

      await trx("bot_erros").insert(errosInsert);

      trx.commit();
      return { message: "Inserido erro no banco." };
    } catch (err) {
      console.log(data);

      console.log(err);
      return { message: "Erro ao inserir no banco." };
    }
  }
}

export { BotErrosServices };
