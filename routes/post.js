const express = require("express");
const { addPost, getAllPosts } = require("../controllers/post.controller");
const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    await addPost(req, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/getAllPosts", async (req, res) => {
  try {
    await getAllPosts(req, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
