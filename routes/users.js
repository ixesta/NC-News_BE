const router = require('express').Router();
const { getUsers, getUsersByUsername } = require('../controllers');

router.route('/')
  .get(getUsers)

router.route('/:username')
  .get(getUsersByUsername)


module.exports = router;