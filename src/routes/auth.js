const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");

const { signup, login } = require("../controllers/auth.js");

//@route    POST /signup
//@desc     User signup
//@access   PUBLIC
router.post("/signup", signup.controller);

//@route    POST /login
//@desc     User login
//@access   PUBLIC
router.post("/login", login.controller);

module.exports = router;
