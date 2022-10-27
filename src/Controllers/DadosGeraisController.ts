import { Request, Response } from 'express';
import { DadosGeraisServices } from "../Services/DadosGeraisServices";

class DadosGeraisController {

  async gerarDados(request: Request, response: Response) {

    const dadosGeraisServices = new DadosGeraisServices();
    const dadosGerais = await dadosGeraisServices.execute();
    
    response.json(dadosGerais)
  }
}

export { DadosGeraisController }