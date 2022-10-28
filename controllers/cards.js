const Card = require('../models/card');

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      // errorCatch.errorCatch(res, err);
      res.status(500).send({ message: `А эту ошибку ${err.name} выдал сервер` });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  // eslint-disable-next-line no-underscore-dangle
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      // errorCatch.errorCatch(res, err);
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Ошибка валидации' });
      } else {
        res.status(500).send({ message: `А эту ошибку ${err.name} выдал сервер` });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id).orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      // errorCatch.errorCatch(res, err);
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Ошибка валидации' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Невалидные данные' });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'Таких данных в базе нет' });
      } else {
        res.status(500).send({ message: `А эту ошибку ${err.name} выдал сервер` });
      }
    });
};

module.exports.putCardLike = (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  const owner = req.user._id;
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: owner } }, // добавить _id в массив, если его там нет
    { new: true },
  ).orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      // errorCatch.errorCatch(res, err);
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Ошибка валидации' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Невалидные данные' });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'Таких данных в базе нет' });
      } else {
        res.status(500).send({ message: `А эту ошибку ${err.name} выдал сервер` });
      }
    });
};

module.exports.deleteCardLike = (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  const owner = req.user._id;
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: owner } }, // убрать _id из массива
    { new: true },
  ).orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      // errorCatch.errorCatch(res, err);
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Невалидные данные' });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'Таких данных в базе нет' });
      } else {
        res.status(500).send({ message: `А эту ошибку ${err.name} выдал сервер` });
      }
    });
};

// const errorCatch = require('./errorcatch');
