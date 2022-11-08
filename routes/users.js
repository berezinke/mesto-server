const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getUserById, updateUser, updateAvatar, getOwner,
} = require('../controllers/users');

const validMongoId = /^[0-9A-F]+/i;
const validUrl = /(https?:\/\/[a-z0-9_\-.]+[a-z]{2,9})(\/[a-z0-9_\-.])*?/i;

router.get('/', getUsers);

router.get('/me', getOwner);

router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().pattern(validMongoId).min(24).max(24),
  }),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(validUrl),
  }),
}), updateAvatar);

module.exports = router;
