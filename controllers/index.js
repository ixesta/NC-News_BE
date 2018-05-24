const mongoose = require('mongoose'); // we are using mongoose methods
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
  Article.find().lean()
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
}
// exports.getArticles = (req, res, next) => {
//   Article.find()
//     .then(Comment.findOne({ belongs_to: req.params.article_id }))
//     .then(articles => {
//       res.send(articles)
//     })
//     .catch(console.log)
// }

exports.getTopicsById = (req, res, next) => {
  Topic.findById(req.params.topic_id)
    .then(topic => {
      res.send({ topic })
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
      res.status(201).send({ article });
    })
    .catch(console.log)

}

exports.getArticlesById = (req, res, next) => {
  Article.findById(req.params.article_id)
    .then(article => {
      res.send({ article })
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

exports.changeVotes = (req, res, next) => {
  const articleId = req.params.article_id;
  return Article.findByIdAndUpdate(articleId)
    .then(article => {
      if (req.query.vote === 'up') article.votes++;
      else if (req.query.vote === 'down') article.votes--;
      return article.save();
    }).then(article => res.status(200).send({ msg: 'Thanks for your vote!!' }))
    .catch(next);
}

exports.getCommentsById = (req, res, next) => {
  Comment.findById(req.params.comment_id)
    .then(comment_id => {
      res.send(comment_id)
    })
}

exports.changeVotesofComments = (req, res, next) => {
  const commentId = req.params.comment_id;
  return Comment.findByIdAndUpdate(commentId)
    .then(comment => {
      if (req.query.vote === 'up') comment.votes++;
      else if (req.query.vote === 'down') comment.votes--;
      return comment.save();
    }).then(comment => res.status(200).send({ comment }))
    .catch(next);
}

exports.deleteCommentById = (req, res, next) => {
  return Comment.findByIdAndRemove(req.params.comment_id)
    .then(commentId => {
      res.status(200).send('deleted succesfully')
    })
}

exports.getUsersByUsername = (req, res, next) => {
  User.findOne({ username: req.params.username })
    .then(user => {
      res.send(user)
    })
    .catch(console.log)
}