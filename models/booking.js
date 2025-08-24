const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    patient_id: {
      type: String,
      required: true,
    },
    service_id: {
      type: String,
      required: true,
    },
    appointment_date: {
      type: String,
      required: true,
    },
    appointment_time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
