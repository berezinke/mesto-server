const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getAllCards, createCard, deleteCard, putCardLike, deleteCardLike,
} = require('../controllers/cards');

const validUrl = /(https?:\/\/[a-z0-9_\-.]+[a-z]{2,9})(\/[a-z0-9_\-.])*?/i;
const validMongoId = /^[0-9A-F]+/i;

router.get('/', getAllCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required()
      .pattern(validUrl),
  }),
}), createCard);

router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().pattern(validMongoId).min(24).max(24),
  }),
}), deleteCard);

router.put('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().pattern(validMongoId).min(24).max(24),
  }),
}), putCardLike);

router.delete('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().pattern(validMongoId).min(24).max(24),
  }),
}), deleteCardLike);

module.exports = router;
