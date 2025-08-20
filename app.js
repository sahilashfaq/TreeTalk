const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
require("dotenv").config();
const app = express();
const workSpaceRouter = require("./routes/workspace");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
  })
);
app.use("/api/v1/workspaces", workSpaceRouter);

connectDB();
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
