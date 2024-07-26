const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const UserRouter = require("./Routes/UserRoutes");
const PostRouter = require("./Routes/PostRoutes");
const path = require("path");
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/", UserRouter);
app.use("/", PostRouter);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Connected to server ${process.env.PORT || 5000}`);
    });
  } catch (error) {
    console.error("Failed to connect to DB", error);
  }
};

start();
