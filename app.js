const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
require("dotenv").config();
const app = express();
const workSpaceRouter = require("./routes/workspace");
const userRouter = require("./routes/users");
const serviceRouter = require("./routes/service");
const bookingRouter = require("./routes/booking");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
  })
);
app.use(`${process.env.VERSION1}/workspaces`, workSpaceRouter);
app.use(`${process.env.VERSION1}/auth`, userRouter);
app.use(`${process.env.VERSION1}/service`, serviceRouter);
app.use(`${process.env.VERSION1}/bookings`, bookingRouter);

connectDB();
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
