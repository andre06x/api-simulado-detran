require("dotenv").config();
import mongoose from "mongoose";

const connection_mongo = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}?authSource=admin`;
mongoose
  .connect(connection_mongo)
  .then(() => {
    console.log("CONEXAO MONGO ON");
  })
  .catch((e) => console.log("Erro na conexao do mongo"));

export { mongoose };
