const router = require('express').Router();

router.get('/', (req, res) => {
  res.send({ message: 'Main page' });
});

module.exports = router;
