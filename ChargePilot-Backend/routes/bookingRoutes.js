import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

/**
 * CHECK SLOT AVAILABILITY
 * Prevent overlapping bookings
 */
router.post("/check-availability", async (req, res) => {
  try {
    const { station, chargerType, scheduledStart, scheduledEnd } = req.body;

    // Validate input
    if (!station || !chargerType || !scheduledStart || !scheduledEnd) {
      return res.status(400).json({
        available: false,
        message: "Missing required fields",
      });
    }

    const start = new Date(scheduledStart);
    const end = new Date(scheduledEnd);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        available: false,
        message: "Invalid date format",
      });
    }

    // Overlap check
    const conflict = await Booking.findOne({
      station: station, // string is allowed
      chargerType,
      status: { $in: ["pending", "confirmed", "active"] },
      scheduledStart: { $lt: end },
      scheduledEnd: { $gt: start },
    });

    if (conflict) {
      return res.json({ available: false });
    }

    return res.json({ available: true });
  } catch (error) {
    console.error("CHECK AVAILABILITY ERROR:", error);
    return res.status(500).json({
      available: false,
      message: "Internal server error",
    });
  }
});

/**
 * CREATE BOOKING
 */
router.post("/create", async (req, res) => {
  try {
    const booking = new Booking(req.body);

    booking.calculateEstimatedCost();
    booking.status = "confirmed";

    await booking.save();

    res.status(201).json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error("CREATE BOOKING ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Booking creation failed",
    });
  }
});

export default router;
