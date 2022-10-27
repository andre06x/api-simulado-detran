import express from 'express';
import { BotErrosController } from "./Controllers/BotErrosController";
import { DadosGeraisController } from "./Controllers/DadosGeraisController";

import { PerguntasController } from "./Controllers/PerguntasController";
import { RequisicoesPerguntasController } from "./Controllers/RequisicoesPerguntas";
import { auth } from "./middlewares/auth";

const routes = express.Router();

const perguntasController = new PerguntasController();
const botErrosController = new BotErrosController();
const dadosGeraisController = new DadosGeraisController();
const requisicoesPerguntasController = new RequisicoesPerguntasController();

routes.post('/postar-perguntas', auth, perguntasController.postarPerguntas);
routes.post('/postar-erros', auth, botErrosController.postarErros);

routes.get('/pesquisar-pergunta', perguntasController.pesquisarPerguntas);

routes.get('/requisitar-todas-perguntas', perguntasController.requisitarTodasPerguntas);
routes.get('/requisitar-placas', perguntasController.requisitarPlacas);

routes.get('/gerar-simulado/', perguntasController.gerarSimulado);
routes.get('/gerar-simulado/:quantidade', perguntasController.gerarSimulado);

routes.get('/dados-gerais', dadosGeraisController.gerarDados);

routes.get('/requisicoes-validas', requisicoesPerguntasController.requestsvalidos)

routes.get('/', (_, response) => {
  response.json({message: "Para acessar o swagger acesse /swagger"})
})
export { routes }