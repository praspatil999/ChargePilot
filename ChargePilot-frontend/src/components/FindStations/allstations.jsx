import React, { useState } from "react";
import {
  MapPin,
  Zap,
  Navigation,
  Clock,
  Battery,
  Wifi,
  Coffee,
  Filter,
  Star,
  ChevronRight,
  Phone,
  Globe,
  ParkingSquare,
  Calendar
} from "lucide-react";
import LocationInput from "./LocationInput";
import { useNavigate } from "react-router-dom";

function ShowStations() {
  const navigate = useNavigate();
  const [stationsData, setStationsData] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'grid'
  const [filter, setFilter] = useState("all"); // 'all', 'fast', 'available'

  const handleStationsFetched = (data) => {
    console.log("Received stations data:", data);
    setStationsData(data);
    setSelectedStation(null);
  };

  // Mock station status for demo
  const getStationStatus = (station) => {
    const statuses = ["Available", "In Use", "Coming Soon"];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    return {
      text: randomStatus,
      color:
        randomStatus === "Available"
          ? "bg-green-500"
          : randomStatus === "In Use"
          ? "bg-yellow-500"
          : "bg-gray-500",
      badge:
        randomStatus === "Available"
          ? "text-green-700 bg-green-100"
          : randomStatus === "In Use"
          ? "text-yellow-700 bg-yellow-100"
          : "text-gray-700 bg-gray-100",
    };
  };

  // Mock charging speed
  const getChargingSpeed = () => {
    const speeds = [
      "Fast (50kW)",
      "Super (150kW)",
      "Ultra (350kW)",
      "Standard (22kW)",
    ];
    return speeds[Math.floor(Math.random() * speeds.length)];
  };

  // Mock pricing
  const getPricing = () => {
    return `₹${(Math.random() * 15 + 8).toFixed(2)}/kWh`;
  };

  // Mock amenities
  const getAmenities = () => {
    const amenities = [
      { icon: <Wifi className="w-4 h-4" />, label: "WiFi" },
      { icon: <Coffee className="w-4 h-4" />, label: "Cafe" },
      { icon: <ParkingSquare className="w-4 h-4" />, label: "Parking" },
    ];
    return amenities.slice(0, Math.floor(Math.random() * 3) + 1);
  };

  // Mock connector types
  const getConnectorTypes = () => {
    const connectors = ["CCS2", "CHAdeMO", "Type 2", "GB/T"];
    return connectors.slice(0, Math.floor(Math.random() * 2) + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">EV Charging Finder</h1>
              <p className="text-blue-100 mt-2">
                Find the best charging stations near you
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span className="font-semibold">EV</span>
              </div>
            </div>
          </div>

          {/* Search Section */}
          <div className="max-w-4xl mx-auto">
            <LocationInput onStationsFetched={handleStationsFetched} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {stationsData ? (
          <div className="animate-fade-in">
            {/* Results Header */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    <span className="text-emerald-600">
                      {stationsData.total}
                    </span>{" "}
                    Stations Found
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Near{" "}
                    <span className="font-semibold">
                      {stationsData.locationName}
                    </span>
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  {/* View Toggle */}
                  <div className="bg-gray-100 rounded-xl p-1 flex">
                    <button
                      onClick={() => setViewMode("list")}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        viewMode === "list"
                          ? "bg-white shadow-md text-blue-600"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      List View
                    </button>
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        viewMode === "grid"
                          ? "bg-white shadow-md text-blue-600"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      Grid View
                    </button>
                  </div>

                  {/* Filter Dropdown */}
                  <div className="relative">
                    <select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 rounded-xl pl-4 pr-10 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-medium"
                    >
                      <option value="all">All Stations</option>
                      <option value="fast">Fast Charging</option>
                      <option value="available">Available Now</option>
                    </select>
                    <Filter className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Stations Grid/List */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-6"
              }
            >
              {stationsData.stations.map((station, index) => {
                const status = getStationStatus(station);
                const chargingSpeed = getChargingSpeed();
                const pricing = getPricing();
                const amenities = getAmenities();
                const connectorTypes = getConnectorTypes();

                return (
                  <div
                    key={station.id}
                    className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                      selectedStation?.id === station.id
                        ? "ring-2 ring-blue-500"
                        : ""
                    }`}
                    onClick={() => setSelectedStation(station)}
                  >
                    {/* Station Card */}
                    <div className="p-6">
                      {/* Header */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-start space-x-3">
                          <div className="bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl p-2">
                            <Zap className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-gray-800">
                              {station.name}
                            </h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm font-medium text-gray-700">
                                4.{(Math.random() * 9 + 1).toFixed(1)}
                              </span>
                              <span className="text-sm text-gray-500">•</span>
                              <span
                                className={`text-xs font-semibold px-2 py-1 rounded-full ${status.badge}`}
                              >
                                {status.text}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span
                            className={`w-3 h-3 rounded-full ${status.color}`}
                          ></span>
                          <span className="text-xs font-medium text-gray-600">
                            {station.distance.toFixed(1)} km
                          </span>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="flex items-start space-x-2 mb-4">
                        <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-gray-700">{station.address}</p>
                          <p className="text-sm text-gray-500">
                            {station.city}
                          </p>
                        </div>
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-50 rounded-xl p-3">
                          <div className="flex items-center space-x-2 mb-1">
                            <Battery className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-medium text-gray-700">
                              Speed
                            </span>
                          </div>
                          <p className="font-bold text-gray-800">
                            {chargingSpeed}
                          </p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-3">
                          <div className="flex items-center space-x-2 mb-1">
                            <Navigation className="w-4 h-4 text-emerald-600" />
                            <span className="text-sm font-medium text-gray-700">
                              Price
                            </span>
                          </div>
                          <p className="font-bold text-gray-800">{pricing}</p>
                        </div>
                      </div>

                      {/* Connectors & Amenities */}
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">
                            Connector Types
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {connectorTypes.map((type, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium"
                              >
                                {type}
                              </span>
                            ))}
                          </div>
                        </div>

                        {amenities.length > 0 && (
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">
                              Amenities
                            </p>
                            <div className="flex space-x-2">
                              {amenities.map((amenity, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center space-x-1 px-3 py-1.5 bg-gray-100 rounded-lg"
                                >
                                  {amenity.icon}
                                  <span className="text-sm text-gray-600">
                                    {amenity.label}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3 mt-6">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedStation(station);
                          }}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300"
                        >
                          <span>View Details</span>
                          <ChevronRight className="w-5 h-5" />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/book/${station.id}`);
                          }}
                          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 font-bold flex items-center justify-center space-x-2"
                        >
                          <span>Book Now</span>
                          <Calendar className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Station Modal */}
            {selectedStation && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
                <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6">
                    {/* Modal Header */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl p-3">
                          <Zap className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-800">
                            {selectedStation.name}
                          </h3>
                          <p className="text-gray-600">
                            {selectedStation.operator}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedStation(null)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ✕
                      </button>
                    </div>

                    {/* Modal Content */}
                    <div className="space-y-6">
                      {/* Location Section */}
                      <div className="bg-gray-50 rounded-xl p-5">
                        <div className="flex items-center space-x-3 mb-3">
                          <MapPin className="w-6 h-6 text-blue-600" />
                          <h4 className="font-bold text-lg text-gray-800">
                            Location
                          </h4>
                        </div>
                        <p className="text-gray-700 mb-2">
                          {selectedStation.address}
                        </p>
                        <p className="text-gray-600">{selectedStation.city}</p>
                        <div className="mt-3 flex items-center space-x-4">
                          <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium">
                            <Navigation className="w-5 h-5" />
                            <span>Get Directions</span>
                          </button>
                        </div>
                      </div>

                      {/* Charging Info */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 rounded-xl p-4">
                          <h4 className="font-bold text-gray-800 mb-2">
                            Charging Speed
                          </h4>
                          <p className="text-2xl font-bold text-blue-700">
                            {getChargingSpeed()}
                          </p>
                        </div>
                        <div className="bg-emerald-50 rounded-xl p-4">
                          <h4 className="font-bold text-gray-800 mb-2">
                            Price
                          </h4>
                          <p className="text-2xl font-bold text-emerald-700">
                            {getPricing()}
                          </p>
                        </div>
                      </div>

                      {/* Contact & Hours */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-xl p-4">
                          <div className="flex items-center space-x-2 mb-3">
                            <Phone className="w-5 h-5 text-gray-600" />
                            <h4 className="font-bold text-gray-800">Contact</h4>
                          </div>
                          <p className="text-gray-700">
                            +91{" "}
                            {Math.floor(Math.random() * 9000000000) +
                              1000000000}
                          </p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4">
                          <div className="flex items-center space-x-2 mb-3">
                            <Clock className="w-5 h-5 text-gray-600" />
                            <h4 className="font-bold text-gray-800">Hours</h4>
                          </div>
                          <p className="text-gray-700">24/7 Available</p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-4 pt-4">
                        <button
                          onClick={() => {
                            navigate(`/book/${selectedStation.id}`);
                            setSelectedStation(null);
                          }}
                          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 font-bold"
                        >
                          Book Now
                        </button>
                        <button className="flex-1 border-2 border-blue-600 text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
                          Save Station
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Footer Stats */}
            <div className="mt-12 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl text-white p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-blue-100 mt-1">Service Hours</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">₹12.5</div>
                  <div className="text-blue-100 mt-1">Avg. Price/kWh</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">15min</div>
                  <div className="text-blue-100 mt-1">Fastest Charge</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">4.8★</div>
                  <div className="text-blue-100 mt-1">Avg. Rating</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Zap className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">
              Find Charging Stations
            </h3>
            <p className="text-gray-500 mb-8">
              Enter your location or use current location to discover EV
              charging stations near you
            </p>
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              {["Fast Charging", "24/7 Service", "Multiple Connectors"].map(
                (feature, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-4 rounded-xl shadow-sm border"
                  >
                    <div className="text-blue-600 font-bold text-lg mb-1">
                      {idx === 0 ? "⚡" : idx === 1 ? "🕒" : "🔌"}
                    </div>
                    <div className="text-sm text-gray-600">{feature}</div>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>

      {/* Custom Animation */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default ShowStations;
