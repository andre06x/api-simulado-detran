import { mongoose } from "./mongoose";

const RegistroPerguntaSchema = new mongoose.Schema({
  id_pergunta: {
    type: String,
    require: true,
  },
  titulo: {
    type: String,
  },
  data_completa: {
    type: String,
    require: true
  },
  data_utc3: {
    type: String,
    require: true
  },
  dia_utc3: {
    type: String
  },
  mes_utc3:{
    type: String
  },
  ano_utc3: {
    type: String
  },
  hora_utc3: {
    type: String,
    require: true
  },
  dia_semana_utc3: {
    type: String,
    require: true
  }
});

export const RegistroPergunta = mongoose.model('registro_perguntas', RegistroPerguntaSchema);
