// models/Trip.js
import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: true,
  },

  source: {
    address: String,
    coordinates: {
      type: [Number], // [lng, lat]
      required: true,
    },
  },

  destination: {
    address: String,
    coordinates: {
      type: [Number], // [lng, lat]
      required: true,
    },
  },

  startBatteryPercentage: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
  },

  routeGeometry: {
    type: {
      type: String,
      enum: ["LineString"],
      default: "LineString",
    },
    coordinates: {
      type: [[Number]], // Array of [lng, lat] pairs
      required: true,
    },
  },

  totalDistance: {
    type: Number, // meters
    required: true,
  },

  totalDuration: {
    type: Number, // seconds
    required: true,
  },

  chargingStops: [
    {
      stationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ChargingStation",
      },
      stationName: String,
      location: [Number], // [lng, lat]
      address: Object,
      distanceFromStart: Number, // km
      batteryAtArrival: Number, // percentage
      batteryAfterCharging: Number, // percentage
      energyAdded: Number, // kWh
      chargingTime: Number, // minutes
      cost: Number, // INR
      chargerType: String,
      chargerPower: Number, // kW
      amenities: Object,
    },
  ],

  totalChargingTime: {
    type: Number, // minutes
    default: 0,
  },

  totalChargingCost: {
    type: Number, // INR
    default: 0,
  },

  estimatedTotalCost: {
    type: Number, // INR
    default: 0,
  },

    status: {
    type: String,
    enum: ["planned", "in_progress", "completed", "cancelled"],
    default: "planned",
  },
  
  startedAt: Date,
  completedAt: Date,

  notes: String,
}, { timestamps: true });

// Index for user trips
tripSchema.index({ user: 1, createdAt: -1 });

export default mongoose.model("Trip", tripSchema);
