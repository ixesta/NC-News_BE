const app = require('../app')
const { expect } = require('chai')
const mongoose = require('mongoose')
const { seedDB } = require('../seed/seed.js')
const testData = require('../seed/testData')
const request = require('supertest')(app)

describe('NC_news', () => {
  // important to seed the db for each test
  let articles, comments, topics, users; // we put them here so they are available for all the tests
  beforeEach(() => {
    return mongoose.connection.dropDatabase()
      .then(() => {
        return seedDB(testData)
          .then((docs) => {
            console.log(docs)
            // [comments] = docs
            comments = docs[0]
            topics = docs[1]
            articles = docs[2]
            users = docs[3]
          })
      })
  })

  // we need a separate describe block for each end point

  describe('/articles', () => {
    it('returns 200 and all articles', () => {
      return request
        .get('/api/articles')
        .expect(200)
        .then(response => {
          console.log(response.body)
          expect(response.body).to.be.an('object');
          expect(response.body.articles.length).to.equal(4);
        })
    })

  })

  describe('/comments', () => {
    it('returns 200 and all comments', () => {
      return request
        .get('/api/comments')
        .expect(200)
        .then(response => {
          console.log(response.body, '&&&&&&&&')
          expect(response.body).to.be.an('array');
          expect(response.body.length).to.equal(8);
        })
    })

  })

  after(() => {
    return mongoose.disconnect(); // disconnect after all tests
  })
})