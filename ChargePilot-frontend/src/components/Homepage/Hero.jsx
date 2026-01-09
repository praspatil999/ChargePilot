import React from "react";
import { MapPin, Battery, ChevronRight, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-emerald-50" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgb(59 130 246 / 0.1) 1px, transparent 0)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto py-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 px-4 py-2 rounded-full mb-8">
          <Zap className="w-4 h-4 text-blue-600" />
          <span className="text-blue-700 text-sm font-semibold">
            Smart EV Charging Platform
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight
               bg-gradient-to-r from-slate-900 via-slate-700 to-emerald-600
               bg-clip-text text-transparent drop-shadow-sm">
  Charge Smarter.
          <br />
          <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Drive Further.
          </span>
        </h1>

        <p className="text-green-800 text-xl lg:text-xl mb-16 max-w-2xl mx-auto">
          Find stations, compare costs, optimize battery health, and plan your perfect EV journey.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button
            onClick={() => navigate("/findStations")}
            className="group bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-4 rounded-xl text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-1"
          >
            <MapPin className="w-5 h-5" />
            Find Stations
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          {/* <button className="border-2 border-gray-300 px-8 py-4 rounded-xl text-gray-700 font-semibold hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2">
            <Battery className="w-5 h-5" />
            Estimate Range
          </button> */}
        </div>

        


        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {/* <div className="relative group rounded-2xl overflow-hidden bg-white border-2 border-gray-200 hover:border-blue-400 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">50K+</div>
              <div className="text-sm text-gray-600 font-medium">Charging Stations</div>
            </div>
          </div> */}
          
          {/* <div className="relative group rounded-2xl overflow-hidden bg-white border-2 border-gray-200 hover:border-emerald-400 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="p-6 text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-1">100K+</div>
              <div className="text-sm text-gray-600 font-medium">Active Users</div>
            </div>
          </div> */}
          
          {/* <div className="relative group rounded-2xl overflow-hidden bg-white border-2 border-gray-200 hover:border-purple-400 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">200+</div>
              <div className="text-sm text-gray-600 font-medium">Cities Covered</div>
            </div>
          </div> */}
          
          {/* <div className="relative group rounded-2xl overflow-hidden bg-white border-2 border-gray-200 hover:border-orange-400 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-1">30%</div>
              <div className="text-sm text-gray-600 font-medium">Battery Saved</div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;