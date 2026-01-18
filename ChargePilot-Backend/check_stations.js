import mongoose from "mongoose";
import dotenv from "dotenv";
import ChargingStation from "./models/ChargingStation.js";

dotenv.config();

const checkStations = async () => {
  try {
    await mongoose.connect(process.env.ATLASDB_URL);
    
    const count = await ChargingStation.countDocuments();
    console.log(`Total Charging Stations: ${count}`);

    if (count > 0) {
      const station = await ChargingStation.findOne();
      console.log("Sample Station:", JSON.stringify(station, null, 2));
    } else {
        console.log("No stations found! This is likely why trip planning finds no stops.");
    }

    process.exit();
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

checkStations();
