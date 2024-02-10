const Article = require("../models/article");
const {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} = require("../utils/errors");

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
        next(new BadRequestError("Invalid ID!"));
      }
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid ID!"));
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
        next(new BadRequestError("Invalid ID!"));
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
