const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const { PORT = 3000 } = process.env;
// process.on('uncaughtException', (err, origin) => {
// console.dir(`${origin} ${err.name} c текстом ${err.message} не была обработана. Внимание!`);
//  });

mongoose.connect('mongodb://localhost:27017/mestodb', {});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '63513d264f6d342876316049',
  };

  next();
});

app.use('/', require('./routes/main'));

app.use('/users', require('./routes/users'));

app.use('/cards', require('./routes/cards'));

app.use('/*', require('./routes/catcherrorpath'));

app.listen(PORT, () => {
  // console.log(`App listening on port ${PORT}`)
});

// useNewUrlParser: true,
// useCreateIndex: true,
