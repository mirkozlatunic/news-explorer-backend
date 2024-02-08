const express = require("express");

const { authorize } = require("../middlewares/auth");

const router = express.Router();

const { getCurrentUser } = require("../controllers/users");

router.get("/me", authorize, getCurrentUser);

module.exports = router;
