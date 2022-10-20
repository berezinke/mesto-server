const Card = require('../models/card');

const errorCatch = require('./ErrorCatch');

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => errorCatch.errorCatch(res, err));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  // eslint-disable-next-line no-underscore-dangle
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => errorCatch.errorCatch(res, err));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => errorCatch.errorCatch(res, err));
};

module.exports.putCardLike = (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  const owner = req.user._id;
  Card.findByIdAndUpdate(
    owner,
    { $addToSet: { likes: owner } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => errorCatch.errorCatch(res, err));
};

module.exports.deleteCardLike = (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  const owner = req.user._id;
  Card.findByIdAndUpdate(
    owner,
    { $pull: { likes: owner } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => errorCatch.errorCatch(res, err));
};
