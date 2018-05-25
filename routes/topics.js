const router = require('express').Router();
const { getTopics, getTopicsById, getArticlesByTopic, addArticleToTopic } = require('../controllers');

router.route('/')
  .get(getTopics)

// router.route('/:topic_id')
//   .get(getTopicsById)

router.route('/:topic/articles')
  .get(getArticlesByTopic)
  .post(addArticleToTopic)



module.exports = router;