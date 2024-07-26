const argon2 = require("argon2");
const Users = require("../Models/User");

const Register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("Enter both username and password");
  }

  try {
    const hashedPassword = await argon2.hash(password);
    const user = await Users.create({ username, password: hashedPassword });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send("Error creating user");
  }
};

module.exports = Register;
