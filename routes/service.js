const express = require("express");
const Service = require("../models/service");
const User = require("../models/user");
const router = express.Router();

// 👉 Add a new service
router.post("/add", async (req, res) => {
  try {
    const newService = new Service(req.body);
    await newService.save();

    res.status(201).json({
      message: "Service posted successfully",
      data: newService,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 👉 Get all services with doctor details
router.get("/getAll", async (req, res) => {
  try {
    const services = await Service.find().lean();
    // Attach doctor details manually
    const formatted = await Promise.all(
      services.map(async (s) => {
        const doctor = await User.findById(s.doctor_id)
          .select("username email")
          .lean();

        return {
          ...s,
          doctor: doctor
            ? {
                id: doctor._id,
                username: doctor.username,
                email: doctor.email,
              }
            : null,
        };
      })
    );

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
