const router = require('express').Router();

const {
  login, createUser,
// eslint-disable-next-line import/no-unresolved
} = require('../controllers/auth');

router.post('/', createUser);

router.post('/', login);

module.exports = router;
