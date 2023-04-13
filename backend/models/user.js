const mongoose = require('mongoose');

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
});

module.exports = mongoose.model('User', userSchema);
