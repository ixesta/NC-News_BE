const mongoose = require('mongoose'); // we are using mongoose methods
const Article = require('../models/Article');
const Comment = require('../models/Comment');
const Topic = require('../models/Topic');
const User = require('../models/User');


exports.getTopics = (req, res, next) => {
  Topic.find()
    .then(topics => {
      res.send(topics)
    })
    .catch(err => {
      next({
        status: 404,
        msg: 'Page not found'
      })
    })
}


exports.getComments = (req, res, next) => {
  Comment.find().populate('created_by')
    .then(comments => {
      res.send(comments)
    })
    .catch(err => {
      next({
        status: 404,
        msg: 'Page not found'
      })
    })
}

exports.getUsers = (req, res, next) => {
  User.find()
    .then(users => {
      res.send(users)
    })
    .catch(err => {
      next({
        status: 404,
        msg: 'Page not found'
      })
    })
}

exports.getArticles = (req, res, next) => {
  Article.find().populate('created_by').lean()
    .then(articles => {
      return Promise.all([articles, ...articles.map(artObj => Comment.count({ belongs_to: artObj._id }))])
    })
    .then(([articles, ...commentCounts]) => {
      let result = articles.map((artObj, index) => {
        artObj.comments = commentCounts[index]
        return artObj;
      })
      res.send({ articles: result })
    })
    .catch(err => {
      next({
        status: 404,
        msg: 'Page not found'
      })
    })
}
// exports.getArticles = (req, res, next) => {
//   Article.find()
//     .then(Comment.findOne({ belongs_to: req.params.article_id }))
//     .then(articles => {
//       res.send(articles)
//     })
//     .catch(console.log)
// }


exports.getArticlesByTopic = (req, res, next) => {
  Article.find({ belongs_to: req.params.topic }).populate('created_by')
    .then(articles => {
      // hitting an empty array , status 404
      if (articles.length === 0) next({
        status: 404,
        msg: 'Page not found'
      })
      res.send({ articles })
    })
    .catch(err => {
      next({
        status: 404,
        msg: 'Page not found'
      })
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
      res.status(201).send({ article });
    })
    .catch(err => {
      next({
        status: 404,
        msg: 'Page not found'
      })
    })

}

exports.getArticlesById = (req, res, next) => {
  Article.findById(req.params.article_id).populate('created_by')
    .then(article => {
      res.send({ article })
    })
    .catch(err => {
      next({
        status: 400,
        msg: 'malformed request'
      })
    })
}



exports.getCommentsByArticleId = (req, res, next) => {
  Comment.find({ belongs_to: req.params.article_id }).populate('created_by')
    .then(comments => {
      res.send({ comments })
    })
    .catch(err => {
      next({
        status: 400,
        msg: 'malformed request'
      })
    })
}

exports.addCommentToArticle = (req, res, next) => {
  const user = User.findOne()
    .then(({ _id }) => {
      const newComment = new Comment({
        body: req.body.body,
        belongs_to: req.params.article_id,
        created_by: _id
      })
      return newComment.save()
    })
    .then(comment => {
      return Comment.findById(comment._id)
        .populate('created_by')
    })
    .then(comment => {
      res.status(201).send(comment);
    })
    .catch(err => {
      console.log(err)
      next({
        status: 400,
        msg: 'Malformed request. Your comment has not been added.'
      })
    })
}

exports.changeVotes = (req, res, next) => {
  const articleId = req.params.article_id;
  req.query.vote !== 'up' ? (req.query.vote !== 'down' ? next({ status: 400, msg: 'Wrong input. Try again with UP or DOWN' }) : null) : null;
  return Article.findByIdAndUpdate(articleId).populate('created_by')
    .then(article => {
      if (req.query.vote === 'up') article.votes++;
      else if (req.query.vote === 'down') article.votes--;
      return article.save();
    })
    .then(article => res.status(200).send({ msg: 'Thanks for your vote!!' }))
    .catch(err => {
      next({
        status: 400,
        msg: 'Wrong input. Try again with UP or DOWN'
      })
    })
}

exports.getCommentsById = (req, res, next) => {

  Comment.findById(req.params.comment_id).populate('created_by')
    .then(comment => {
      res.send({ comment })
    })
    .catch(err => {
      next({
        status: 400,
        msg: 'malformed request'
      })
    })
}

exports.changeVotesofComments = (req, res, next) => {
  const msg = 'Invalid input, use “up” to add a vote or “down” to decrease it.'
  req.query.vote !== 'up' ? (req.query.vote !== 'down' ? next({ status: 400, msg: 'Wrong input. Try again with UP or DOWN' }) : null) : null;
  const commentId = req.params.comment_id;
  req.query.vote
  return Comment.findByIdAndUpdate(commentId).populate('created_by')
    .then(comment => {
      if (req.query.vote === 'up') comment.votes++;
      else if (req.query.vote === 'down') comment.votes--;
      return comment.save();
    }).then(comment => res.status(200).send({ msg: 'Thanks for your vote!!' }))
    .catch(err => {
      next({
        status: 400,
        msg: 'Malformed request. Try again with UP or DOWN'
      })
    })
}

exports.deleteCommentById = (req, res, next) => {
  return Comment.findByIdAndRemove(req.params.comment_id)
    .then(commentId => {
      res.status(200).send('deleted successfully')
    })
    .catch(err => {
      next({
        status: 400,
        msg: 'ERROR: Try again'
      })
    })
}

exports.getUsersByUsername = (req, res, next) => {
  User.findOne({ username: req.params.username })
    .then(user => {
      if (user === null) return next({
        status: 400,
        msg: 'malformed request'
      })
      res.send(user)
    })
    .catch(next)
}
