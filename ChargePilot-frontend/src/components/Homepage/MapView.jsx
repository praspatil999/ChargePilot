import React from "react";
import { MapPin, Zap, Navigation } from "lucide-react";

const MapPreview = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-gray-50">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4
               bg-gradient-to-r from-emerald-600 to-blue-600
               bg-clip-text text-transparent">
              Interactive Charging Map
          </h2>

          <p className="text-gray-600 text-lg">
            Explore thousands of EV charging stations in real-time
          </p>
        </div>

        <div className="relative group rounded-2xl overflow-hidden bg-white border-2 border-gray-200 hover:border-blue-400 shadow-lg hover:shadow-2xl transition-all duration-300">
          <div className="relative h-[500px] flex items-center justify-center">
            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, rgb(59 130 246 / 0.15) 1px, transparent 0)",
                backgroundSize: "32px 32px",
              }}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white to-emerald-50/80" />

            {/* Content */}
            <div className="relative z-10 text-center px-6">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/30">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Real-Time Station Finder
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Discover available charging points with live updates on
                availability, pricing, and compatibility
              </p>
              <button className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300 hover:-translate-y-1 inline-flex items-center gap-2">
                <span>View Full Map</span>
                <Navigation className="w-5 h-5" />
              </button>
            </div>

            {/* Floating indicators */}
            <div className="absolute top-8 left-8 bg-white border-2 border-emerald-200 px-4 py-3 rounded-xl shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50" />
                <span className="text-sm font-semibold text-gray-900">
                  24 Stations Available
                </span>
              </div>
            </div>

            <div className="absolute top-8 right-8 bg-white border-2 border-blue-200 px-4 py-3 rounded-xl shadow-lg">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-semibold text-gray-900">
                  Fast Charging
                </span>
              </div>
            </div>

            <div className="absolute bottom-8 left-8 bg-white border-2 border-purple-200 px-4 py-3 rounded-xl shadow-lg">
              <div className="flex items-center gap-3">
                <Navigation className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-semibold text-gray-900">
                  Route Optimized
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapPreview;