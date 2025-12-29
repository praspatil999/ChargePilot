// components/MapPreview.jsx
import React from "react";
import { Map, Zap } from "lucide-react";

const MapPreview = () => {
  return (
    <section id="map" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl overflow-hidden shadow-2xl border border-gray-200 h-[500px] flex items-center justify-center group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-emerald-500/5"></div>
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, rgb(209 213 219 / 0.3) 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          ></div>

          <div className="relative z-10 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
              <Map className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              Interactive EV Charging Map
            </h3>
            <p className="text-xl text-gray-600 mb-8 font-light">
              Explore thousands of charging stations in real-time
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 font-semibold hover:-translate-y-1">
              View Full Map
            </button>
          </div>

          <div className="absolute top-8 left-8 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50"></div>
              <span className="text-sm font-semibold text-gray-900">
                24 Stations Available
              </span>
            </div>
          </div>

          <div className="absolute bottom-8 right-8 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center space-x-3">
              <Zap className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold text-gray-900">
                Fast Charging
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapPreview;
