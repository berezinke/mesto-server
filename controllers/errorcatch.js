const NotFoundError = require('../errores/errornotfound');

module.exports.errorPath = () => {
  throw new NotFoundError('Такого пути программа пока не знает');
};

/*  module.exports.errorCatch = (res, err) => {
  const arrNameErrores = [
    ['ValidationError', 'ошибка валидации', 400],
    ['CastError', 'ошибка поиска. Инфа не найдена', 400],
    ['DocumentNotFoundError', 'ошибка поиска. Таких данных нет', 404],
  ];
  const nameError = err.name;

  function isInArray(element) {
    let findResult = false;

    if (element[0] === nameError) {
      findResult = true;
    }
    return findResult;
  }

  const isValidError = arrNameErrores.find(isInArray);

  if (isValidError) {
    res.status(isValidError[2]).send({ message: `Произошла ${isValidError[1]}` });
  } else {
    console.dir(nameError);
    console.dir(err);
    res.status(500).send({ message: `А эту ошибку ${nameError} выдал сервер` });
  }
};  */
