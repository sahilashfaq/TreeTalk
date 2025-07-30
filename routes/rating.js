const express = require("express");
const { addRating } = require("../controllers/rating.controller");
const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    await addRating(req, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
