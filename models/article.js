const mongoose = require("mongoose");
const validator = require("validator");
const { VALID_URL_VALIDATE_MESSAGE } = require("../utils/constants");

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: VALID_URL_VALIDATE_MESSAGE,
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: VALID_URL_VALIDATE_MESSAGE,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    // select: false; may or may not need it depends on if i want it included when fetching
  },
});

module.exports = mongoose.model("article", articleSchema);
