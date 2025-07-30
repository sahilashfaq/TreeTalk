const express = require("express");
const { getUsers, addUser } = require("../controllers/user.controller");
const router = express.Router();

router.get("/getUsers", async (req, res) => {
  try {
    await getUsers(req, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    await addUser(req, res);
  } catch (error) {
    res.status(500).json({ message: `Message in User Route ${error.message}` });
  }
});
module.exports = router;
