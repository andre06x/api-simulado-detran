

<h1 align="center">
    API SIMULADO DETRAN :robot:
</h1>

<p align="center">
  <a href="#tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#instalacao">Instalação</a>
</p>

<p align="center">
 <img src="https://img.shields.io/static/v1?label=PRs&message=welcome&color=7159c1&labelColor=000000" alt="PRs welcome!" />

  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=7159c1&labelColor=000000">
</p>



<h1 id="tecnologias"> 🚀 Tecnologias</h1>

[APP REACT SPA](http://140.238.180.226:3000/)  
[API SWAGGER](http://140.238.180.226:5005/swagger/)

Esse projeto foi desenvolvido com as seguintes tecnologias:
- [NodeJS](https://nodejs.org/)
- [Express](https://expressjs.com/pt-br/)
- [Knex](http://knexjs.org/)
- [Postgres](https://www.postgresql.org/)
- [Mongodb](https://www.mongodb.com/)
- [Purppeter](https://github.com/puppeteer/puppeteer)
- [Docker](https://www.docker.com/)

## 💻 Projeto

API SIMULADO DETRAN é uma api criada durante o exercício dos simulados, com ele temos o bot rodando 24h, populando o banco e criando a api. Meu intuito ao criá-lo foi ter em um local com todos as possíveis perguntas para assim ter um simulado mais dinânimo. 

<h2 id="instalacao">Instalacao</h2>
Para instalar o projeto:

CRIAR UM .ENV CONTENDO AS VARIÁVEIS

```
DELAY_NEW_TAB= 

PASSWORD_AUTH_BOT = 

DB_HOST= 
DB_PORT=
DB_USER= 
DB_PASSWORD= 
DB_DATABASE= 

MONGO_HOST= 
MONGO_PORT= 
MONGO_USERNAME=  
MONGO_PASSWORD= 
MONGO_DATABASE= 
```


Rodar o comando npm i para instalar as dependências

Rodar o comando npx knex:migrate latest para rodar o projeto

