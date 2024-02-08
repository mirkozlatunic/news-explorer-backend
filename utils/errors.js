function BadRequestError(message) {
  return {
    name: "BadRequestError",
    message: message || "Bad Request Error",
    statusCode: 400,
  };
}
function UnauthorizedError(message) {
  return {
    name: "UnauthorizedError",
    message: message || "Unauthorized Error",
    statusCode: 401,
  };
}
function ForbiddenError(message) {
  return {
    name: "ForbiddenError",
    message: message || "Forbidden Error",
    statusCode: 403,
  };
}
function NotFoundError(message) {
  return {
    name: "NotFoundError",
    message: message || "Not Found Error",
    statusCode: 404,
  };
}
function ConflictError(message) {
  return {
    name: "ConflictError",
    message: message || "Conflict Error",
    statusCode: 409,
  };
}

module.exports = {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
};
