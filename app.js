const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const catchErrors = require('./middlewares/errors');

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* app.use((req, res, next) => {
  req.user = {
    _id: '63513d264f6d342876316049',
  };

  next();
}); */

// app.use('/', require('./routes/main'));

app.post('/signup', require('./controllers/auth').createUser);

app.post('/signin', require('./controllers/auth').login);

app.use(auth.authUser);

app.use('/users', require('./routes/users'));

app.use('/cards', require('./routes/cards'));

app.use('/*', require('./routes/catcherrorpath'));

app.use(errors()); // обработчик ошибок celebrate

app.use(catchErrors.catchErrores);

process.on('uncaughtException', (err, origin) => {
  console.dir(`${origin} ${err.name} c текстом ${err.message} не была обработана. Внимание!`);
});

app.listen(PORT, () => {
  // console.log(`App listening on port ${PORT}`)
});

// useNewUrlParser: true,
// useCreateIndex: true,
