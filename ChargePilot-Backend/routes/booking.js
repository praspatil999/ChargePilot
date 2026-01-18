import express from "express";
import { createBooking, getMyBookings } from "../controllers/api/bookings.js";
import { protect } from "../middlewares/auth.js";
const router = express.Router();
// post api/bookings
router.post("/", protect, createBooking);

// get api/bookings/my
router.get("/my", protect, getMyBookings);

export default router;
