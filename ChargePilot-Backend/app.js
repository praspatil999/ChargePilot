import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";


const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride("_method"));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

mongoose
  .connect("mongodb://127.0.0.1:27017/ChargePilot")
  .then(() => console.log("Connected to DB"))
  .catch(console.error);

import userRouter from "./routes/user.js";
import stationRoutes from "./routes/station.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import bookingRoutes from "./routes/booking.js";

app.use("/", userRouter);
app.use("/api/stations", stationRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/bookings", bookingRoutes);

app.listen(port, () => {
  console.log("Listening on port 8080");
});
