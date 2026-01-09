import React from "react";
import { MapPin, Battery, DollarSign, Navigation, ChevronRight } from "lucide-react";

const Features = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-gray-50">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 
               bg-gradient-to-r from-emerald-600 to-blue-600 
               bg-clip-text text-transparent">
                Powerful Features
          </h2>

          <p className="text-gray-600 text-lg">
            Everything you need for smarter EV charging
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 - Blue */}
          <div className="relative group rounded-2xl overflow-hidden bg-white border-2 border-gray-200 hover:border-blue-400 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="p-8 h-full flex flex-col">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">
                Smart Station Locator
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                Find nearby EV charging stations with real-time availability and route optimization.
              </p>
              <button className="mt-6 inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors gap-1 group-hover:gap-2">
                Learn more <ChevronRight className="w-4 h-4 transition-all" />
              </button>
            </div>
          </div>

          {/* Feature 2 - Emerald */}
          <div className="relative group rounded-2xl overflow-hidden bg-white border-2 border-gray-200 hover:border-emerald-400 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="p-8 h-full flex flex-col">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30">
                <Battery className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">
                Battery Health Insights
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                Get personalized recommendations to extend your battery lifespan by up to 30%.
              </p>
              <button className="mt-6 inline-flex items-center text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors gap-1 group-hover:gap-2">
                Learn more <ChevronRight className="w-4 h-4 transition-all" />
              </button>
            </div>
          </div>

          {/* Feature 3 - Purple */}
          <div className="relative group rounded-2xl overflow-hidden bg-white border-2 border-gray-200 hover:border-purple-400 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="p-8 h-full flex flex-col">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">
                Cost Comparison
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                Compare charging prices across stations and save money on every charge.
              </p>
              <button className="mt-6 inline-flex items-center text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors gap-1 group-hover:gap-2">
                Learn more <ChevronRight className="w-4 h-4 transition-all" />
              </button>
            </div>
          </div>

          {/* Feature 4 - Orange */}
          <div className="relative group rounded-2xl overflow-hidden bg-white border-2 border-gray-200 hover:border-orange-400 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="p-8 h-full flex flex-col">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-orange-500/30">
                <Navigation className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">
                Trip Planner
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                Plan long-distance routes with optimal charging stops and time estimates.
              </p>
              <button className="mt-6 inline-flex items-center text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors gap-1 group-hover:gap-2">
                Learn more <ChevronRight className="w-4 h-4 transition-all" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;