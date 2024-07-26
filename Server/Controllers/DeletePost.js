const Posts = require("../Models/PostSchema");

const DeletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Posts.findOneAndDelete({ _id: id });
    res.status(200).send("Deleted sucessfully");
  } catch (error) {
    res.status(500).send("Error finding your posts");
  }
};

module.exports = DeletePost;
