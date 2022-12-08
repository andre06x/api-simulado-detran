import { Request, Response } from 'express';
import { BotErrosServices } from "../Services/BotErrosServices";

class BotErrosController {

  async postarErros(request: Request, response: Response) {
    const { data } = request.body;
    
    const perguntasServices = new BotErrosServices();
    const perguntas = await perguntasServices.execute(data);
    
    response.json(perguntas)
  }
}

export { BotErrosController }