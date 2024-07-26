const Users = require("../Models/User");

const FetchUsername = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findOne({ _id: id });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send("Error finding username");
  }
};

module.exports = FetchUsername;
