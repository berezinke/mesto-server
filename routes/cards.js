const router = require('express').Router();

const {
  getAllCards, createCard, deleteCard, putCardLike, deleteCardLike,
} = require('../controllers/cards');

router.get('/', getAllCards);

router.post('/', createCard);

router.delete('/:id', deleteCard);

router.put('/:id/likes', putCardLike);

router.delete('/:id/likes', deleteCardLike);

module.exports = router;
