// const { createIDRef } = require('../utils');

const mongoose = require('mongoose');
// const { } = require('../utils');
const testData = require('./testData')
const { formatTopicData, formatCommentData, formatUserData, formatArticleData } = require('../utils');

const { Article, Comment, Topic, User } = require('../models');
const data = require('./devData')
mongoose.Promise = Promise;

exports.seedDB = ({ topicsData, usersData, commentsData, articlesData }) => {
  return Promise.all([
    Topic.insertMany(formatTopicData(topicsData)),
    User.insertMany(formatUserData(usersData))
  ])
    .then(([topicDocs, userDocs]) => {
      return Promise.all([
        Article.insertMany(formatArticleData(articlesData, userDocs)),
        userDocs, topicDocs
      ]);
    })
    .then(([articleDocs, userDocs, topicDocs]) => {
      return Promise.all([Comment.insertMany(
        formatCommentData(commentsData, articleDocs, userDocs)
      ), articleDocs, userDocs, topicDocs]);
    })
    .then(([commentsDocs, articleDocs, userDocs, topicDocs]) => {
      return [commentsDocs, articleDocs, userDocs, topicDocs]
    })
    .catch(console.log);
};    