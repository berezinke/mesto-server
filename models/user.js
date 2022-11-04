const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const outValidator = require('validator');
const NotValidError = require('../errores/errornotvalid');

function validationEmail(val) {
  return outValidator.isEmail(val);
}

function validationUrl(val) {
  console.dir('1');
  return outValidator.isURL(val);
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    default: 'kusto@gmail.com',
    validate: validationEmail,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    default: '88888888',
    select: false,
  },
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: validationUrl,
  },
});

userSchema.statics.findUserByParams = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new NotValidError('Неправильное имя пользователя или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new NotValidError('Неправильное имя пользователя или пароль');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
