import { Request, response, Response } from 'express';
import { PerguntasServices } from "../Services/PerguntasServices";
import { RequisicoesPerguntasServices } from "../Services/RequisicoesPerguntas";

interface ResponsePerguntas {
  insert?: number;
  error?: number;
  frequencia?: number;
  pergunta_incomepleta?: boolean;
}

class PerguntasController {

  async pesquisarPerguntas(request: Request, response: Response){
    try{
      const { palavras_chave, limit } = request.query;

      if(!palavras_chave){
        return response.status(404).json({message: "Campo vazio."})
      }

      const palavras = palavras_chave.toString().toLowerCase() as string;
      const perguntasServices = new PerguntasServices();
      const perguntas = await perguntasServices.pesquisarPerguntas(palavras, Number(limit));

      return response.status(200).json(perguntas);
    }catch(err){
      return response.status(400).json({"error": "Erro ao procurar perguntas"})
    }
  }
  async postarPerguntas(request: Request, response: Response) {
    try {
      const { data } = request.body;

      const perguntasServices = new PerguntasServices();
      const requisicoesServices = new RequisicoesPerguntasServices();

      let perguntasInseridas = 0;
      let error = 0;

      for (let i = 0; i < data.length; i++) {
        const perguntas: ResponsePerguntas = await perguntasServices.postarPergunta(data[i]);
        if (perguntas.insert) {
          perguntasInseridas += perguntas.insert;
        }

        if (perguntas.error === 1) {
          error += perguntas.error;
        }

        if(perguntas.pergunta_incomepleta){
          return response.status(400).json({error: "Pergunta incompleta"})
        }
      }

      requisicoesServices.execute(perguntasInseridas, error);

      const message = `Foram inseridos ${perguntasInseridas} perguntas no banco com ${error} erros.`
      return response.json({ message: message });

    } catch (err) {
      return response.status(400).json({ message: "Erro" });
    }
  }

  async requisitarTodasPerguntas(request: Request, response: Response) {
    const perguntasServices = new PerguntasServices();
    const perguntas = await perguntasServices.requisitarTodasPerguntas();

    response.json(perguntas);
  }

  async requisitarPlacas(request: Request, response: Response) {
    const perguntasServices = new PerguntasServices();
    const perguntas = await perguntasServices.requisitarPlacas();

    response.json(perguntas);
  }

  async gerarSimulado(request: Request, response: Response) {
    const { quantidade } = request.params;

    const perguntasServices = new PerguntasServices();
    const simulado = await perguntasServices.gerarSimulado(Number(quantidade));
    response.json(simulado);
  }
}
export { PerguntasController }