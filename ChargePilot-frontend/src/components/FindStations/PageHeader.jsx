import React from "react";

const PageHeader = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 animate-fade-in">
            Find EV Charging Stations
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Discover nearby charging points, compare prices, and book instantly.
            Drive electric with confidence.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl font-bold">2,500+</div>
            <div className="text-blue-100">Stations Nationwide</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl font-bold">99%</div>
            <div className="text-blue-100">Uptime Guarantee</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl font-bold">24/7</div>
            <div className="text-blue-100">Support Available</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
