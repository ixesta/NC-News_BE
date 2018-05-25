const router = require('express').Router();
const { getUsers, getUsersByUsername } = require('../controllers');

router.route('/')
  .get(getUsers)

router.route('/:username')
  .get(getUsersByUsername)

// router.use('/*', (req, res, next) => {
//   next({ status: 404, msg: 'Page not found' })
// })

module.exports = router;