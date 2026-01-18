import mongoose from "mongoose";
import dotenv from "dotenv";
import ChargingStation from "./models/ChargingStation.js";

dotenv.config();

const sampleStations = [
  {
    name: "Tata Power Charging Station - Vashi",
    location: { type: "Point", coordinates: [72.9904, 19.0745] }, // Vashi
    address: { street: "Palm Beach Rd", city: "Navi Mumbai", state: "Maharashtra", pincode: "400703" },
    chargers: [
        { type: "CCS", power: 50, pricePerKwh: 18, count: 2, status: "available" },
        { type: "Type2", power: 22, pricePerKwh: 15, count: 2, status: "available" }
    ],
    isActive: true
  },
  {
    name: "MGL CNG & EVs - Panvel",
    location: { type: "Point", coordinates: [73.1102, 19.0060] }, // Panvel
    address: { street: "NH48", city: "Panvel", state: "Maharashtra", pincode: "410206" },
    chargers: [
        { type: "CCS", power: 60, pricePerKwh: 20, count: 2, status: "available" },
        { type: "DC", power: 30, pricePerKwh: 16, count: 1, status: "available" }
    ],
    isActive: true
  },
  {
    name: "Food Mall Charging Hub - Khalapur",
    location: { type: "Point", coordinates: [73.2863, 18.8355] }, // Khalapur Food Mall
    address: { street: "Mumbai-Pune Expressway", city: "Khalapur", state: "Maharashtra", pincode: "410202" },
    chargers: [
        { type: "CCS", power: 120, pricePerKwh: 22, count: 4, status: "available" },
        { type: "CHAdeMO", power: 50, pricePerKwh: 20, count: 1, status: "available" }
    ],
    amenities: { cafe: true, restroom: true, parking: true, convenience_store: true },
    isActive: true
  },
  {
    name: "Lonavala EV Point",
    location: { type: "Point", coordinates: [73.4072, 18.7557] }, // Lonavala
    address: { street: "Old Mumbai Pune Hwy", city: "Lonavala", state: "Maharashtra", pincode: "410401" },
    chargers: [
        { type: "CCS", power: 50, pricePerKwh: 18, count: 2, status: "available" },
        { type: "Type2", power: 22, pricePerKwh: 15, count: 2, status: "available" }
    ],
    amenities: { cafe: true, restroom: true },
    isActive: true
  },
  {
    name: "Talegaon Charging Stop",
    location: { type: "Point", coordinates: [73.6702, 18.7180] }, // Talegaon
    address: { street: "Expressway", city: "Talegaon", state: "Maharashtra", pincode: "410507" },
    chargers: [
        { type: "CCS", power: 60, pricePerKwh: 19, count: 2, status: "available" }
    ],
    isActive: true
  },
  {
    name: "Hinjewadi IT Park Charge Zone",
    location: { type: "Point", coordinates: [73.7408, 18.5985] }, // Hinjewadi
    address: { street: "Phase 1", city: "Pune", state: "Maharashtra", pincode: "411057" },
    chargers: [
        { type: "CCS", power: 80, pricePerKwh: 20, count: 3, status: "available" },
         { type: "Type2", power: 22, pricePerKwh: 15, count: 4, status: "available" }
    ],
    amenities: { cafe: true, parking: true },
    isActive: true
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.ATLASDB_URL);
    console.log("Connected to DB.");
    
    // Clear existing? No, maybe user has some. But user said 0 found.
    // Let's check first.
    const count = await ChargingStation.countDocuments();
    if (count === 0) {
        console.log("Seeding stations...");
        await ChargingStation.insertMany(sampleStations);
        console.log("Seeded 6 stations successfully.");
    } else {
        console.log(`DB already has ${count} stations. Skipping seed.`);
    }

    process.exit();
  } catch (error) {
    console.error("Error seeding DB:", error);
    process.exit(1);
  }
};

seedDB();
