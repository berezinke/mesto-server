const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getAllCards, createCard, deleteCard, putCardLike, deleteCardLike,
} = require('../controllers/cards');

router.get('/', getAllCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().min(2).max(160),
  }),
}), createCard);

router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string(),
  }),
}), deleteCard);

router.put('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string(),
  }),
}), putCardLike);

router.delete('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string(),
  }),
}), deleteCardLike);

module.exports = router;
