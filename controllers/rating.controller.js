// controllers/doctor.controller.js

const { rating } = require("../models");

const addRating = async (req, res) => {
  try {
    const newPost = await rating.create(req.body);

    res.status(201).json({
      message: "Rating added successfully.",
    });
  } catch (error) {
    console.error("Error adding rating:", error);
    res.status(500).json({
      message: "Something went wrong while saving your rating.",
      error: error.message,
    });
  }
};

module.exports = {
  addRating,
};
