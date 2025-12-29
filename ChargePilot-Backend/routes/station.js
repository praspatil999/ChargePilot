import express from "express";
import User from "../models/User.js";
import Vehicle from "../models/Vehicle.js";
import passport from "passport";
const router = express.Router({ mergeParams: true });
import passportLocalMongoose from "passport-local-mongoose";
import axios from "axios";



router.get("/:id", async (req, res) => {
    console.log("I get called");
    
  const { id } = req.params;
  try {
    const response = await axios.get("https://api.openchargemap.io/v3/poi/", {
      params: {
        output: "json",
        chargepointid: id,
        key: process.env.OPEN_CHARGER_API_KEY,
      },
    });

    if (!response.data || response.data.length === 0) {
      return res.status(404).json({ message: "Station not found" });
    }

    res.status(200).json(response.data[0]); // single station
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to fetch station data" });
  }
});

export default router;
