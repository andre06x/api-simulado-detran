require('dotenv').config();

import { Request, Response, NextFunction } from "express";

async function auth(request: Request, response: Response, next: NextFunction) {
  try {
    
    const { chave } = request.body;

    if (!chave) {
      return response.status(404).json({ erro: "Não foi encontrado chave de acesso" });
    }

    if (chave !== process.env.PASSWORD_AUTH_BOT) {
      return response.status(401).json({ erro: "Chave de acesso não confere" });
    }

    return next();
  } catch (err) {
    console.log("Erro auth")
  }

}

export { auth }