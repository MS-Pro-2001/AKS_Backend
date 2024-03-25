// imports

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import colors from "colors";

// routes import
import authRoute from "./routes/auth.route.js";
import userDetailsRoute from "./routes/userDetails.route.js";

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
dotenv.config();
const port = process.env.PORT;

// Connection to Database

const connectToDb = () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to Database".bgBlue.black);
  } catch (error) {
    throw error;
  }
};

// routes
app.use("/api/auth", authRoute);
app.use("/api/user", userDetailsRoute);

app.listen(port, () => {
  console.log(`listening to port ${port}`.bgMagenta);
  connectToDb();
});
