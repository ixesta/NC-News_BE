const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = Promise;
process.env.NODE_ENV = !process.env.NODE_ENV ? 'dev' : 'test';
const { DB_URL } = require('./config');


const apiRouter = require("./routes/api");

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json())

app.use('/api', apiRouter);

app.get('/api', (req, res, next) => {
  res.send('NORTHCODERS NEWS')
})


app.get('/', (req, res, next) => {
  res.send({ msg: 'hi' })
})

module.exports = app;