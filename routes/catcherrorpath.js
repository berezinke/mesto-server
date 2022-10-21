const router = require('express').Router();

const {
  errorPath,
} = require('../controllers/errorcatch');

router.get('/*', errorPath);

module.exports = router;
