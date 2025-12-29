// TripPlanningUI.js (Updated)
import React, { useState } from "react";
import {
  Navigation,
  MapPin,
  Car,
  Battery,
  Route,
  ChevronRight,
  Map,
} from "lucide-react";
import MapboxAutocomplete from "./MpBxautocomplete";
import TripResults from "../TripResult";

const TripPlanningUI = () => {
  const [tripData, setTripData] = useState({
    source: "",
    destination: "",
    vehicleId: "",
    currentBattery: 80,
  });

  const [coordinates, setCoordinates] = useState({
    source: null,
    destination: null,
  });

  const [loading, setLoading] = useState(false);

  // Mock user vehicles
  const userVehicles = [
    {
      _id: "veh1",
      model: "Tesla Model 3",
      batteryCapacity: 75,
      efficiency: 6.5,
      connectorType: "CCS",
      maxChargingPower: 250,
      range: 450,
    },
    {
      _id: "veh2",
      model: "Tata Nexon EV",
      batteryCapacity: 40,
      efficiency: 5.5,
      connectorType: "CCS",
      maxChargingPower: 50,
      range: 312,
    },
  ];

  // Handle input changes
  const handleInputChange = (field, value) => {
    setTripData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle coordinate updates from Mapbox
  const handleCoordinatesUpdate = (type, coords) => {
    setCoordinates((prev) => ({
      ...prev,
      [type]: coords,
    }));
    console.log(`${type} coordinates updated:`, coords);
  };

 // In TripPlanningUI.js, update the handlePlanTrip function:

const [tripResults, setTripResults] = useState(null);

const handlePlanTrip = async () => {
  // ... validation code ...

  try {
    const tripRequest = {
      source: {
        address: tripData.source,
        coordinates: coordinates.source,
      },
      destination: {
        address: tripData.destination,
        coordinates: coordinates.destination,
      },
      vehicleId: tripData.vehicleId,
      batteryPercentage: tripData.currentBattery,
    };

    const response = await fetch("/api/trips/plan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(tripRequest),
    });

    const result = await response.json();

    if (result.success) {
      setTripResults(result.data);
      // You can navigate to a results page or show modal
      // navigate('/trip-results', { state: { tripData: result.data } });
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error("Trip planning error:", error);
    alert(`Error: ${error.message}`);
  } finally {
    setLoading(false);
  }
};

const handleSwapLocations = () => {
  setTripData((prev) => ({
    ...prev,
    source: prev.destination,
    destination: prev.source,
  }));

  setCoordinates((prev) => ({
    source: prev.destination,
    destination: prev.source,
  }));
};

return (
  tripResults ? (
    <TripResults tripData={tripResults} />
  ) : (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">EV Trip Planner</h1>
              <p className="text-blue-100 mt-2">
                Plan your journey - Backend calculates optimal route
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2">
                <Map className="w-5 h-5" />
                <span className="font-semibold">MAPBOX</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Trip Planning Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center space-x-3 mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl p-3">
                <Navigation className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Plan Your Trip
              </h2>
            </div>

            {/* Location Inputs with Mapbox Autocomplete */}
            <div className="space-y-6">
              {/* Source Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1 text-emerald-600" />
                  Starting Point
                </label>
                <MapboxAutocomplete
                  placeholder="Enter starting location"
                  value={tripData.source}
                  onChange={(value) => handleInputChange("source", value)}
                  onCoordinatesSelect={(coords) =>
                    handleCoordinatesUpdate("source", coords)
                  }
                  type="source"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Start typing to see suggestions. Select from dropdown to set
                  coordinates.
                </p>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleSwapLocations}
                  className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
                  title="Swap locations"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600 rotate-90" />
                </button>
              </div>

              {/* Destination Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1 text-blue-600" />
                  Destination
                </label>
                <MapboxAutocomplete
                  placeholder="Enter destination"
                  value={tripData.destination}
                  onChange={(value) => handleInputChange("destination", value)}
                  onCoordinatesSelect={(coords) =>
                    handleCoordinatesUpdate("destination", coords)
                  }
                  type="destination"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Start typing to see suggestions. Select from dropdown to set
                  coordinates.
                </p>
              </div>
            </div>

            {/* Vehicle Selection */}
            <div className="mt-8">
              <div className="flex items-center space-x-2 mb-4">
                <Car className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Select Vehicle
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userVehicles.map((vehicle) => (
                  <div
                    key={vehicle._id}
                    onClick={() => handleInputChange("vehicleId", vehicle._id)}
                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all hover:shadow-md ${
                      tripData.vehicleId === vehicle._id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-800">
                        {vehicle.model}
                      </h4>
                      {tripData.vehicleId === vehicle._id && (
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>• Battery: {vehicle.batteryCapacity} kWh</p>
                      <p>• Range: {vehicle.range} km</p>
                      <p>• Connector: {vehicle.connectorType}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Battery Level */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Battery className="w-5 h-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Current Battery Level
                  </h3>
                </div>
                <span className="text-2xl font-bold text-emerald-600">
                  {tripData.currentBattery}%
                </span>
              </div>

              <div className="space-y-4">
                {/* Battery Slider */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={tripData.currentBattery}
                  onChange={(e) =>
                    handleInputChange(
                      "currentBattery",
                      parseInt(e.target.value)
                    )
                  }
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-500 [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
                />

                {/* Quick Set Buttons */}
                <div className="flex flex-wrap gap-2">
                  {[10, 25, 50, 75, 90].map((level) => (
                    <button
                      key={level}
                      onClick={() => handleInputChange("currentBattery", level)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        tripData.currentBattery === level
                          ? "bg-emerald-100 text-emerald-700 border-2 border-emerald-500"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {level}%
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Data Preview */}
            <div className="mt-8 bg-gray-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-800 mb-4">
                Data to be sent to backend:
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Source:</span>
                  <span className="font-mono text-gray-800 max-w-xs truncate">
                    {tripData.source || "Not set"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Source Coordinates:</span>
                  <span className="font-mono text-gray-800">
                    {coordinates.source
                      ? `[${coordinates.source[0]?.toFixed(
                          6
                        )}, ${coordinates.source[1]?.toFixed(6)}]`
                      : "Not set"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Destination:</span>
                  <span className="font-mono text-gray-800 max-w-xs truncate">
                    {tripData.destination || "Not set"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dest Coordinates:</span>
                  <span className="font-mono text-gray-800">
                    {coordinates.destination
                      ? `[${coordinates.destination[0]?.toFixed(
                          6
                        )}, ${coordinates.destination[1]?.toFixed(6)}]`
                      : "Not set"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Vehicle:</span>
                  <span className="font-mono text-gray-800">
                    {tripData.vehicleId
                      ? userVehicles.find((v) => v._id === tripData.vehicleId)
                          ?.model
                      : "Not selected"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Battery Level:</span>
                  <span className="font-mono text-gray-800">
                    {tripData.currentBattery}%
                  </span>
                </div>
              </div>
            </div>

            {/* Plan Trip Button */}
            <button
              onClick={handlePlanTrip}
              disabled={
                loading ||
                !tripData.source ||
                !tripData.destination ||
                !tripData.vehicleId ||
                !coordinates.source ||
                !coordinates.destination
              }
              className="w-full mt-8 bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-8 py-4 rounded-xl hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-1 active:translate-y-0 flex items-center justify-center space-x-3"
            >
              {loading ? (
                <>
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending to Backend...</span>
                </>
              ) : (
                <>
                  <Route className="w-6 h-6" />
                  <span>Plan Trip with Backend</span>
                </>
              )}
            </button>
          </div>

          {/* Setup Instructions */}
          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="font-bold text-gray-800 mb-4">
              Setup Instructions:
            </h3>
            <div className="space-y-3 text-sm text-gray-600">
              <p>
                1. Get a Mapbox access token from{" "}
                <a
                  href="https://account.mapbox.com/"
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  mapbox.com
                </a>
              </p>
              <p>
                2. Add to your .env file:{" "}
                <code className="bg-gray-100 px-2 py-1 rounded">
                  REACT_APP_MAPBOX_TOKEN=your_token_here
                </code>
              </p>
              <p>
                3. Install dependencies:{" "}
                <code className="bg-gray-100 px-2 py-1 rounded">
                  npm install @mapbox/mapbox-sdk
                </code>
              </p>
              <p>
                4. Uncomment the API call in handlePlanTrip when backend is
                ready
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
);

};

export default TripPlanningUI;
