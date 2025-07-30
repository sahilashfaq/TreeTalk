const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { user } = require("../models"); // Sequelize model

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { email, password, username, role } = req.body;

    const existingUser = await user.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({
        message:
          "Email already in use. Please try signing in or use a different email.",
      });
    }

    const newUser = await user.create({
      username,
      email,
      password, // plain password — hook will hash it
      role,
    });

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "User registered successfully!",
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        createdAt: newUser.createdAt,
      },
    });
  } catch (err) {
    console.error("Register Error:", err.message);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const foundUser = await user.findOne({ where: { email } });

    if (!foundUser) {
      return res
        .status(401)
        .json({ message: "User not found with this email" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, foundUser.password);

    console.log("====isMAtch", isMatch, "p");

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Generate token
    const token = jwt.sign({ id: foundUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
        role: foundUser.role,
        createdAt: foundUser.createdAt,
      },
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
