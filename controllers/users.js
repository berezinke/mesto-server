const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      // errorCatch.errorCatch(res, err);
      res.status(500).send({ message: `А эту ошибку ${err.name} выдал сервер` });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id).orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      // errorCatch.errorCatch(res, err);
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Ошибка ${err.name} валидации` });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: `${err.name} Невалидные данные` });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: `${err.name} Таких данных в базе нет` });
      } else {
        res.status(500).send({ message: `А эту ошибку ${err.name} выдал сервер` });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      // errorCatch.errorCatch(res, err);
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Ошибка ${err.name} валидации` });
      } else {
        res.status(500).send({ message: `А эту ошибку ${err.name} выдал сервер` });
      }
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    // eslint-disable-next-line no-underscore-dangle
    req.user._id,
    { name, about },
    { new: true, runValidators: true }, // Обн рез, валидация, создание если не найден
  ).orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      // errorCatch.errorCatch(res, err);
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Ошибка ${err.name} валидации` });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: `${err.name} Невалидные данные` });
      } else {
        res.status(500).send({ message: `А эту ошибку ${err.name} выдал сервер` });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    // eslint-disable-next-line no-underscore-dangle
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  ).orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      // errorCatch.errorCatch(res, err);
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Ошибка ${err.name} валидации` });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: `${err.name} Невалидные данные` });
      } else {
        res.status(500).send({ message: `А эту ошибку ${err.name} выдал сервер` });
      }
    });
};

// "63513d264f6d342876316049"
// const errorCatch = require('./errorcatch');
