module.exports.catchErrores = (err, req, res, next) => {
  if (err.statusCode) {
    console.dir(err);
    res.status(err.statusCode).send({ message: `err.message ${err.statusCode}` });
  } else {
    console.dir(err);
    console.dir(err.statusCode);
    res.status(500).send({ message: 'Внутренняя ошибка сервера!!!' });
  }
  next(); // пропускаем запрос дальше
};
