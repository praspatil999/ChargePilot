// components/Hero.jsx
import React from "react";
import { MapPin, Battery, Zap, ChevronRight } from "lucide-react";
import FindStations from "../../pages/Findstations";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const handleFindStations = ()=>{
    navigate("/findStations")
  }
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white pt-24 pb-32 lg:pt-32 lg:pb-40">
      <div className="absolute inset-0 bg-grid-gray-100 opacity-40"></div>
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 text-blue-700 px-5 py-2 rounded-full mb-8 shadow-sm">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-semibold">
              Smart EV Charging Platform
            </span>
          </div>

          <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 mb-8 leading-[1.1] tracking-tight">
            Charge Smarter.
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-emerald-500 bg-clip-text text-transparent">
              Drive Further.
            </span>
          </h1>

          <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            Find nearby EV charging stations, estimate range, compare costs, and
            plan smarter charging routes — all in one intelligent platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <button className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-4xl hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 text-lg font-medium flex items-center space-x-2 hover:-translate-y-1">
              <MapPin className="w-5 h-5" />
              <span onClick={handleFindStations}>Find Charging Stations</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group bg-white text-gray-900 border-2 border-gray-200 px-8 py-4 rounded-4xl hover:border-gray-300 hover:shadow-lg transition-all duration-300 text-lg font-medium flex items-center space-x-2 hover:-translate-y-1">
              <Battery className="w-5 h-5" />
              <span>Estimate Range</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
