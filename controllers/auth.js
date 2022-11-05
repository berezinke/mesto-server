const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotLoginError = require('../errores/errornotlogin');
const NotAllowedError = require('../errores/errornotallowed');
const ServerError = require('../errores/errorserver');

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  console.dir('-1');
  console.dir(email);
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new NotAllowedError('Такой пользователь уже есть!!!');
      }
      console.dir('0');
    })
    .then(() => {
      console.dir('1');
      bcrypt.hash(password, 10)
        .then((hash) => User.create({
          email, password: hash, name, about, avatar,
        })
          .then(({ _id }) => {
            console.dir('2');
            if (!_id) {
              throw new ServerError('Ошибка сервера');
            }
            res.send({
              email, name, about, avatar, _id,
            });
          }));
    })
    .catch((err) => {
      console.dir('5');
      console.dir(err);
      next(err);
    });
  console.dir('4');
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByParams(email, password)
    .then((user) => {
      if (!user) {
        throw new NotLoginError('Неправильное имя пользователя или пароль');
      }
      const token = jwt.sign({ _id: user._id }, 'simpleKey', { expiresIn: '17d' });
      // console.dir(token);
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

// "63513d264f6d342876316049"
// const errorCatch = require('./errorcatch');
// console.dir(err.name);
