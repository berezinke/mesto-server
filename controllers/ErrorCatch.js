module.exports.errorCatch = (res, err) => {
  const arrNameErrores = [
    ['ValidationError', 'ошибка валидации', 400],
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
    // console.dir(nameError);
    res.status(400).send({ message: 'ошибка валидации' });
    // res.status(400).send({ message: `Произошла ${isValidError[1]}` });
    // res.status(isValidError[2]).send({ message: `Произошла ${isValidError[1]}` });
  } else {
    // console.dir(nameError);
    res.status(500).send({ message: `А эту ошибку ${nameError} программа пока не знает` });
  }
};
