const router = require('express').Router();
const { getComments, getCommentsById, changeVotesofComments, deleteCommentById } = require('../controllers');

router.route('/')
  .get(getComments)

router.route('/:comment_id')
  .get(getCommentsById)
  .put(changeVotesofComments)
  .delete(deleteCommentById)


module.exports = router;