import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Vehicle from "../models/Vehicle.js";


import { protect } from "../middlewares/auth.js";


const router = express.Router({ mergeParams: true });

/* ---------------- PROFILE ---------------- */

// GET /api/users/profile
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("vehicles");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// PUT /api/users/profile
router.put("/profile", protect, async (req, res) => {
  try {
    const { fullName, email } = req.body;
    const user = await User.findById(req.user._id);

    if (user) {
      user.fullName = fullName || user.fullName;
      user.email = email || user.email;
      
      if (req.body.password) {
        user.password = await bcrypt.hash(req.body.password, 12);
      }

      const updatedUser = await user.save();
      
      // Do not return password
      updatedUser.password = undefined;

      res.json({
        success: true,
        user: updatedUser,
        message: "Profile updated successfully"
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

/* ---------------- JWT UTILS ---------------- */

const signToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const sendToken = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

/* ---------------- SIGNUP ---------------- */

router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password, vehicle } = req.body;

    // 1. Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 3. Create user
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    // 4. Vehicle logic (unchanged, but clean)
    if (vehicle) {
      const newVehicle = await Vehicle.create({
        userId: newUser._id,
        model: vehicle.model,
        batteryCapacity: vehicle.batteryCapacity,
        efficiency: vehicle.efficiency,
        connectorType: vehicle.connectorType,
        maxChargingPower: vehicle.maxChargingPower,
      });

      newUser.vehicles.push(newVehicle._id);
      newUser.defaultVehicle = newVehicle._id;
      await newUser.save();
    }

    // 5. Issue JWT (THIS replaces req.login)
    const token = signToken(newUser._id);
    sendToken(res, token);

    return res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ---------------- LOGIN ---------------- */

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body; 
    
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("USER:", user);
    console.log("HASH:", user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = signToken(user._id);
    sendToken(res, token); // MUST NOT send response

    res.status(200).json({
      message: "Logged in successfully",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

/* ---------------- LOGOUT ---------------- */

router.get("/logout", (req, res) => {
  // JWT logout = delete cookie
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return res.status(200).json({ message: "Logged out successfully" });
});

export default router;
