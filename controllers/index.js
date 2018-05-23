const mongoose = require('mongoose');
const Article = require('../models/Article');
const Comment = require('../models/Comment');
const Topic = require('../models/Topic');
const User = require('../models/User');



mongoose.connect('mongodb://localhost:27017/NC_news');

exports.getTopics = (req, res, next) => {
  Topic.find()
    .then(topics => {
      res.send(topics)
    })
}


exports.getComments = (req, res, next) => {
  Comment.find()
    .then(comments => {
      res.send(comments)
    })
}

exports.getUsers = (req, res, next) => {
  User.find()
    .then(users => {
      res.send(users)
    })
}

exports.getArticles = (req, res, next) => {
  Article.find()
    .then(articles => {
      res.send(articles)
    })
}

exports.getTopicsById = (req, res, next) => {
  Topic.findById(req.params.topic_id)
    .then(topic_id => {
      res.send(topic_id)
    })
}

exports.getArticlesByTopic = (req, res, next) => {
  Article.find({ belongs_to: req.params.topic })
    .then(articles => {
      res.send(articles)
    })

}

exports.addArticleToTopic = (req, res, next) => {
  const newArticle = new Article({
    title: req.body.title,
    body: req.body.body,
    belongs_to: req.params.topic,
    created_by: '5b058261f82dc80c7c5fb422'
  })
  return Article.create(newArticle)

    .then(article => {
      res.send(article);
    })
    .catch(console.log)

}

exports.getArticlesById = (req, res, next) => {
  Article.findById(req.params.article_id)
    .then(article_id => {
      res.send(article_id)
    })
}

exports.getCommentsByArticleId = (req, res, next) => {
  Comment.find({ belongs_to: req.params.article_id })
    .then(comments => {
      res.send(comments)
    })
    .catch(console.log)
}

exports.addCommentToArticle = (req, res, next) => {
  const newComment = new Comment({
    body: req.body.comment,
    belongs_to: req.params.article_id,
    created_by: '5b058261f82dc80c7c5fb422'
  })
  return Comment.create(newComment)

    .then(comment => {
      res.send(comment);
    })
    .catch(console.log)
}