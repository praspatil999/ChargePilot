import express from "express";
import { createBooking } from "../controllers/booking.controller.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/", isAuthenticated, createBooking);

export default router;
