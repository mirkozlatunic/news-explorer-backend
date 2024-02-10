const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const {
  VALID_EMAIL_VALIDATE_MESSAGE,
  INCORRECT_CREDENTIALS_ERROR_MESSAGE,
} = require("../utils/constants");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: VALID_EMAIL_VALIDATE_MESSAGE,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        throw new Error(INCORRECT_CREDENTIALS_ERROR_MESSAGE);
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new Error(INCORRECT_CREDENTIALS_ERROR_MESSAGE);
        }

        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
