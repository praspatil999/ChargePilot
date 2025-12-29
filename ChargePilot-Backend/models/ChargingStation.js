// models/ChargingStation.js
import mongoose from "mongoose";

const chargingStationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
      default: "Point",
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
      index: "2dsphere",
    },
  },

  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: {
      type: String,
      default: "India",
    },
  },

  chargers: [
    {
      type: {
        type: String,
        enum: ["AC", "DC", "CHAdeMO", "CCS", "Type2"],
        required: true,
      },
      power: {
        type: Number, // kW
        required: true,
      },
      pricePerKwh: {
        type: Number,
        required: true,
      },
      count: {
        type: Number,
        default: 1,
      },
      status: {
        type: String,
        enum: ["available", "in_use", "maintenance", "offline"],
        default: "available",
      },
    },
  ],

  amenities: {
    wifi: { type: Boolean, default: false },
    cafe: { type: Boolean, default: false },
    restroom: { type: Boolean, default: false },
    parking: { type: Boolean, default: false },
    convenience_store: { type: Boolean, default: false },
  },

  operatingHours: {
    open: String, // "06:00"
    close: String, // "22:00"
    is24x7: { type: Boolean, default: false },
  },

  rating: {
    average: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    count: {
      type: Number,
      default: 0,
    },
  },

  isActive: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create 2dsphere index for geospatial queries
chargingStationSchema.index({ location: "2dsphere" });

// Update timestamp before saving
chargingStationSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model("ChargingStation", chargingStationSchema);
