import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    model: {
      type: String,
      required: true,
    },

    batteryCapacity: {
      type: Number, // kWh
      required: true,
    },

    efficiency: {
      type: Number, // km per kWh
      required: true,
    },

    connectorType: {
      type: String, // CCS, Type2, CHAdeMO
      required: true,
    },

    maxChargingPower: {
      type: Number, // kW
    },
  },
  { timestamps: true }
);

export default mongoose.model("Vehicle", VehicleSchema);
