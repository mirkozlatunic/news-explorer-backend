require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { errors } = require("celebrate");
const { DATABASE_URL } = require("./utils/config");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { errorHandler } = require("./middlewares/error-handler");

const limiter = require("./rateLimiter");

const { PORT = 3001 } = process.env;

const server = express();
server.use(helmet());
server.use(cookieParser());
mongoose.connect(
  DATABASE_URL,
  (r) => {
    console.log("connected to DB", r);
  },
  (e) => console.log("DB error", e),
);

const routes = require("./routes");

server.use(express.json());
server.use(cors());
server.use(requestLogger);

server.use(limiter);

server.use(errorLogger);
server.use(routes);
server.use(errors());
server.use(errorHandler);

server.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
