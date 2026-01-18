// routes/tripRoutes.js
import express from "express";
import {
  planTrip,
  getUserTrips,
  getTripById,
  updateTripStatus,
  deleteTrip,
} from "../controllers/tripController.js";
import { protect as isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// All routes require authentication
router.use(isAuthenticated);

// Trip planning
router.post("/plan", planTrip);

// Trip management
router.get("/", getUserTrips);
router.get("/:id", getTripById);
router.patch("/:id/status", updateTripStatus);
router.delete("/:id", deleteTrip);

export default router;
