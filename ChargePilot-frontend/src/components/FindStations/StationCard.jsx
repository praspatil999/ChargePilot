import React from "react";
import StationCard from "./StationCard";

const StationCards = ({ filteredStations }) => {
  if (filteredStations.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 text-center border border-white shadow-xl shadow-blue-100/30 animate-slide-up">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="text-4xl">🔍</div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            No stations found
          </h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your filters or search location
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 font-semibold">
            Reset Filters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
      {filteredStations.map((station) => (
        <StationCard key={station.id} station={station} />
      ))}
    </div>
  );
};

export default StationCards;
