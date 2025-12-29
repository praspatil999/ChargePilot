// routes/vehicleRoutes.js
import express from "express";
import Vehicle from "../models/Vehicle.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
const router = express.Router();


// GET /api/vehicles
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ user: req.user._id });

    return res.status(200).json({
      success: true,
      vehicles,
    });
  } catch (error) {
    console.error("Fetch vehicles error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch vehicles",
    });
  }
});

export default router;
