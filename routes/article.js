const express = require("express");
const { authorize } = require("../middlewares/auth");
const {
  idValidation,
  createArticleValidation,
} = require("../middlewares/validation");

const router = express.Router();

const { createArticle, deleteArticle } = require("../controllers/articles");
const { getSavedArticles } = require("../controllers/savedArticle");

router.get("/", authorize, getSavedArticles);
router.post("/", authorize, createArticleValidation, createArticle);
router.delete("/:articleId", authorize, idValidation, deleteArticle);

module.exports = router;
