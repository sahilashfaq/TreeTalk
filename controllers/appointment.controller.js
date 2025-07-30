// controllers/doctor.controller.js

const { appointment, post, user, rating } = require("../models");

const addAppointment = async (req, res) => {
  try {
    const { post_id } = req.body;
    const isAlreadyScheduled = await appointment.findOne({
      where: { post_id, status: "scheduled" },
    });
    if (isAlreadyScheduled) {
      res.status(400).json({
        message: "This time slot is already scheduled.",
      });
      return;
    }
    const newPost = await appointment.create(req.body);

    res.status(201).json({
      message: "New Appointment added successfully.",
      newPost,
    });
  } catch (error) {
    console.error("Error creating Appointment:", error);
    res.status(500).json({
      message: "Something went wrong while saving your Appointment.",
      error: error.message,
    });
  }
};

// Get all doctor posts
const getAllAppointments = async (req, res) => {
  try {
    const posts = await appointment.findAll({
      include: [
        {
          model: user,
          as: "patient",
        },
        {
          model: post,
          as: "post",
          include: [
            {
              model: user,
              as: "doctor",
            },
          ],
        },
      ],
    });

    res.status(200).json({
      message: "Appointements retrieved successfully.",
      posts,
    });
  } catch (error) {
    console.error("Error fetching Appointements:", error);
    res.status(500).json({
      message: "Something went wrong while fetching Appointements.",
      error: error.message,
    });
  }
};

const AllUsersData = async (req, res) => {
  try {
    // Step 1: Get all appointments with post and doctor info
    const appointments = await appointment.findAll({
      include: [
        {
          model: post,
          as: "post",
          include: [
            {
              model: user,
              as: "doctor",
            },
          ],
        },
        {
          model: user,
          as: "patient",
        },
      ],
    });

    // Step 2: Get all ratings with post and doctor info
    const ratings = await rating.findAll({
      include: [
        {
          model: post,
          as: "post",
          include: [
            {
              model: user,
              as: "doctor",
            },
          ],
        },
      ],
    });

    // Step 3: Group and compute stats per doctor
    const doctorMap = new Map();

    appointments.forEach((appt) => {
      const doctor = appt.post?.doctor;
      if (!doctor) return;

      const docId = doctor.id;
      if (!doctorMap.has(docId)) {
        doctorMap.set(docId, {
          doctorId: docId,
          name: doctor.name,
          email: doctor.email,
          totalIncome: 0,
          completedCount: 0,
          scheduledCount: 0,
          ratingSum: 0,
          ratingCount: 0,
        });
      }

      const docStats = doctorMap.get(docId);

      if (appt.status === "completed") {
        docStats.totalIncome += Number(appt.post?.consultation_fee) || 0;
        docStats.completedCount += 1;
      } else if (appt.status === "scheduled") {
        docStats.scheduledCount += 1;
      }

      doctorMap.set(docId, docStats);
    });

    // Step 4: Add rating data
    ratings.forEach((r) => {
      const doctor = r.post?.doctor;
      if (!doctor) return;

      const docId = doctor.id;
      if (!doctorMap.has(docId)) return;

      const docStats = doctorMap.get(docId);
      docStats.ratingSum += Number(r.rating);
      docStats.ratingCount += 1;
    });

    // Step 5: Finalize stats (average rating)
    const doctorStats = Array.from(doctorMap.values()).map((doc) => {
      const avgRating =
        doc.ratingCount > 0
          ? (doc.ratingSum / doc.ratingCount).toFixed(1)
          : "0";
      return {
        doctorId: doc.doctorId,
        username: doc.username,
        email: doc.email,
        totalIncome: doc.totalIncome,
        completedCount: doc.completedCount,
        scheduledCount: doc.scheduledCount,
        averageRating: Number(avgRating),
      };
    });

    // ✅ Step 6: Calculate total revenue and completed appointments
    const totalRevenue = doctorStats.reduce(
      (sum, doctor) => sum + doctor.totalIncome,
      0
    );

    const totalCompletedAppointments = appointments.filter(
      (appt) => appt.status === "completed"
    ).length;

    res.status(200).json({
      message: "Stats by doctor retrieved successfully.",
      totalRevenue,
      totalCompletedAppointments,
      doctors: doctorStats,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error calculating per-doctor stats.",
      error: error.message,
    });
  }
};

const calculateDoctorIncome = async (req, res) => {
  const { id } = req.params;

  try {
    // Get completed appointments for income calculation
    const completedAppointments = await appointment.findAll({
      where: { status: "completed" },
      include: [
        {
          model: post,
          as: "post",
          where: { doctor_id: id },
          include: [
            {
              model: user,
              as: "doctor",
            },
          ],
        },
        {
          model: user,
          as: "patient",
        },
      ],
    });

    // Calculate total income from completed appointments
    const totalIncome = completedAppointments.reduce((sum, appt) => {
      const fee = Number(appt.post?.consultation_fee) || 0;
      return sum + fee;
    }, 0);

    // Count scheduled appointments for the doctor
    const scheduledCount = await appointment.count({
      where: { status: "scheduled" },
      include: [
        {
          model: post,
          as: "post",
          where: { doctor_id: id },
        },
      ],
    });

    // Count completed appointments for the doctor
    const completedCount = await appointment.count({
      where: { status: "completed" },
      include: [
        {
          model: post,
          as: "post",
          where: { doctor_id: id },
        },
      ],
    });

    res.status(200).json({
      message: "Income, completed and scheduled counts retrieved successfully.",
      totalIncome,
      scheduledCount,
      completedCount,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "Something went wrong while calculating income or counting appointments.",
      error: error.message,
    });
  }
};

const getAppointmentsByPatientId = async (req, res) => {
  try {
    const { id } = req.params;
    const checkRole = await user.findOne({ where: { id } });
    if (checkRole.role == "Service Provider") {
      const appointments = await appointment.findAll({
        include: [
          {
            model: post,
            as: "post",
            where: { doctor_id: id }, // filter inside the JOIN
            include: [
              {
                model: user,
                as: "doctor",
              },
            ],
          },
          {
            model: user,
            as: "patient",
          },
        ],
      });

      res.status(200).json({
        message: "Appointments for the doctors retrieved successfully.",
        appointments,
      });
    } else {
      const appointments = await appointment.findAll({
        where: { patient_id: id }, // filter inside the JOIN
        include: [
          {
            model: post,
            as: "post",
            include: [
              {
                model: user,
                as: "doctor",
              },
            ],
          },
          {
            model: user,
            as: "patient",
          },
        ],
      });

      res.status(200).json({
        message: "Appointments for the patient retrieved successfully.",
        appointments,
      });
    }
  } catch (error) {
    console.error("Error fetching patient appointments:", error);
    res.status(500).json({
      message: "Something went wrong while fetching appointments.",
      error: error.message,
    });
  }
};

const getAppointmentsByDoctorId = async (req, res) => {
  try {
    const { id: doctor_id } = req.params; // logged-in doctor ID

    const appointments = await appointment.findAll({
      include: [
        {
          model: post,
          as: "post",
          where: { doctor_id }, // filter inside the JOIN
          include: [
            {
              model: user,
              as: "doctor",
            },
          ],
        },
        {
          model: user,
          as: "patient",
        },
      ],
    });

    res.status(200).json({
      message: "Appointments for the doctor retrieved successfully.",
      appointments,
    });
  } catch (error) {
    console.error("Error fetching doctor appointments:", error);
    res.status(500).json({
      message: "Something went wrong while fetching appointments.",
      error: error.message,
    });
  }
};

const updateAppointmentStatus = async (req, res) => {
  const { id, status } = req.params;

  console.log("id=========", id);

  try {
    const appt = await appointment.findByPk(id);
    if (!appt)
      return res.status(404).json({ message: "Appointment not found", id: id });

    appt.status = status;
    await appt.save();

    return res
      .status(200)
      .json({ message: `Appointment ${status}`, appointment: appt });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update appointment time (now using req.body.patient_id instead of req.params)
const updateAppointmentDate = async (req, res) => {
  const { id, appointment_date } = req.body;

  try {
    const appt = await appointment.findByPk(id);

    if (!appt) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appt.appointment_date = appointment_date || appt.appointment_date;

    await appt.save();

    return res
      .status(200)
      .json({ message: "Appointment date updated", appointment: appt });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addAppointment,
  getAllAppointments,
  getAppointmentsByPatientId,
  updateAppointmentStatus,
  updateAppointmentDate,
  getAppointmentsByDoctorId,
  calculateDoctorIncome,
  AllUsersData,
};
