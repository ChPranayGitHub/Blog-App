const express = require("express");
const Post = require("../Models/PostSchema");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadsDir = "uploads";
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const createPost = async (req, res) => {
  const { title, summary, content, author } = req.body;
  const image = req.file ? req.file.path : null;
  const newPost = new Post({
    title,
    summary,
    content,
    image,
    author,
  });

  try {
    await newPost.save();
    res.status(201).json({ message: "Post created successfully!" });
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ error: "Error creating post" });
    } else {
      console.error("Headers already sent:", error);
    }
  }
};

const fetchPosts = async (req, res) => {
  try {
    const Posts = await Post.find({});
    res.status(200).json(Posts);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  upload,
  createPost,
  fetchPosts,
};
