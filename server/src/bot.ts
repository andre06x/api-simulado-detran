require('dotenv').config();
import puppeteer from "puppeteer";
import axios from "axios";
import moment from "moment";

interface Pergunta {
  numero_questao: string;
  titulo: string;
  imagem_url: string;
  respostas: Array<Respostas>;
}

interface Respostas {
  nome_alternativa: string;
  numero_alternativa: string;
  correta: boolean;
}

const api = axios.create({
  baseURL: `http://${process.env.HOST_API}:${process.env.PORT_API}`
});

const postarErros = async (tipo: string) => {
  console.log(`Erro ${tipo} ${moment().format()}`)
  try {
    await api.post(`/postar-erros`, {
      chave: process.env.PASSWORD_AUTH_BOT,
      data: {
        tipo: tipo,
        data: moment().format("YYYY-MM-DD HH:mm:ss"),
      }
    });
  } catch (err) {
    console.log(err)
    console.log("Erro try/catch " + tipo);
  }
}

export const botDetran = async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const newTab = async () => {
    const page = await browser.newPage();

    const client = await page.target().createCDPSession();
    await client.send("Network.clearBrowserCookies");
    await client.send("Network.clearBrowserCache");

    try {
      var arrayPergustasRespostas: any = [];

      await page.goto(
        "http://simulado.detran.rj.gov.br/simulados/iniciarProva/habilitacao"
      );

      page.on("dialog", async (dialog) => {
        await dialog.accept();
      });

      for (let i = 1; i <= 30; i++) {
        const resultado = await page.evaluate(() => {

          let titulo = document.getElementById("div-questao")?.innerHTML;
          let numero_questao = document.getElementById("div-numero-questao")?.innerHTML;

          let imgPlaca = document.querySelector("#img-placa") as HTMLElement;
          var imagem_url = "";

          if (imgPlaca.style.display !== "none") {
            imagem_url = imgPlaca.getAttribute("src") as string;
          }

          let objetoPergunta: Pergunta = {
            numero_questao: numero_questao as string,
            titulo: titulo as string,
            imagem_url: imagem_url as string,
            respostas: [],
          };

          let questoes = document.querySelectorAll(".alinhar-alternativa");
          questoes.forEach((questao, indice) => {

            const respontas: Respostas = {
              nome_alternativa: questao.innerHTML,
              numero_alternativa: questao.getAttribute("for") as string,
              correta: false,
            }

            objetoPergunta.respostas.push(respontas);
          });

          return objetoPergunta;
        });

        arrayPergustasRespostas.push(resultado);

        if (i < 30) {
          await page.click(
            "#div-conteudo > div:nth-child(4) > div:nth-child(3) > a"
          );
        }
        if (i === 30) {
          await page.click("#corrigir > a");
        }
      }

      setTimeout(async () => {
        try {
          for (let i = 0; i < 30; i++) {
            await page.waitForSelector(
              `#conteudo > div > div > div:nth-child(${i + 1})`
            );
            await page.click(`#conteudo > div > div > div:nth-child(${i + 1})`);

            const resultado2 = await page.evaluate((i) => ({
              posicaoResposta: i,
              repostaCorreta: document
                .getElementsByClassName("alinhar-alternativa correta")
              [i].getAttribute("for")
            }), i);

            arrayPergustasRespostas[resultado2.posicaoResposta].respostas.find(
              (r: Respostas) => r.numero_alternativa === resultado2.repostaCorreta
            ).correta = true;
          }

          try {

            const dataRespostas = {
              data: arrayPergustasRespostas,
              chave: process.env.PASSWORD_AUTH_BOT,
              timeout: 5000
            };

            await api.post(`/postar-perguntas`, dataRespostas);

          } catch (err) {
            postarErros("Erro na requisicao");
          }

          if (page) {
            await page.close();
            setTimeout(() => newTab(), Number(process.env.DELAY_NEW_TAB));
          }


        } catch (err) {
          postarErros("Erro ao encontrar o botao");
          await page.close();
          setTimeout(() => newTab(), Number(process.env.DELAY_NEW_TAB));
        }
      }, 1500);

    } catch (err) {
      await page.close();
      postarErros("Erro bot geral");
      setTimeout(() => newTab(), Number(process.env.DELAY_NEW_TAB));
    }
  }

  newTab();
};



