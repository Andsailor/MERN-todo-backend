const errorHandler = (err, req, res, next) => {
  if (err.errors) {
    res
      .status(400)
      .json({ errorMessage: err.errors.title.message, statusCode: 400 });
  } else if (err.status) {
    res
      .status(err.status)
      .json({ errorMessage: err.message, statusCode: err.status });
  } else {
    res.status(500).json({ errorMessage: err.message, statusCode: 500 });
  }
};

module.exports = errorHandler;
