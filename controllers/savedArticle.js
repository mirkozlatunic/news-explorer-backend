const Article = require("../models/article");
const { INVALID_ID_ERROR_MESSAGE } = require("../utils/constants");

const { BadRequestError } = require("../utils/bad-request");

const getSavedArticles = (req, res, next) => {
  console.log(req.user);
  Article.find({ owner: req.user._id })
    .then((articlesIds) => {
      res.status(200).send({ data: articlesIds });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        next(new BadRequestError(INVALID_ID_ERROR_MESSAGE));
      }
      if (err.name === "ValidationError") {
        next(new BadRequestError(INVALID_ID_ERROR_MESSAGE));
      }
      next(err);
    });
};

module.exports = { getSavedArticles };
