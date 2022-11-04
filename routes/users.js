const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getUserById, updateUser, updateAvatar, getOwner,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getOwner);

router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string(),
  }),
}), getUserById);

// router.post('/', createUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().min(2).max(160),
  }),
}), updateAvatar);

module.exports = router;
