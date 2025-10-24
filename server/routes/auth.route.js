const express = require("express");
const { postRegisterHandler, postLoginHandler } = require("../controllers/auth.controller");

const router = express.Router();

router.route("/register").post(postRegisterHandler);
router.route("/login").post(postLoginHandler);

module.exports = router