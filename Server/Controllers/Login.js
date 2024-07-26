const Users = require("../Models/User");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("Enter both username and password");
  }
  try {
    const user = await Users.findOne({ username });
    if (!user) {
      return res.status(404).send("User not found");
    }
    if (await argon2.verify(user.password, password)) {
      const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.SECRET_KEY,
        { expiresIn: "30d" }
      );
      res.status(200).json({ token, username, userID: user._id });
    } else {
      return res.status(400).send("Password incorrect");
    }
  } catch (error) {
    res.status(500).send("Error logging in");
  }
};

module.exports = Login;
