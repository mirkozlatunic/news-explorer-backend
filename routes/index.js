const router = require("express").Router();
const userRouter = require("./user");
const articleRouter = require("./article");

const { createUser, login } = require("../controllers/users");
const {
  createUserValidation,
  createLoginAuthenticationValidation,
} = require("../middlewares/validation");
const { NotFoundError } = require("../utils/not-found");

router.use("/users", userRouter);
router.use("/articles", articleRouter);
router.post("/signup", createUserValidation, createUser);
router.post("/signin", createLoginAuthenticationValidation, login);

router.use((req, res, next) => {
  next(new NotFoundError(`Route ${req.url} not found!`));
});

module.exports = router;
