process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

const { seedDB } = require('./seed');
const mongoose = require('mongoose');
const { DB_URL } = require('../config')
const devData = require('../seed/devData')


mongoose.connect(DB_URL)
  .then(() => {
    return mongoose.connection.dropDatabase()
  })
  .then(() => {
    return seedDB(devData);
  })
  .then(() => {
    console.log(`DB successfully seeded...`);
    return mongoose.disconnect();
  }).then(() => {
    console.log('successfully disconnected from the DB...')
  })