// routes/auth.routes.js
const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth.middleware");
const { registerUser, loginUser } = require("../controllers/auth.controller");

router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected route
router.get("/profile", verifyToken, (req, res) => {
  res.json({ message: "Welcome to profile", user: req.user });
});

module.exports = router;
