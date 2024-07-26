const express = require("express");
const { upload, createPost, fetchPosts } = require("../Controllers/Post");
const verifyToken = require("../Controllers/VerifyToken");
const FetchYourPosts = require("../Controllers/FetchYourPosts");
const DeletePost = require("../Controllers/DeletePost");
const { EditPost, uploadEdit } = require("../Controllers/EditPost");
const router = express.Router();

router.post("/post", verifyToken, upload.single("image"), createPost);
router.get("/", fetchPosts);
router.get("/yourposts/:id", verifyToken, FetchYourPosts);
router.delete("/delete/:id", verifyToken, DeletePost);
router.put("/editpost/:id", verifyToken, uploadEdit.single("image"), EditPost);
module.exports = router;
