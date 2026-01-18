import React from "react";
import { MapPin, Battery, Zap, ChevronRight, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

const Hero = ({ darkMode }) => {
  const navigate = useNavigate();

  const handleFindStations = () => {
    navigate("/findStations");
  };

  return (
    <section className={`relative overflow-hidden ${darkMode ? "bg-gray-900" : "bg-white"} pt-24 pb-32 lg:pt-40 lg:pb-48 transition-colors duration-300`}>
      {/* Background Elements */}
      <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] ${darkMode ? "from-blue-900/20" : "from-blue-100/40"} via-transparent to-transparent opacity-70`}></div>
      <div className={`absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] ${darkMode ? "from-emerald-900/20" : "from-emerald-100/40"} via-transparent to-transparent opacity-70`}></div>
      
      {/* Animated Orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3], 
          x: [0, 50, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute top-20 right-0 w-[600px] h-[600px] ${darkMode ? "bg-blue-600/10" : "bg-blue-400/10"} rounded-full blur-[100px] pointer-events-none`}
      ></motion.div>
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3], 
          x: [0, -50, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute bottom-0 left-0 w-[500px] h-[500px] ${darkMode ? "bg-emerald-600/10" : "bg-emerald-400/10"} rounded-full blur-[100px] pointer-events-none`}
      ></motion.div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`inline-flex items-center space-x-2 ${darkMode ? "bg-gray-800/80 border-gray-700 text-blue-400" : "bg-white/80 border-blue-100 text-blue-600"} backdrop-blur-sm border px-4 py-1.5 rounded-full mb-8 shadow-sm hover:shadow-md transition-shadow`}
          >
            <Zap className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium tracking-wide">
              Next-Gen EV Charging Network
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`text-6xl lg:text-8xl font-bold ${darkMode ? "text-white" : "text-gray-900"} mb-8 leading-[1.05] tracking-tight`}
          >
            Charge Smarter. <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 bg-clip-text text-transparent pb-2">
              Drive Further.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`text-xl lg:text-2xl ${darkMode ? "text-gray-400" : "text-gray-500"} max-w-2xl mx-auto mb-12 leading-relaxed font-light`}
          >
            The intelligent platform for modern EV drivers. Locate stations, plan trips, estimate range, and optimize your journey in real-time.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center"
          >
            <button 
              onClick={() => navigate('/findStations')}
              className="group relative px-8 py-4 bg-gray-900 text-white rounded-full text-lg font-medium overflow-hidden shadow-xl shadow-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 hover:-translate-y-1 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Find Stations</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
            
            <button 
              onClick={() => navigate('/trip-planner')}
              className={`group px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 flex items-center space-x-2 hover:shadow-lg hover:-translate-y-1 ${
                darkMode
                  ? "bg-gray-800 text-white border border-gray-700 hover:border-gray-600 hover:bg-gray-700"
                  : "bg-white text-gray-900 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <Zap className="w-5 h-5 text-emerald-500" />
              <span>Plan Trip</span>
            </button>
          </motion.div>
        
        </div>
      </div>
      
      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-soft-light"></div>
    </section>
  );
};

export default Hero;
