const mongoose = require('mongoose');

const historicoSchema = new mongoose.Schema({
  glicemia: {
    type: Number,
    required: true,
  },
  dataMedicao: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  idade: {
    type: Number,
    required: true,
  },
  incremento: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  historico: [historicoSchema], // Adicionando o campo de histórico ao esquema do usuário
});

module.exports = mongoose.model('User', userSchema);
