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
    it('GET returns 200 and all articles', () => {
      return request
        .get('/api/articles')
        .expect(200)
        .then(response => {
          expect(response.body).to.be.an('object');
          expect(response.body.articles.length).to.equal(4);
        })
    })
  })

  describe.only('/comments', () => {
    it('GET returns 200 and all comments', () => {
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
    it('GET returns 200 and all topics', () => {
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
    it('GET returns 200 and all users', () => {
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
    it('GET returns 200 and the article', () => {
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
    it('GET returns 200 and the topics by id', () => {
      return request
        .get(`/api/topics/${topics[1]._id}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.topic._id).to.equal(`${topics[1]._id}`);
        })
    })
  })

  describe('/topics/:topic/articles', () => {
    it("GET /:topic/articles should return all articles corresponding to that topic", () => {
      return request
        .get("/api/topics/cats/articles")
        .expect(200)
        .then(res => {
          expect(res.body.length).to.equal(2);
          expect(res.body[1].body).to.equal(
            "Bastet walks amongst us, and the cats are taking arms!");
        })
    })
  })

  describe('/topics/:topic_id/articles', () => {
    it('POST returns 201 and the article posted to that topic', () => {
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

  describe('articles/:article_id/comments', () => {
    it("GET articles/:article_id/comments should return all comments corresponding to that article", () => {
      return request
        .get(`/api/articles/${articles[1]._id}/comments`)
        .expect(200)
        .then(res => {
          expect(res.body.comments[1]._id.length).to.equal(24);
          expect(res.body.comments[1].body).to.equal("This morning, I showered for nine minutes.");

        })
    })
  })

  describe('articles/:article_id/comments', () => {
    it('POST returns 201 and the comment posted to a specific article', () => {
      return request
        .post(`/api/articles/${articles[1]._id}/comments`)
        .send(
          {
            body: "test comment",
            belongs_to: `${articles[1]._id}`,

          }
        )
        .expect(201)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.body).to.equal('test comment')
        })
    })
  })

  describe('/users/:username', () => {
    it('GET returns 200 and the users by username', () => {
      return request
        .get(`/api/users/${users[1].username}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.username).to.equal(`${users[1].username}`);
        })
    })
  })

  describe('/:article_id', () => {
    it(' PUT returns 200 and increments the votes for articles', () => {
      return request
        .put(`/api/articles/${articles[0]._id}?vote=up`)
        .expect(200)
        .then(res => {
          expect(res.body).to.eql({ msg: 'Thanks for your vote!!' });
        })
    })
  })
  describe('/:comment_id', () => {
    it(' PUT returns 200 and increments the votes for comments', () => {
      return request
        .put(`/api/comments/${comments[0]._id}?vote=up`)
        .expect(200)
        .then(res => {
          expect(res.body).to.eql({ msg: 'Thanks for your vote!!' });
        })
    })
  })

  describe('/:comment_id', () => {
    it('return 200 for /comments/:comment_id and remove a new comment.', () => {
      const commentId = comments[0]._id;
      return request
        .delete(`/api/comments/${commentId}`)
        .expect(200)
        .then(response => {
          expect(response.body).to.be.an('object')
          expect(response.body).to.be.eql({})
          expect(response.text).to.be.equal(`deleted successfully`)
        })

    })
  })

  after(() => {
    return mongoose.disconnect(); // disconnect after all tests
  })
})