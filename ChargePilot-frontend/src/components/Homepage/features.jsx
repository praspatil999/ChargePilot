import React from "react";
import { MapPin, Battery, DollarSign, Navigation, Zap, Shield, Smartphone, Globe } from "lucide-react";
import { motion } from "motion/react";

const FeatureCard = ({ icon: Icon, title, description, color, delay, darkMode }) => {
  const colorVariants = {
    blue: `${darkMode ? "dark:bg-blue-900/30 dark:text-blue-400" : "bg-blue-50 text-blue-600"} group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-600`,
    emerald: `${darkMode ? "dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-emerald-50 text-emerald-600"} group-hover:bg-emerald-600 group-hover:text-white dark:group-hover:bg-emerald-600`,
    indigo: `${darkMode ? "dark:bg-indigo-900/30 dark:text-indigo-400" : "bg-indigo-50 text-indigo-600"} group-hover:bg-indigo-600 group-hover:text-white dark:group-hover:bg-indigo-600`,
    rose: `${darkMode ? "dark:bg-rose-900/30 dark:text-rose-400" : "bg-rose-50 text-rose-600"} group-hover:bg-rose-600 group-hover:text-white dark:group-hover:bg-rose-600`,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`group relative ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"} p-8 rounded-3xl border shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden`}
    >
      <div className={`absolute top-0 right-0 w-32 h-32 ${darkMode ? "bg-gray-700/50" : "bg-gray-50"} rounded-bl-[100px] -mr-8 -mt-8 transition-all duration-500 group-hover:scale-150 group-hover:bg-gray-50/50 dark:group-hover:bg-gray-700/50`}></div>
      
      <div className={`relative w-14 h-14 ${colorVariants[color]} rounded-2xl flex items-center justify-center mb-6 transition-colors duration-500`}>
        <Icon className="w-7 h-7" strokeWidth={2} />
      </div>
      
      <h3 className={`relative text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"} mb-3`}>{title}</h3>
      <p className={`relative ${darkMode ? "text-gray-400 group-hover:text-gray-300" : "text-gray-500 group-hover:text-gray-600"} leading-relaxed transition-colors`}>
        {description}
      </p>
    </motion.div>
  );
};

const Features = ({ darkMode }) => {
  const features = [
    {
      icon: MapPin,
      title: "Smart Station Locator",
      description: "Instantly find compatible charging stations nearby with real-time availability, live status updates, and detailed facility information.",
      color: "blue",
    },
    {
      icon: Zap,
      title: "Intelligent Trip Planner",
      description: "Plan long-distance trips with AI-powered routing that calculates optimal charging stops, estimates range per leg, and saves time and money.",
      color: "emerald",
    },
    {
      icon: Smartphone,
      title: "Quick Booking System",
      description: "Reserve your charging slot in advance with just one tap. Choose preferred time slots, connector types, and avoid waiting queues.",
      color: "indigo",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Hassle-free, secure payments through the app with transparent pricing, digital receipts, and multiple payment options.",
      color: "rose",
    },
  ];

  return (
    <section id="features" className={`py-24 lg:py-32 ${darkMode ? "bg-gray-800/50" : "bg-gray-50/50"} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-4xl lg:text-5xl font-bold ${darkMode ? "text-white" : "text-gray-900"} mb-6 tracking-tight`}
          >
            Everything you need for a <br/>
            <span className="text-blue-600">seamless charging experience</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-xl ${darkMode ? "text-gray-400" : "text-gray-500"} font-light`}
          >
            Our platform aggregates data from thousands of stations to provide you with the most accurate and up-to-date information.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} delay={index * 0.1} darkMode={darkMode} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
