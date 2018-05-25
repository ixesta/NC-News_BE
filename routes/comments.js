const router = require('express').Router();
const { getComments, getCommentsById, changeVotesofComments, deleteCommentById } = require('../controllers');

router.route('/')
  .get(getComments)

router.route('/:comment_id')
  .get(getCommentsById)
  .put(changeVotesofComments)
  .delete(deleteCommentById)

// router.use('/*', (req, res, next) => {
//   next({ status: 404, msg: 'Page not found' })
// })

module.exports = router;