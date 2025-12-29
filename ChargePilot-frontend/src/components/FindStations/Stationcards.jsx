import React from "react";
import {
  Navigation,
  Zap,
  DollarSign,
  Calendar,
  MapPin,
  Clock,
  Check,
  Star,
} from "lucide-react";

const StationCard = ({ station }) => {
  const availabilityPercentage =
    (station.availableChargers / station.totalChargers) * 100;

  return (
    <div className="bg-white rounded-3xl p-6 border-2 border-white hover:border-blue-300 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-100/50 group hover:-translate-y-2 animate-fade-in">
      {/* Header with badge */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
              {station.name}
            </h3>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-semibold text-gray-700">4.8</span>
            </div>
          </div>

          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="text-sm truncate">{station.address}</span>
          </div>
        </div>
      </div>

      {/* Availability Badge */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
              station.availability === "Available"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {station.availability === "Available" ? (
              <Check className="w-3 h-3 mr-1" />
            ) : null}
            {station.availability}
          </span>
          <span className="text-sm text-gray-600">
            {station.availableChargers}/{station.totalChargers} available
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              availabilityPercentage > 50
                ? "bg-emerald-500"
                : availabilityPercentage > 20
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
            style={{ width: `${availabilityPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 rounded-xl p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Navigation className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-gray-600">Distance</span>
          </div>
          <div className="text-lg font-bold text-gray-900">
            {station.distance} km
          </div>
        </div>

        <div className="bg-purple-50 rounded-xl p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Zap className="w-4 h-4 text-purple-600" />
            <span className="text-sm text-gray-600">Speed</span>
          </div>
          <div className="text-lg font-bold text-gray-900">
            {station.chargingSpeed}
          </div>
        </div>

        <div className="bg-emerald-50 rounded-xl p-3">
          <div className="flex items-center space-x-2 mb-1">
            <DollarSign className="w-4 h-4 text-emerald-600" />
            <span className="text-sm text-gray-600">Price</span>
          </div>
          <div className="text-lg font-bold text-gray-900">
            ₹{station.pricePerKwh}/kWh
          </div>
        </div>

        <div className="bg-amber-50 rounded-xl p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Clock className="w-4 h-4 text-amber-600" />
            <span className="text-sm text-gray-600">Type</span>
          </div>
          <div className="text-lg font-bold text-gray-900">
            {station.chargerType}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-xl hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 font-semibold flex items-center justify-center space-x-2 group/btn">
          <Calendar className="w-5 h-5" />
          <span>Book Now</span>
          <div className="group-hover/btn:translate-x-1 transition-transform">
            →
          </div>
        </button>

        <button className="w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-200 transition-all duration-300 font-semibold">
          View Details & Directions
        </button>
      </div>
    </div>
  );
};

export default StationCard;
