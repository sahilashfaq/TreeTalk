// controllers/doctor.controller.js

const { post } = require("../models");
const { user } = require("../models");

const addPost = async (req, res) => {
  try {
    const newPost = await post.create(req.body);

    res.status(201).json({
      message: "New Post created successfully.",
      newPost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({
      message: "Something went wrong while saving your post.",
      error: error.message,
    });
  }
};

// Get all doctor posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await post.findAll({
      include: {
        model: user,
        as: "doctor",
      },
    });

    res.status(200).json({
      message: "Posts retrieved successfully.",
      posts,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({
      message: "Something went wrong while fetching posts.",
      error: error.message,
    });
  }
};

module.exports = {
  addPost,
  getAllPosts,
};
