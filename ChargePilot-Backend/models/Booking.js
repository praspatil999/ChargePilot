import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    stationOCMId: {
      type: Number,
      required: true,
    },

    stationSnapshot: {
      name: String,
      address: String,
      chargerType: String,
      power: Number,
      pricePerUnit: Number,
    },

    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },

    chargerType: {
      type: String,
      enum: ["AC", "DC"],
      required: true,
    },

    scheduledStart: {
      type: Date,
      required: true,
    },

    scheduledEnd: {
      type: Date,
      required: true,
    },

    actualStart: {
      type: Date,
    },

    actualEnd: {
      type: Date,
    },

    estimatedEnergy: {
      type: Number, // kWh
    },

    actualEnergy: {
      type: Number, // kWh
    },

    pricePerUnit: {
      type: Number, // ₹ per kWh
      required: true,
    },

    estimatedCost: {
      type: Number, // ₹
    },

    actualCost: {
      type: Number, // ₹
    },

    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "active",
        "completed",
        "cancelled",
        "no_show",
      ],
      default: "pending",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "refunded", "failed"],
      default: "pending",
    },

    paymentMethod: {
      type: String,
      enum: ["card", "upi", "wallet"],
    },

    paymentId: {
      type: String,
    },

    qrCode: {
      type: String, // QR code for station scanning
    },

    checkinCode: {
      type: String, // 6-digit code for check-in
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
    },

    feedback: {
      type: String,
    },

    cancelledAt: {
      type: Date,
    },

    cancellationReason: {
      type: String,
    },
  },
  { timestamps: true }
);

// Generate booking number
bookingSchema.pre("save", function () {
  if (!this.checkinCode) {
    this.checkinCode = Math.floor(100000 + Math.random() * 900000).toString();
  }
});


// Calculate estimated cost
bookingSchema.methods.calculateEstimatedCost = function () {
  const hours = (this.scheduledEnd - this.scheduledStart) / (1000 * 60 * 60);
  const power = this.vehicle.maxChargingPower || 7; // Default to 7kW if not specified
  this.estimatedEnergy = hours * power;
  this.estimatedCost = this.estimatedEnergy * this.pricePerUnit;
  return this.estimatedCost;
};

// Calculate actual cost
bookingSchema.methods.calculateActualCost = function () {
  if (this.actualEnergy && this.pricePerUnit) {
    this.actualCost = this.actualEnergy * this.pricePerUnit;
    return this.actualCost;
  }
  return 0;
};

export default mongoose.model("Booking", bookingSchema);
