import { Request, Response } from 'express';
import { RequisicoesPerguntasServices } from "../Services/RequisicoesPerguntas";

class RequisicoesPerguntasController {
  async requestsvalidos(request: Request, response: Response) {
    const requisicoesServices = new RequisicoesPerguntasServices();

    const requesicoesValidas = await requisicoesServices.requisicoesValidas();
    response.status(200).json(requesicoesValidas);
  }
}

export { RequisicoesPerguntasController }