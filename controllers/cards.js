const Card = require('../models/card');
const IncorrrectUserError = require('../errores/errorincorrectuser');
const NotValidError = require('../errores/errornotvalid');
const NotFoundError = require('../errores/errornotfound');
const ServerError = require('../errores/errorserver');

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      if (!cards) {
        throw new ServerError('Ошибка сервера');
      }
      res.send({ data: cards });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  // eslint-disable-next-line no-underscore-dangle
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      if (!card) {
        throw new NotValidError('Невалидные данные');
      }
      res.send({ data: card });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Не удалилось');
      }
      if (card.owner.toString() === req.user._id) {
        Card.findByIdAndRemove(req.params.id).orFail()
          .then(() => {
            res.send({ message: 'Удаление удалось!' });
          });
      } else {
        throw new IncorrrectUserError('Нет прав на удаление');
      }
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.putCardLike = (req, res, next) => {
  // eslint-disable-next-line no-underscore-dangle
  const owner = req.user._id;
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: owner } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Не лайкнулось');
      }
      res.send({ data: card });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.deleteCardLike = (req, res, next) => {
  // eslint-disable-next-line no-underscore-dangle
  const owner = req.user._id;
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: owner } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Не разлайкнулось');
      }
      res.send({ data: card });
    })
    .catch((err) => {
      next(err);
    });
};

// const errorCatch = require('./errorcatch');
