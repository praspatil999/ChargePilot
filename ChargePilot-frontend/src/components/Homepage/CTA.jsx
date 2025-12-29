// components/CTA.jsx
import React from "react";

const CTA = () => {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="bg-gradient-to-br from-blue-600 via-blue-600 to-emerald-600 rounded-3xl p-12 lg:p-16 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10"></div>
          <div className="relative z-10">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to charge smarter?
            </h2>
            <p className="text-xl mb-10 opacity-95 font-light">
              Join thousands of EV drivers optimizing their charging experience
            </p>
            <button className="bg-white text-blue-600 px-10 py-4 rounded-xl hover:shadow-2xl transition-all duration-300 text-lg font-bold hover:-translate-y-1">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
