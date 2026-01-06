import Vehicle from "../../models/Vehicle.js";
import Booking from "../../models/Booking.js";

export const createBooking = async (req, res) => {
  try {
    console.log("BOOKING BODY:", req.body);
    console.log("USER:", req.user);

    const userId = req.user._id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { stationOCMId, stationSnapshot, vehicleId, startTime, duration } =
      req.body;

    if (
      !stationOCMId ||
      !stationSnapshot ||
      !vehicleId ||
      !startTime ||
      !duration
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing booking fields",
      });
    }

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    const scheduledStart = new Date(startTime);
    const scheduledEnd = new Date(
      scheduledStart.getTime() + Number(duration) * 60 * 60 * 1000
    );

    const hours = Number(duration);
    const chargerPower = stationSnapshot.power;
    const vehicleLimit = vehicle.maxChargingPower || chargerPower;
    const effectivePower = Math.min(chargerPower, vehicleLimit);

    const estimatedEnergy = hours * effectivePower;
    const estimatedCost = estimatedEnergy * stationSnapshot.pricePerUnit;

    const booking = await Booking.create({
      user: userId,
      vehicle: vehicleId,
      stationOCMId,
      stationSnapshot,
      chargerType: stationSnapshot.chargerType,
      scheduledStart,
      scheduledEnd,
      pricePerUnit: stationSnapshot.pricePerUnit,
      estimatedEnergy,
      estimatedCost,
    });

    return res.status(201).json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error("BOOKING API CRASH:", error);
    return res.status(500).json({
      success: false,
      message: error.message, // TEMP: expose real error
    });
  }
};
