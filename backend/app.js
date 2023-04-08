require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log('mongo conectado'))
  .catch((err) => console.log('Erro ao conectar ao banco de dados: ' + err));

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to database'));

app.use(express.json());

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

app.get('/', function (req, res) {
  res.send('Hello');
});

app.listen(8081, function () {
  console.log('servidor ativo');
});
