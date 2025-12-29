import express from "express";
import User from "../models/User.js";
import Vehicle from "../models/Vehicle.js";
import passport from "passport";
const router = express.Router({ mergeParams: true });
import passportLocalMongoose from "passport-local-mongoose";


router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password, vehicle } = req.body;

    // 1. Create the User object (without password, .register handles that)
    const newUser = new User({ fullName, email });

    // 2. Use passport-local-mongoose's .register() method
    // This saves the user and hashes the password automatically
    const registeredUser = await User.register(newUser, password);

    // 3. Handle Vehicle logic if provided
    if (vehicle) {
      const newVehicle = new Vehicle({
        userId: registeredUser._id, // Link vehicle to user
        model: vehicle.model,
        batteryCapacity: vehicle.batteryCapacity,
        efficiency: vehicle.efficiency,
        connectorType: vehicle.connectorType,
        maxChargingPower: vehicle.maxChargingPower,
      });

      const savedVehicle = await newVehicle.save();

      // 4. Update the User with the vehicle reference
      registeredUser.vehicles.push(savedVehicle._id);
      registeredUser.defaultVehicle = savedVehicle._id;
      await registeredUser.save();
    }

    // 5. Automatically log the user in after signup
    req.login(registeredUser, (err) => {
      if (err)
        return res.status(500).json({ message: "Login failed after signup" });

      return res.status(201).json({
        message: "Signup successful!",
        user: {
          id: registeredUser._id,
          fullName: registeredUser.fullName,
          email: registeredUser.email,
        },
      });
    });
  } catch (error) {
    // passport-local-mongoose throws specific errors (e.g., UserExistsError)
    res.status(400).json({ message: error.message });
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    if (!user) {
      // info contains the error message from passport-local-mongoose
      return res
        .status(401)
        .json({ message: info.message || "Invalid email or password" });
    }

    req.logIn(user, (err) => {
      if (err) return res.status(500).json({ message: "Login failed" });

      return res.status(200).json({
        message: "Logged in successfully!",
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
        },
      });
    });
  })(req, res, next);
});


router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    // This clears the session cookie on the client side
    res.status(200).json({ message: "Logged out successfully!" });
  });
});

export default router;
