const multer = require("multer");
const Posts = require("../Models/PostSchema");

const uploadEdit = multer({ dest: "uploads/" });

const EditPost = async (req, res) => {
  try {
    const { id } = req.params;
    const filter = { _id: id };
    const update = {
      title: req.body.title,
      summary: req.body.summary,
      content: req.body.content,
      author: req.body.author,
    };

    if (req.file) {
      update.image = req.file.path;
    }

    const updatedPost = await Posts.findOneAndUpdate(filter, update, {
      new: true,
    });

    if (!updatedPost) {
      return res.status(404).send("Post not found");
    }

    res.status(200).send("Edited successfully");
  } catch (error) {
    res.status(500).send("Error Editing your post");
  }
};

module.exports = { EditPost, uploadEdit };
