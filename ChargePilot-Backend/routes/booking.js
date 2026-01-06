import express from "express";
import { createBooking } from "../controllers/api/bookings.js";
import { protect } from "../middlewares/auth.js";
const router = express.Router();
// post api/bookings
router.post("/", protect, createBooking);

export default router;
