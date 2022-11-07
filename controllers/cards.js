const Card = require('../models/card');
const IncorrrectUserError = require('../errores/errorincorrectuser');
// const NotValidError = require('../errores/errornotvalid');
const NotFoundError = require('../errores/errornotfound');
const ServerError = require('../errores/errorserver');

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      // if (!cards) {
      // throw new ServerError('Ошибка сервера');
      // }
      res.send({ data: cards });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      // if (!card) {
      //  throw new NotValidError('Невалидные данные');
      // }
      res.send({ data: card });
    })
    .catch(() => {
      // next(err);
      throw new ServerError('Ошибка сервера');
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не нашлась. Удалить нельзя');
      }
      if (card.owner.toString() === req.user._id) {
        Card.findByIdAndRemove(req.params.id).orFail()
          .then(() => {
            res.send({ message: 'Удаление удалось!' });
          })
          .catch(() => {
            throw new ServerError('Ошибка сервера');
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
  const owner = req.user._id;
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: owner } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не нашлась. Поставить лайк нельзя');
      }
      res.send({ data: card });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.deleteCardLike = (req, res, next) => {
  const owner = req.user._id;
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: owner } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не нашлась. Снять лайк нельзя');
      }
      res.send({ data: card });
    })
    .catch((err) => {
      next(err);
    });
};

// const errorCatch = require('./errorcatch');
