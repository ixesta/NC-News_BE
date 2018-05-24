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
            // [comments] = docs
            comments = docs[0]
            topics = docs[3]
            articles = docs[1]
            users = docs[2]
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
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(8);
        })
    })
  })

  describe('/topics', () => {
    it('returns 200 and all topics', () => {
      return request
        .get('/api/topics')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(2);
        })
    })
  })
  describe('/users', () => {
    it('returns 200 and all users', () => {
      return request
        .get('/api/users')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(2);
        })
    })
  })
  describe('/articles/:article_id', () => {
    it('returns 200 and the article', () => {
      return request
        .get(`/api/articles/${articles[1]._id}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.article._id).to.equal(`${articles[1]._id}`);
        })
    })
  })
  describe('/topics/:topic_id', () => {
    it('returns 200 and the topics by id', () => {
      return request
        .get(`/api/topics/${topics[1]._id}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.topic._id).to.equal(`${topics[1]._id}`);
        })
    })
  })

  describe('/articles/:article_id', () => {
    it('returns 200 and the articles by id', () => {
      return request
        .get(`/api/articles/${articles[1]._id}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.article._id).to.equal(`${articles[1]._id}`);
        })
    })
  })

  describe('/topics/:topic_id/articles', () => {
    it('returns 200 and the articles that belong to that topic', () => {
      return request
        .post('/api/topics/cooking/articles')
        .send(
          { title: 'test', body: "test article" }
        )
        .expect(201)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.article.title).to.equal('test')
        })
    })
  })

  after(() => {
    return mongoose.disconnect(); // disconnect after all tests
  })
})