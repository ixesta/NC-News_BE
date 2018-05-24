const router = require('express').Router();
const { getArticles, getArticlesById, getCommentsByArticleId, addCommentToArticle, changeVotes } = require('../controllers');

router.route('/')
  .get(getArticles)

router.route('/:article_id')
  .get(getArticlesById)
  .put(changeVotes)

router.route('/:article_id/comments')
  .get(getCommentsByArticleId)
  .post(addCommentToArticle)

module.exports = router;