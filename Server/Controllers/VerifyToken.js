require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized user" });
      } else {
        next();
      }
    });
  } else {
    return res.status(401).json({ message: "Unauthorized, Please login" });
  }
};

module.exports = verifyToken;
