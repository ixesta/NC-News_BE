const router = require('express').Router();

const commentsRouter = require('./comments')
const articlesRouter = require('./articles')
const topicsRouter = require('./topics')
const usersRouter = require('./users')


router.use('/comments', commentsRouter)
router.use('/articles', articlesRouter)
router.use('/topics', topicsRouter)
router.use('/users', usersRouter)

module.exports = router;