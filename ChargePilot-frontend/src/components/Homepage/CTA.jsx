import React from "react";
import { Zap, Shield, Clock, Battery } from "lucide-react";

const CTA = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-white">
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 to-purple-600 shadow-2xl shadow-blue-500/30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
          <div className="relative z-10 p-12 lg:p-16">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
              <Zap className="w-8 h-8 text-white" />
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Upgrade Your{" "}
              <span className="text-emerald-300">
                EV Charging?
              </span>
            </h2>

            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
              Charge smarter, save money, and protect your battery health with
              our intelligent platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all duration-300 hover:-translate-y-1">
                Start Free Trial
              </button>
              <button className="border-2 border-white/30 px-8 py-4 rounded-xl text-white font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300">
                Learn More
              </button>
            </div>

            {/* Trust badges */}
            <div className="mt-12 pt-8 border-t border-white/20 grid grid-cols-3 gap-6 max-w-xl mx-auto">
              <div className="flex flex-col items-center gap-2">
                <Shield className="w-6 h-6 text-white/80" />
                <span className="text-sm text-white/80">Secure</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Clock className="w-6 h-6 text-white/80" />
                <span className="text-sm text-white/80">24/7 Support</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Battery className="w-6 h-6 text-white/80" />
                <span className="text-sm text-white/80">Battery Safe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;