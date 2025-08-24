const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    doctor: {
      type: String,
      ref: "User", // Reference to User model
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    consultation_fee: {
      type: Number,
      required: true,
    },
    availability: {
      type: String,
      required: true,
    },
    next_slot: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
