const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const handleAuthError = (err, next) => {
  const errorMessage = err ? err.message : "Authorization Error";
  return next(new UnauthorizedError(errorMessage));
};

const extractBearerToken = (header) => header.replace("Bearer ", "");

const authorize = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleAuthError(next);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleAuthError(next, err);
  }

  req.user = payload;
  console.log(req.user);

  return next();
};

module.exports = { authorize };
