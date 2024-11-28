const mongoose = require('mongoose');

const curriculumSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  telefone: { type: String, required: true },
  endereco: { type: String, required: true },
  formacoes: [
    {
      curso: { type: String, required: true },
      instituicao: { type: String, required: true },
      anoConclusao: { type: Number, required: true },
    },
  ],
  experiencias: [
    {
      empresa: { type: String, required: true },
      cargo: { type: String, required: true },
      periodo: { type: String, required: true },
    },
  ],
  habilidades: { type: [String], required: true },
  idiomas: { type: [String], required: true },
  objetivo: { type: String, required: true }
});

module.exports = mongoose.model('Curriculum', curriculumSchema);
