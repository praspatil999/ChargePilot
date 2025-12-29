import React from "react";
import { Filter, SlidersHorizontal, X } from "lucide-react";

const FiltersSection = ({
  chargerType,
  setChargerType,
  sortBy,
  setSortBy,
  setShowStations,
}) => {
  const chargerTypes = [
    { value: "all", label: "All Types", color: "bg-gray-500" },
    { value: "CCS2", label: "CCS2", color: "bg-blue-500" },
    { value: "Type 2", label: "Type 2", color: "bg-emerald-500" },
    { value: "CHAdeMO", label: "CHAdeMO", color: "bg-purple-500" },
  ];

  const sortOptions = [
    { value: "nearest", label: "Nearest", icon: "📍" },
    { value: "cheapest", label: "Cheapest", icon: "💰" },
    { value: "fastest", label: "Fastest", icon: "⚡" },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl shadow-blue-100/30 border border-white mb-8 animate-slide-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
            <Filter className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Filter & Sort Stations
            </h3>
            <p className="text-gray-600 text-sm">Refine your search results</p>
          </div>
        </div>

        <button
          onClick={() => setShowStations(false)}
          className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center space-x-2 hover:bg-blue-50 px-4 py-2 rounded-xl transition-colors"
        >
          <X className="w-4 h-4" />
          <span>Change Location</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Charger Type Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Charger Type
          </label>
          <div className="flex flex-wrap gap-2">
            {chargerTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setChargerType(type.value)}
                className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${
                  chargerType === type.value
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${type.color}`}></div>
                <span>{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Sort By
          </label>
          <div className="flex flex-wrap gap-2">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSortBy(option.value)}
                className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${
                  sortBy === option.value
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30 scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
                }`}
              >
                <span className="text-lg">{option.icon}</span>
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Advanced Filters Button */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <button className="flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-900 font-medium mx-auto group">
          <SlidersHorizontal className="w-4 h-4 group-hover:rotate-90 transition-transform" />
          <span>Show Advanced Filters</span>
        </button>
      </div>
    </div>
  );
};

export default FiltersSection;
