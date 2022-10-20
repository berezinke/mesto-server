module.exports.errorCatch = (res, err) => {
  const arrNameErrores = [
    ['ValidationError', 'ошибка валидации'],
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
    res.send({ message: `Произошла ${isValidError[1]}` });
  } else {
    console.dir(nameError);
    res.send({ message: 'А эту ошибку я не знаю' });
  }
};
