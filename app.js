const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const auth = require('./middlewares/auth');
const catchErrors = require('./middlewares/errors');

const app = express();

const { PORT = 3000 } = process.env;

const validUrl = /(https?:\/\/[a-z0-9_\-.]+[a-z]{2,9})(\/[a-z0-9_\-.])*?/i;

mongoose.connect('mongodb://localhost:27017/mestodb', {});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(validUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), require('./controllers/auth').createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), require('./controllers/auth').login);

app.use(auth.authUser);

app.use('/users', require('./routes/users'));

app.use('/cards', require('./routes/cards'));

app.use('/*', require('./routes/catcherrorpath'));

app.use(errors()); // обработчик ошибок celebrate

app.use(catchErrors.catchErrores);

process.on('uncaughtException', (err, origin) => {
  console.dir(`${origin} ${err.name} c текстом ${err.message} не была обработана. Внимание!`);
});

app.listen(PORT);
