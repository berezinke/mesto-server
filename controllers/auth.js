const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
// const NotLoginError = require('../errores/errornotlogin');
const NotAllowedError = require('../errores/errornotallowed');
const ServerError = require('../errores/errorserver');

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new NotAllowedError('Такой пользователь уже есть!!!');
      }
    })
    .then(() => {
      bcrypt.hash(password, 10)
        .then((hash) => User.create({
          email, password: hash, name, about, avatar,
        })
          .then((user) => {
            res.send({
              _id: user._id,
              email: user.email,
              name: user.name,
              about: user.about,
              avatar: user.avatar,
            });
          })
          .catch(() => {
            throw new ServerError('Ошибка сервера');
          }));
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByParams(email, password, next)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'simpleKey', { expiresIn: '17d' });
      res.send({ token });
    })
    .catch((err) => {
      // throw new NotLoginError('Неправильное имя пользователя или пароль');
      next(err);
    });
};
