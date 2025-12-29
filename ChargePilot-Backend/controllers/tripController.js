// controllers/tripController.js
import axios from "axios";
import ChargingStation from "../models/ChargingStation.js";
import Vehicle from "../models/Vehicle.js";
import Trip from "../models/Trip.js";

// Utility function to calculate distance between two points (Haversine formula)
const calculateDistance = (coord1, coord2) => {
  const [lng1, lat1] = coord1;
  const [lng2, lat2] = coord2;

  const R = 6371000; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
};

// Find charging stations along a route
const findChargingStationsAlongRoute = async (
  routeCoordinates,
  maxDistance = 5000
) => {
  try {
    // Create a bounding box around the route
    const lngs = routeCoordinates.map((coord) => coord[0]);
    const lats = routeCoordinates.map((coord) => coord[1]);

    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);

    // Find stations within bounding box
    const stations = await ChargingStation.find({
      location: {
        $geoWithin: {
          $box: [
            [minLng, minLat],
            [maxLng, maxLat],
          ],
        },
      },
      isActive: true,
      "chargers.status": "available",
    }).limit(50);

    // Filter stations that are close to the route
    const stationsAlongRoute = [];

    for (const station of stations) {
      // Find the closest point on the route to this station
      let minDistance = Infinity;
      let closestPoint = null;

      for (const routePoint of routeCoordinates) {
        const distance = calculateDistance(
          routePoint,
          station.location.coordinates
        );
        if (distance < minDistance) {
          minDistance = distance;
          closestPoint = routePoint;
        }
      }

      // If station is within maxDistance of the route
      if (minDistance <= maxDistance) {
        stationsAlongRoute.push({
          station,
          distanceFromRoute: minDistance,
          closestPoint,
        });
      }
    }

    return stationsAlongRoute;
  } catch (error) {
    console.error("Error finding charging stations:", error);
    return [];
  }
};

// Calculate optimal charging stops
const calculateOptimalChargingStops = async (
  routeData,
  vehicle,
  startBatteryPercent
) => {
  const { totalDistance, geometry, legs } = routeData;

  const routeCoordinates = geometry.coordinates;

  // Vehicle specifications
  const batteryCapacity = vehicle.batteryCapacity; // kWh
  const efficiency = vehicle.efficiency; // km per kWh
  const connectorType = vehicle.connectorType; // e.g., 'CCS'

  // Calculate vehicle range
  const fullRange = batteryCapacity * efficiency; // km
  const availableRange = fullRange * (startBatteryPercent / 100);

  // Find charging stations along route
  const stationsAlongRoute = await findChargingStationsAlongRoute(
    routeCoordinates
  );

  console.log(`Found ${stationsAlongRoute.length} stations along route`);

  // Sort stations by distance along route (simplified - in real app, use route distance)
  stationsAlongRoute.sort((a, b) => {
    // This is simplified - in production, calculate actual distance along route
    return a.closestPoint[0] - b.closestPoint[0];
  });

  // Algorithm to find optimal charging stops
  const chargingStops = [];
  let currentDistance = 0;
  let currentBattery = startBatteryPercent;
  let remainingRange = availableRange;
  let totalChargingTime = 0; // minutes
  let totalChargingCost = 0; // INR

  // For each leg of the journey
  for (const leg of legs) {
    const legDistance = leg.distance / 1000; // Convert to km
    const segmentDistance = legDistance / 10; // Split into 10 segments for analysis

    for (let i = 0; i < 10; i++) {
      const segmentStart = currentDistance;
      const segmentEnd = currentDistance + segmentDistance;

      // Calculate energy used in this segment
      const energyUsed = segmentDistance / efficiency; // kWh
      const batteryUsed = (energyUsed / batteryCapacity) * 100; // percentage

      currentBattery -= batteryUsed;
      remainingRange -= segmentDistance;
      currentDistance += segmentDistance;

      // Check if we need to charge
      if (currentBattery <= 20) {
        // Charge when battery <= 20%
        // Find nearest charging station
        const nearbyStations = stationsAlongRoute.filter((s) => {
          const stationDistance =
            calculateDistance(
              s.closestPoint,
              routeCoordinates[Math.floor((i * routeCoordinates.length) / 10)]
            ) / 1000; // km
          return stationDistance < 5; // Within 5km of current position
        });

        if (nearbyStations.length > 0) {
          const bestStation = nearbyStations[0];

          // Find compatible charger
          const compatibleCharger = bestStation.station.chargers.find(
            (c) => c.type === connectorType || c.type === "DC" // Simplified matching
          );

          if (compatibleCharger) {
            // Calculate charging needed
            const targetBattery = 80; // Charge to 80% for fastest charging
            const batteryToAdd = targetBattery - currentBattery;
            const energyToAdd = (batteryToAdd / 100) * batteryCapacity;

            // Calculate charging time
            const chargingTime = (energyToAdd / compatibleCharger.power) * 60; // minutes

            // Calculate cost
            const chargingCost = energyToAdd * compatibleCharger.pricePerKwh;

            // Create charging stop
            const chargingStop = {
              stationId: bestStation.station._id,
              stationName: bestStation.station.name,
              location: bestStation.station.location.coordinates,
              address: bestStation.station.address,
              distanceFromStart: currentDistance,
              batteryAtArrival: currentBattery,
              batteryAfterCharging: targetBattery,
              energyAdded: energyToAdd,
              chargingTime: chargingTime,
              cost: chargingCost,
              chargerType: compatibleCharger.type,
              chargerPower: compatibleCharger.power,
              amenities: bestStation.station.amenities,
              distanceFromRoute: bestStation.distanceFromRoute,
            };

            chargingStops.push(chargingStop);

            // Update totals
            totalChargingTime += chargingTime;
            totalChargingCost += chargingCost;

            // Reset for next segment
            currentBattery = targetBattery;
            remainingRange = fullRange * (currentBattery / 100);
          }
        }
      }

      // Break if we've covered the total distance
      if (currentDistance >= totalDistance / 1000) {
        break;
      }
    }
  }

  // Calculate remaining battery at destination
  const remainingBatteryAtDestination = currentBattery;

  return {
    chargingStops,
    totalChargingTime,
    totalChargingCost,
    remainingBatteryAtDestination,
    estimatedTotalTime: (totalDistance / 1000 / 80) * 60 + totalChargingTime, // 80 km/h average + charging
    estimatedTotalCost: totalChargingCost,
  };
};

// Main trip planning function
export const planTrip = async (req, res) => {
  try {
    const { source, destination, vehicleId, batteryPercentage } = req.body;
    const userId = req.user._id;

    // Validate required fields
    if (!source?.coordinates || !destination?.coordinates || !vehicleId) {
      return res.status(400).json({
        success: false,
        message:
          "Source coordinates, destination coordinates, and vehicleId are required",
      });
    }

    // Get Mapbox token
    const MAPBOX_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;

    if (!MAPBOX_TOKEN) {
      return res.status(500).json({
        success: false,
        message: "Mapbox token not configured",
      });
    }

    // Get vehicle details
    const vehicle = await Vehicle.findOne({
      _id: vehicleId,
      userId: userId,
    });

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    // Get route from Mapbox
    const sourceCoords = source.coordinates;
    const destCoords = destination.coordinates;

    const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${sourceCoords[0]},${sourceCoords[1]};${destCoords[0]},${destCoords[1]}?geometries=geojson&overview=full&access_token=${MAPBOX_TOKEN}&steps=true&annotations=distance,duration`;

    console.log("Getting route from Mapbox...");

    const mapboxResponse = await axios.get(directionsUrl);

    if (
      mapboxResponse.data.code !== "Ok" ||
      !mapboxResponse.data.routes?.length
    ) {
      throw new Error("No route found from Mapbox");
    }

    const route = mapboxResponse.data.routes[0];

    // Extract route data
    const routeData = {
      totalDistance: route.distance,
      totalDuration: route.duration,
      geometry: route.geometry,
      legs: route.legs,
      waypoints: mapboxResponse.data.waypoints,
    };

    // Calculate optimal charging stops
    console.log("Calculating charging stops...");
    const chargingAnalysis = await calculateOptimalChargingStops(
      routeData,
      vehicle,
      batteryPercentage
    );

    // Calculate total trip metrics
    const totalDistanceKm = (route.distance / 1000).toFixed(2);
    const totalDurationHours = (route.duration / 3600).toFixed(2);
    const estimatedTotalTimeHours = (
      chargingAnalysis.estimatedTotalTime / 60
    ).toFixed(2);

    // Prepare response
    const response = {
      success: true,
      message: "Trip planned successfully",
      data: {
        tripSummary: {
          source: {
            address: source.address || "Unknown",
            coordinates: sourceCoords,
          },
          destination: {
            address: destination.address || "Unknown",
            coordinates: destCoords,
          },
          vehicle: {
            id: vehicle._id,
            model: vehicle.model,
            batteryCapacity: vehicle.batteryCapacity,
            efficiency: vehicle.efficiency,
            connectorType: vehicle.connectorType,
          },
          startBatteryPercentage: batteryPercentage,
        },
        route: {
          totalDistance: routeData.totalDistance,
          totalDistanceKm: parseFloat(totalDistanceKm),
          totalDuration: routeData.totalDuration,
          totalDurationHours: parseFloat(totalDurationHours),
          geometry: routeData.geometry,
          coordinates: routeData.geometry.coordinates,
          legs: routeData.legs,
        },
        chargingAnalysis: {
          numberOfStops: chargingAnalysis.chargingStops.length,
          chargingStops: chargingAnalysis.chargingStops,
          totalChargingTime: chargingAnalysis.totalChargingTime,
          totalChargingTimeHours: (
            chargingAnalysis.totalChargingTime / 60
          ).toFixed(2),
          totalChargingCost: chargingAnalysis.totalChargingCost,
          remainingBatteryAtDestination:
            chargingAnalysis.remainingBatteryAtDestination,
          estimatedTotalTime: chargingAnalysis.estimatedTotalTime,
          estimatedTotalTimeHours: parseFloat(estimatedTotalTimeHours),
          estimatedTotalCost: chargingAnalysis.estimatedTotalCost,
        },
        costBreakdown: {
          chargingCost: chargingAnalysis.totalChargingCost,
          estimatedTollCost: totalDistanceKm * 2, // ₹2 per km estimation
          estimatedTotalCost:
            chargingAnalysis.totalChargingCost + totalDistanceKm * 2,
        },
      },
    };

    // Optional: Save trip plan to database
    const trip = new Trip({
      user: userId,
      vehicle: vehicleId,
      source: {
        address: source.address,
        coordinates: sourceCoords,
      },
      destination: {
        address: destination.address,
        coordinates: destCoords,
      },
      startBatteryPercentage: batteryPercentage,
      routeGeometry: routeData.geometry,
      totalDistance: routeData.totalDistance,
      totalDuration: routeData.totalDuration,
      chargingStops: chargingAnalysis.chargingStops,
      totalChargingTime: chargingAnalysis.totalChargingTime,
      totalChargingCost: chargingAnalysis.totalChargingCost,
      estimatedTotalCost: response.data.costBreakdown.estimatedTotalCost,
      status: "planned",
    });

    await trip.save();

    response.data.tripId = trip._id;

    res.status(200).json(response);
  } catch (error) {
    console.error("Trip planning error:", error);

    if (error.response) {
      res.status(error.response.status || 500).json({
        success: false,
        message: `Mapbox API error: ${
          error.response.data.message || "Unknown error"
        }`,
        error: error.response.data,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to plan trip",
        error: error.message,
      });
    }
  }
};


// Add these to tripController.js

// Get user's saved trips
export const getUserTrips = async (req, res) => {
  try {
    const { status, limit = 10, page = 1 } = req.query;
    const skip = (page - 1) * limit;

    const filter = { user: req.user._id };
    if (status) filter.status = status;

    const trips = await Trip.find(filter)
      .populate('vehicle', 'model batteryCapacity efficiency')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Trip.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: trips.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      trips
    });

  } catch (error) {
    console.error('Get trips error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch trips',
      error: error.message
    });
  }
};

// Get trip by ID
export const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.user._id
    })
    .populate('vehicle', 'model batteryCapacity efficiency connectorType')
    .populate('chargingStops.stationId', 'name address chargers amenities');

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    res.status(200).json({
      success: true,
      trip
    });

  } catch (error) {
    console.error('Get trip error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch trip',
      error: error.message
    });
  }
};

// Update trip status (start, complete, cancel)
export const updateTripStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const trip = await Trip.findOne({
      _id: id,
      user: req.user._id
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    // Update status with timestamp
    trip.status = status;
    
    if (status === 'in_progress' && !trip.startedAt) {
      trip.startedAt = new Date();
    } else if (status === 'completed' && !trip.completedAt) {
      trip.completedAt = new Date();
    }

    await trip.save();

    res.status(200).json({
      success: true,
      message: `Trip ${status} successfully`,
      trip
    });

  } catch (error) {
    console.error('Update trip error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update trip',
      error: error.message
    });
  }
};

// Delete trip
export const deleteTrip = async (req, res) => {
  try {
    const { id } = req.params;

    const trip = await Trip.findOneAndDelete({
      _id: id,
      user: req.user._id,
      status: { $in: ['planned', 'cancelled'] } // Only allow deletion of certain statuses
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found or cannot be deleted'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Trip deleted successfully'
    });

  } catch (error) {
    console.error('Delete trip error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete trip',
      error: error.message
    });
  }
};