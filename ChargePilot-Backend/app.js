import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import express from "express";
const app = express();
const port = 8080;
import methodOverride from "method-override"; 
app.use(methodOverride("_method"));
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
app.use(express.urlencoded({ extended: true }));
import ejsMate from "ejs-mate";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.engine("ejs", ejsMate);
app.listen(port, () => {
  console.log("Listing to port : 8080");
});
import cors from "cors";
app.use(
  cors({
    origin: "http://localhost:5173", // Your React URL
    credentials: true,
  })
);
import mongoose from "mongoose";
import session from "express-session";
const express = require('express');
import passport from "passport";
import LocalStrategy from "passport-local";
import flash from "connect-flash";
import "./config/passport.js";
import User from "./models/User.js";
import userRouter from "./routes/user.js"
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "ev-app-secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const MONGO_URL = "mongodb://127.0.0.1:27017/ChargePilot";

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(MONGO_URL);
}

// 1. Setup the Strategy
passport.use(new LocalStrategy({ usernameField: 'email' }, User.authenticate()));
passport.use(User.createStrategy());
// 2. Setup Serialization (allows staying logged in via sessions)
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// 3. Initialize in Express
app.use(passport.initialize());
app.use(passport.session());

app.use("/", userRouter);


import stationRoutes from "./routes/station.js";
app.use("/api/stations", stationRoutes);


// app.js or server.js
import vehicleRoutes from "./routes/vehicleRoutes.js";
app.use("/api/vehicles", vehicleRoutes);

import bookingRoutes from "./routes/bookingRoutes.js";

app.use("/api/bookings", bookingRoutes);

app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Import routes
const authRoutes = require('./routes/authRoutes'); // Your existing auth routes
const userRoutes = require('./routes/userRoutes'); // New user routes

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes); // Add this line

// Your other routes...

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});