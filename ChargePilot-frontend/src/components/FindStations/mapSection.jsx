import React from 'react';
import { MapPin, Zap } from 'lucide-react';

const MapSection = ({ showStations, location, filteredStations }) => {
  const availableStations = filteredStations.filter(s => s.availability === 'Available').length;

  return (
    <div className="mb-8 animate-slide-up">
      <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl h-[500px] border-2 border-white shadow-2xl shadow-blue-100/50 overflow-hidden relative">
        {/* Map background with grid */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-emerald-50">
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: 'linear-gradient(to right, #60a5fa 1px, transparent 1px), linear-gradient(to bottom, #60a5fa 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>
          
          {/* Interactive markers */}
          {showStations && filteredStations.map((station, index) => (
            <div
              key={station.id}
              className="absolute w-4 h-4 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
              style={{
                left: `${30 + (index * 15) % 70}%`,
                top: `${40 + (index * 20) % 50}%`,
                backgroundColor: station.availability === 'Available' ? '#10b981' : '#ef4444',
                boxShadow: `0 0 0 4px ${station.availability === 'Available' ? '#10b98140' : '#ef444440'}`
              }}
              title={station.name}
            />
          ))}
        </div>

        {/* Center focus point */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/30 animate-pulse-slow">
              <MapPin className="w-12 h-12 text-white" />
            </div>
            <div className="absolute inset-0 animate-ping rounded-full bg-blue-500 opacity-20"></div>
          </div>
        </div>

        {/* Info overlays */}
        {showStations && (
          <>
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-xl border border-blue-100">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                <div>
                  <div className="text-sm text-gray-600">Available Stations</div>
                  <div className="text-2xl font-bold text-gray-900">{availableStations}</div>
                </div>
              </div>
            </div>

            <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-xl border border-blue-100">
              <div className="flex items-center space-x-3">
                <Zap className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-sm text-gray-600">Total Stations</div>
                  <div className="text-2xl font-bold text-gray-900">{filteredStations.length}</div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-xl border border-blue-100">
              <div className="flex items-center space-x-2 text-gray-700">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="font-semibold">Location:</span>
                <span className="text-gray-900 font-medium">{location}</span>
              </div>
            </div>
          </>
        )}

        {!showStations && (
          <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-xl border border-blue-100">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Enter location to</div>
              <div className="text-lg font-bold text-gray-900">View charging stations</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapSection;