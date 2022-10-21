const User = require('../models/user');
const errorCatch = require('./errorcatch');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => errorCatch.errorCatch(res, err));
};

module.exports.getMyUser = (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  User.findById(req.user._id)
    .then((users) => res.send({ data: users }))
    .catch((err) => errorCatch.errorCatch(res, err));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id).orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => errorCatch.errorCatch(res, err));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => errorCatch.errorCatch(res, err));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    // eslint-disable-next-line no-underscore-dangle
    req.user._id,
    { name, about },
    { new: true, runValidators: true, upsert: true }, // Обн рез, валидация, создание если не найден
  ).orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => errorCatch.errorCatch(res, err));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    // eslint-disable-next-line no-underscore-dangle
    req.user._id,
    { avatar },
    { new: true, runValidators: true, upsert: true },
  ).orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => errorCatch.errorCatch(res, err));
};

// "63513d264f6d342876316049"
