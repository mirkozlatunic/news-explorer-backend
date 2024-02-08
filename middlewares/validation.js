const { Joi, celebrate, Segments } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const createUserValidation = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required().messages({
      "string.empty": "The 'email' field must be filled in",
    }),
    password: Joi.string().required().messages({
      "string.empty": "The 'password' field must be filled in",
    }),
    name: Joi.string().min(2).max(30).required().messages({
      "string.min": "The minimum length of 'name' field is 2",
      "string.max": "The maximum lenght of 'name field is 30",
      "string.empty": "The 'name' field must be filled in",
    }),
  }),
});

const createLoginAuthenticationValidation = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required().messages({
      "string.empty": "The 'email' field must be filled in",
    }),
    password: Joi.string().required().messages({
      "string.empty": "The 'password' field must be filled in",
    }),
  }),
});

const idValidation = celebrate({
  [Segments.PARAMS]: Joi.object({
    articleId: Joi.string().length(24).hex().required().messages({
      "string.empty": "The 'articleId' field must be filled in",
      "string.length": "The 'articleId' field must have a length of 24",
    }),
  }),
});

const createArticleValidation = celebrate({
  [Segments.BODY]: Joi.object({
    keyword: Joi.string().required().messages({
      "string.empty": "The 'keyword' field must be filled in",
    }),
    title: Joi.string().required().messages({
      "string.empty": "The 'title' field must be filled in",
    }),
    text: Joi.string().required().messages({
      "string.empty": "The 'text' field must be filled in",
    }),
    date: Joi.string().required().messages({
      "string.empty": "The 'date' field must be filled in",
    }),
    source: Joi.string().required().messages({
      "string.empty": "The 'source' field must be filled in",
    }),
    author: Joi.string().required().messages({
      "string.empty": "The 'author' field must be filled in",
    }),
    link: Joi.string().custom(validateURL).required().messages({
      "string.empty": "The 'link' field must be filled in",
      "string.uri": "The 'link' field must be a valid url",
    }),
    image: Joi.string().custom(validateURL).required().messages({
      "string.empty": "The 'image' field must be filled in",
      "string.uri": "The 'image' field must be a valid url",
    }),
  }),
});

module.exports = {
  createUserValidation,
  createLoginAuthenticationValidation,
  idValidation,
  createArticleValidation,
};
