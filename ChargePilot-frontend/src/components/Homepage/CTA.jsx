import React from "react";
import { ArrowRight } from "lucide-react";

/**
 * Enhanced CTA Component
 * Uses a dark theme to separate from the rest of the light-themed page.
 */
const CTA = ({ darkMode }) => {
  return (
    <section className={`py-24 ${darkMode ? "bg-gray-900" : "bg-white"} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`relative isolate overflow-hidden px-6 py-24 text-center shadow-2xl rounded-3xl sm:px-16 ${
          darkMode 
            ? "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700" 
            : "bg-gray-900"
        }`}>
          
          {/* Background Gradients */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
          <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center opacity-5"></div>
          
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 blur-3xl opacity-50">
            <div className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
          </div>

          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to revolutionize your <br />
            <span className="text-blue-400">charging experience?</span>
          </h2>
          
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
            Join thousands of EV drivers who are saving time and money with ChargePilot. 
            Smart routing, quick booking, and real-time data awaiting you.
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button className="group relative inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white transition-all duration-200 bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 hover:shadow-lg hover:shadow-blue-500/30">
              Get Started Now
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="text-sm font-semibold leading-6 text-white hover:text-blue-300 transition-colors">
              Learn more <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
