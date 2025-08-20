const express = require("express");
const Workspace = require("../models/workspace");
const router = express.Router();

// 👉 Create Workspace
router.post("/create", async (req, res) => {
  try {
    const { name, description } = req.body;
    const workspace = new Workspace({ name, description });
    await workspace.save();
    res.status(201).json(workspace);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 👉 Update Workspace
router.post("/update/:id", async (req, res) => {
  try {
    const { name, description } = req.body;

    const workspace = await Workspace.findByIdAndUpdate(
      req.params.id,
      { name, description }, // fields to update
      { new: true } // return the updated document
    );

    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found!" });
    }

    res.status(200).json(workspace); // 200 is better than 201 for updates
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 👉 Get All Workspaces
router.get("/", async (req, res) => {
  try {
    const workspaces = await Workspace.find();
    res.json(workspaces);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/:id", async (req, res) => {
  try {
    const workspace = await Workspace.findById(req.params.id);
    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }
    res.json(workspace);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
