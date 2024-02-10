const { SERVER_ERROR_MESSAGE } = require("../utils/constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? SERVER_ERROR_MESSAGE : err.message;
  res.status(statusCode).send({ message });
  next();
};

module.exports = { errorHandler };
