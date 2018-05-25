const express = require('express');
const mongoose = require('mongoose');
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'
const { DB_URL } = process.env.NODE_ENV === 'production' ? process.env : require('./config');

mongoose.connect(DB_URL);
const apiRouter = require("./routes/api");

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json())

app.use('/api', apiRouter);

app.get('/api', (req, res, next) => {
  res.send('NORTHCODERS NEWS')
})


app.get('/', (req, res, next) => {
  res.render('./pages/index')
})
app.use('/*', (req, res, next) => {
  next({ status: 404, msg: 'Page not found' })
})

app.use((err, req, res, next) => {
  console.log(err, '<<<<<')

  if (err.status === 404) {
    res.status(404).send({ msg: err.msg });
  }
  else if (err.status === 400) {
    res.status(400).send({ msg: err.msg })
  }
  else {
    res.status(500).send({ msg: 'Internal server error' });
  }
})

module.exports = app;