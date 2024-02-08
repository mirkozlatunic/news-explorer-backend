const Article = require("../models/article");

const { BadRequestError } = require("../utils/errors");

const getSavedArticles = (req, res, next) => {
  console.log(req.user);
  Article.find({ owner: req.user._id })
    .then((articlesIds) => {
      res.status(200).send({ data: articlesIds });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid ID!"));
      }
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid ID!"));
      }
      next(err);
    });
};

module.exports = { getSavedArticles };
