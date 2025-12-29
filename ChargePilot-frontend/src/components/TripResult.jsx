// components/TripResults.js
import React, { useState } from "react";
import {
  MapPin,
  Battery,
  Clock,
  DollarSign,
  Navigation,
  Zap,
  ChevronRight,
  Save,
  Share2,
  Download,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const TripResults = ({ tripData }) => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  if (!tripData) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-700">
          No trip data available
        </h3>
        <p className="text-gray-500 mt-2">Please plan a trip first</p>
        <button
          onClick={() => navigate("/plan-trip")}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Plan a Trip
        </button>
      </div>
    );
  }

  const { tripSummary, route, chargingAnalysis, costBreakdown, tripId } =
    tripData;

  const handleSaveTrip = async () => {
    setSaving(true);
    try {
      // API call to save trip
      const response = await fetch(`/api/trips/${tripId}/save`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        alert("Trip saved successfully!");
      }
    } catch (error) {
      console.error("Save trip error:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleStartNavigation = () => {
    // Start the trip
    navigate(`/trip/${tripId}/navigate`);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-2xl p-8 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Trip Planned Successfully!</h1>
            <p className="text-blue-100 mt-2">
              {tripSummary.source.address} → {tripSummary.destination.address}
            </p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleSaveTrip}
              disabled={saving}
              className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-lg hover:bg-white/30 transition-colors flex items-center space-x-2"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Trip</span>
                </>
              )}
            </button>
            <button className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-lg hover:bg-white/30 transition-colors flex items-center space-x-2">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Navigation className="w-6 h-6 text-blue-600" />
            <h3 className="font-bold text-gray-800">Distance</h3>
          </div>
          <p className="text-3xl font-bold text-gray-800">
            {route.totalDistanceKm} km
          </p>
          <p className="text-sm text-gray-500 mt-1">Total journey</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Clock className="w-6 h-6 text-emerald-600" />
            <h3 className="font-bold text-gray-800">Total Time</h3>
          </div>
          <p className="text-3xl font-bold text-gray-800">
            {chargingAnalysis.estimatedTotalTimeHours} hours
          </p>
          <p className="text-sm text-gray-500 mt-1">Including charging</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <DollarSign className="w-6 h-6 text-purple-600" />
            <h3 className="font-bold text-gray-800">Total Cost</h3>
          </div>
          <p className="text-3xl font-bold text-gray-800">
            ₹{costBreakdown.estimatedTotalCost.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 mt-1">Estimated</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Battery className="w-6 h-6 text-yellow-600" />
            <h3 className="font-bold text-gray-800">Charging Stops</h3>
          </div>
          <p className="text-3xl font-bold text-gray-800">
            {chargingAnalysis.numberOfStops}
          </p>
          <p className="text-sm text-gray-500 mt-1">Required</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Charging Stops */}
        <div className="lg:col-span-2 space-y-6">
          {/* Charging Stops */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Charging Stops ({chargingAnalysis.numberOfStops})
              </h2>
              <span className="text-sm font-medium text-gray-500">
                Total charging time: {chargingAnalysis.totalChargingTimeHours}{" "}
                hours
              </span>
            </div>

            {chargingAnalysis.chargingStops.length > 0 ? (
              <div className="space-y-4">
                {chargingAnalysis.chargingStops.map((stop, index) => (
                  <div
                    key={index}
                    className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="relative">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">
                              {index + 1}
                            </span>
                          </div>
                          {index <
                            chargingAnalysis.chargingStops.length - 1 && (
                            <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-1 h-6 bg-gradient-to-b from-blue-500 to-emerald-500"></div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">
                            {stop.stationName}
                          </h3>
                          <p className="text-gray-600">
                            {stop.address?.city || "Unknown"}
                          </p>
                          <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                              <p className="text-sm text-gray-500">
                                Distance from start
                              </p>
                              <p className="font-bold text-gray-800">
                                {stop.distanceFromStart.toFixed(1)} km
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">
                                Arrival battery
                              </p>
                              <p className="font-bold text-gray-800">
                                {stop.batteryAtArrival.toFixed(0)}%
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">
                                Charging time
                              </p>
                              <p className="font-bold text-gray-800">
                                {stop.chargingTime.toFixed(0)} min
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Cost</p>
                              <p className="font-bold text-emerald-600">
                                ₹{stop.cost.toFixed(2)}
                              </p>
                            </div>
                          </div>
                          <div className="mt-4 flex items-center space-x-4">
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm">
                              {stop.chargerType} @ {stop.chargerPower}kW
                            </span>
                            {stop.amenities?.cafe && (
                              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
                                Café
                              </span>
                            )}
                            {stop.amenities?.wifi && (
                              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
                                WiFi
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Zap className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-700">
                  No Charging Stops Needed!
                </h3>
                <p className="text-gray-500 mt-2">
                  Your current battery is sufficient for this trip
                </p>
              </div>
            )}
          </div>

          {/* Map Placeholder */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Route Map</h2>
            <div className="h-96 bg-gray-100 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  Interactive map would appear here
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Route coordinates available: {route.coordinates.length} points
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Details & Actions */}
        <div className="space-y-6">
          {/* Vehicle & Battery */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Vehicle Details
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Vehicle</p>
                <p className="font-bold text-gray-800">
                  {tripSummary.vehicle.model}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Start Battery</p>
                <div className="flex items-center space-x-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-emerald-500 h-2.5 rounded-full"
                      style={{
                        width: `${tripSummary.startBatteryPercentage}%`,
                      }}
                    ></div>
                  </div>
                  <span className="font-bold text-gray-800">
                    {tripSummary.startBatteryPercentage}%
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Estimated Range</p>
                <p className="font-bold text-gray-800">
                  {(
                    tripSummary.vehicle.batteryCapacity *
                    tripSummary.vehicle.efficiency
                  ).toFixed(0)}{" "}
                  km
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Arrival Battery</p>
                <div className="flex items-center space-x-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-500 h-2.5 rounded-full"
                      style={{
                        width: `${chargingAnalysis.remainingBatteryAtDestination}%`,
                      }}
                    ></div>
                  </div>
                  <span className="font-bold text-gray-800">
                    {chargingAnalysis.remainingBatteryAtDestination.toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Cost Breakdown
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Charging Cost</span>
                <span className="font-medium">
                  ₹{costBreakdown.chargingCost.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Tolls</span>
                <span className="font-medium">
                  ₹{costBreakdown.estimatedTollCost.toFixed(2)}
                </span>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="font-bold text-gray-800">
                    Total Estimated Cost
                  </span>
                  <span className="text-2xl font-bold text-emerald-600">
                    ₹{costBreakdown.estimatedTotalCost.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Start Your Journey
            </h2>
            <div className="space-y-3">
              <button
                onClick={handleStartNavigation}
                className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <Navigation className="w-5 h-5" />
                <span>Start Navigation</span>
              </button>
              <button className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all flex items-center justify-center space-x-2">
                <Download className="w-5 h-5" />
                <span>Download Route</span>
              </button>
              <button className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center space-x-2">
                <Share2 className="w-5 h-5" />
                <span>Share with Friends</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripResults;
