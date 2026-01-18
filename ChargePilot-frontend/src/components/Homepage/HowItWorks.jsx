import React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

const Step = ({ number, title, description, isLast, delay, darkMode }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative flex flex-col items-center text-center px-4"
    >
      {/* Connector Line */}
      {!isLast && (
        <div className={`hidden lg:block absolute top-10 left-1/2 w-full h-[2px] ${darkMode ? "bg-gray-700" : "bg-gray-200"} -z-10`}>
          <div className="absolute inset-0 bg-blue-500 origin-left transform scale-x-0 transition-transform duration-1000 delay-500 h-full"></div>
        </div>
      )}

      {/* Number Bubble */}
      <div className={`relative z-10 w-20 h-20 rounded-full border-4 flex items-center justify-center mb-6 shadow-sm group transition-colors duration-300 ${
        darkMode 
          ? "bg-gray-800 border-gray-700 group-hover:border-blue-600" 
          : "bg-white border-blue-50 group-hover:border-blue-100"
      }`}>
        <span className="text-3xl font-bold bg-gradient-to-br from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          {number}
        </span>
        <div className="absolute -bottom-2 bg-green-500 rounded-full p-1 border-4 border-white dark:border-gray-800">
          <CheckCircle2 className="w-3 h-3 text-white" strokeWidth={3} />
        </div>
      </div>

      <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"} mb-3`}>{title}</h3>
      <p className={`${darkMode ? "text-gray-400" : "text-gray-500"} leading-relaxed max-w-sm`}>
        {description}
      </p>
    </motion.div>
  );
};

const HowItWorks = ({ darkMode }) => {
  const steps = [
    {
      number: "01",
      title: "Enter Vehicle Details",
      description: "Select your EV model to get personalized range and charging station recommendations tailored to your car.",
    },
    {
      number: "02",
      title: "Locate Stations",
      description: "Browse our extensive map to find available chargers nearby, filtering by speed, network, and connector type.",
    },
    {
      number: "03",
      title: "Compare & Book",
      description: "View real-time pricing and availability, compare options, and book your slot instantly with one tap.",
    },
    {
      number: "04",
      title: "Charge & Monitor",
      description: "Navigate to the station, plug in, and monitor your charging session in real-time through the app.",
    },
  ];

  return (
    <section id="how-it-works" className={`py-24 lg:py-32 ${darkMode ? "bg-gray-900" : "bg-white"} overflow-hidden transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-blue-600 font-semibold tracking-wider text-sm uppercase mb-3 block"
          >
            Simple Process
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-4xl lg:text-5xl font-bold ${darkMode ? "text-white" : "text-gray-900"} mb-6 tracking-tight`}
          >
            How ChargePilot Works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-xl ${darkMode ? "text-gray-400" : "text-gray-500"} font-light max-w-2xl mx-auto`}
          >
            Start your optimized EV journey in four simple steps
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative">
          {steps.map((step, index) => (
            <Step 
              key={index} 
              {...step} 
              isLast={index === steps.length - 1} 
              delay={index * 0.15}
              darkMode={darkMode}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
