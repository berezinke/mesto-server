const router = require('express').Router();

const {
  errorPath,
} = require('../controllers/errorcatch');

router.get('/*', errorPath);
router.patch('/*', errorPath);

module.exports = router;
