const Posts = require("../Models/PostSchema");

const FetchYourPosts = async (req, res) => {
  try {
    const { id } = req.params;
    const UserPosts = await Posts.find({ author: id });
    res.status(200).json(UserPosts);
  } catch (error) {
    res.status(500).send("Error finding your posts");
  }
};

module.exports = FetchYourPosts;
