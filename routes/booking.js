const Booking = require("../models/booking");
const express = require("express");
const Service = require("../models/service");
const User = require("../models/user");
const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const {
      service_id,
      patient_id,
      appointment_date,
      appointment_time,
      status,
    } = req.body;

    const alreadyBooked = await Booking.findOne({
      service_id,
      status: "scheduled",
    });

    if (alreadyBooked) {
      return res.status(400).json({ message: "Service is already booked!" });
    }

    const newBooking = new Booking({
      service_id,
      patient_id,
      appointment_date,
      appointment_time,
      status: status || "scheduled",
    });

    await newBooking.save();

    // Convert MongoDB _id to id (string)
    const responseData = {
      id: newBooking._id.toString(),
      service_id: newBooking.service_id,
      patient_id: newBooking.patient_id,
      appointment_date: newBooking.appointment_date,
      appointment_time: newBooking.appointment_time,
      status: newBooking.status,
      serviceDetails,
      createdAt: newBooking.createdAt,
      updatedAt: newBooking.updatedAt,
    };

    res.status(201).json({
      message: "Booking added successfully",
      data: responseData,
    });
  } catch (error) {
    console.error("Error adding booking:", error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
});

router.get("/getAllBookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res
      .status(200)
      .json({ message: "All Bookings fetched succesfully", data: bookings });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
});

router.get("/getUserBookings/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const userBookings = await Booking.find({ patient_id: id });

    if (!userBookings || userBookings.length === 0) {
      return res.status(404).json({
        message: "No bookings found for this user",
      });
    }

    // Merge service details with each booking
    const bookingsWithServices = await Promise.all(
      userBookings.map(async (booking) => {
        const serviceDetails = await Service.findById(
          booking.service_id
        ).lean();
        const doctorDetails = await User.findById(
          serviceDetails.doctor_id
        ).lean();
        return {
          ...booking.toObject(),
          serviceDetails,
          doctorDetails,
        };
      })
    );

    res.status(200).json({
      message: "User bookings fetched successfully",
      data: bookingsWithServices,
    });
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
});

module.exports = router;
