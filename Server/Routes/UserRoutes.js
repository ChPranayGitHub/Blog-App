const express = require("express");
const Register = require("../Controllers/Register");
const Login = require("../Controllers/Login");
const FetchUsername = require("../Controllers/FetchUsername");

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/:id", FetchUsername);
module.exports = router;
