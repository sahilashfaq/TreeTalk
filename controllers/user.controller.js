// user.controller.js

const { user } = require("../models");

const getUsers = async (req, res) => {
  try {
    const users = await user.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addUser = async (req, res) => {
  try {
    // Check if the email already exists
    const checkEmail = await user.findOne({
      where: { email: req.body.email },
    });
    if (checkEmail) {
      throw new Error("Email already exists");
    }
    const newUser = await user.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(200).json({
      success: true,
      message: "User added successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};

module.exports = {
  getUsers,
  addUser,
};
