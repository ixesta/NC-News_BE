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

// router.use('/*', (req, res, next) => {
//   next({ status: 404, msg: 'Page not found' })
// })
module.exports = router;