// routes/tripRoutes.js
import express from "express";
import {
  planTrip,
  getUserTrips,
  getTripById,
  updateTripStatus,
  deleteTrip,
  planTripWithWaypoints,
} from "../controllers/tripController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

// All routes require authentication
router.use(isAuthenticated);

// Trip planning
router.post("/plan", planTrip);
router.post("/plan-with-waypoints", planTripWithWaypoints);

// Trip management
router.get("/", getUserTrips);
router.get("/:id", getTripById);
router.patch("/:id/status", updateTripStatus);
router.delete("/:id", deleteTrip);

export default router;
