import React from "react";
import { Battery, MapPin, TrendingUp, Navigation } from "lucide-react";

const HowItWorks = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-white">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 
               bg-gradient-to-r from-emerald-600 to-blue-600 
               bg-clip-text text-transparent">
               How It Works
          </h2>

          <p className="text-gray-600 text-lg">
            Four simple steps to smarter EV charging
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="relative group rounded-2xl overflow-hidden bg-white border-2 border-gray-200 hover:border-blue-400 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="p-8 h-full">
              <div className="flex items-start justify-between mb-6">
                <span className="text-5xl font-bold text-blue-600">01</span>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Battery className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Enter Vehicle Details
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Add your EV model, battery capacity, and current charge level for personalized recommendations.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative group rounded-2xl overflow-hidden bg-white border-2 border-gray-200 hover:border-emerald-400 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="p-8 h-full">
              <div className="flex items-start justify-between mb-6">
                <span className="text-5xl font-bold text-emerald-600">02</span>
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Discover Stations
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Browse nearby charging stations with real-time availability, pricing, and compatibility data.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative group rounded-2xl overflow-hidden bg-white border-2 border-gray-200 hover:border-purple-400 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="p-8 h-full">
              <div className="flex items-start justify-between mb-6">
                <span className="text-5xl font-bold text-purple-600">03</span>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Compare & Analyze
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Compare costs, reachability, charging speeds, and battery health impact across stations.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="relative group rounded-2xl overflow-hidden bg-white border-2 border-gray-200 hover:border-orange-400 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="p-8 h-full">
              <div className="flex items-start justify-between mb-6">
                <span className="text-5xl font-bold text-orange-600">04</span>
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Navigation className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Navigate & Charge
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Get turn-by-turn directions and start charging at your optimally selected station.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;