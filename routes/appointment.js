const express = require("express");
const {
  addAppointment,
  getAllAppointments,
  getAppointmentsByPatientId,
  updateAppointmentDate,
  getAppointmentsByDoctorId,
  updateAppointmentStatus,
  calculateDoctorIncome,
  AllUsersData,
  doctorDashboardData,
} = require("../controllers/appointment.controller");
const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    await addAppointment(req, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/getAllAppointments", async (req, res) => {
  try {
    await getAllAppointments(req, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/calculateTotalIncome/:id", async (req, res) => {
  try {
    await calculateDoctorIncome(req, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/getAllAppointments/:id", async (req, res) => {
  try {
    await getAppointmentsByPatientId(req, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/updateStatus/:id/:status", async (req, res) => {
  try {
    await updateAppointmentStatus(req, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/update", async (req, res) => {
  try {
    await updateAppointmentDate(req, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/dashboardData/:id", async (req, res) => {
  try {
    await doctorDashboardData(req, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
