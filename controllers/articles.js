const Article = require("../models/article");
const BadRequestError = require("../utils/bad-request");
const NotFoundError = require("../utils/not-found");
const ForbiddenError = require("../utils/forbidden");
const { INVALID_ID_ERROR_MESSAGE } = require("../utils/constants");

const createArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  console.log(req.user);
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((item) => {
      res.status(200).send({ date: item });
    })
    .catch((err) => {
      console.error(err, err.name, err.message);
      if (err.name === "CastError") {
        next(new BadRequestError(INVALID_ID_ERROR_MESSAGE));
      }
      if (err.name === "ValidationError") {
        next(new BadRequestError(INVALID_ID_ERROR_MESSAGE));
      }
      next(err);
    });
};

const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  console.log({ articleId });
  Article.findById(articleId)
    .orFail(() => {
      throw new Error("Item id is not found.");
    })
    .then((item) => {
      if (!item.owner.equals(req.user._id)) {
        throw new Error("Access to this resource is forbidden.");
      }
      return item.deleteOne().then(() => {
        res.status(200).send({ message: "item was deleted" });
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        next(new BadRequestError(INVALID_ID_ERROR_MESSAGE));
      }
      if (err.message === "Item id is not found.") {
        next(new NotFoundError("Id is not found in the database!"));
      }
      if (err.message === "Access to this resource is forbidden.") {
        next(new ForbiddenError("Access to this resource is forbidden."));
      }

      next(err);
    });
};

module.exports = { createArticle, deleteArticle };
