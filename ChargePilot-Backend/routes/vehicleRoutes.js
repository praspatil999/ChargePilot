import express from "express";
import Vehicle from "../models/Vehicle.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

// GET /api/vehicles
router.get("/", protect,async (req, res) => {
  try {
    // Hard auth guarantee
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    console.log("i am in fetch vehicles api");
    
    const vehicles = await Vehicle.find({ userId: req.user._id }).lean();

    return res.status(200).json({
      success: true,
      count: vehicles.length,
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
