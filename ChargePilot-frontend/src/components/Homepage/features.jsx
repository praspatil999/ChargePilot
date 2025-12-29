// components/Features.jsx
import React from "react";
import { Icon } from "lucide-react";
import { MapPin, Battery, DollarSign, Navigation } from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description, color }) => {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600 shadow-blue-500/20 hover:border-blue-200",
    emerald:
      "from-emerald-500 to-emerald-600 shadow-emerald-500/20 hover:border-emerald-200",
    purple:
      "from-purple-500 to-purple-600 shadow-purple-500/20 hover:border-purple-200",
    orange:
      "from-orange-500 to-orange-600 shadow-orange-500/20 hover:border-orange-200",
  };

  return (
    <div className="group bg-white border border-gray-200 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
      <div
        className={`w-14 h-14 bg-gradient-to-br ${colorClasses[color]} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: MapPin,
      title: "Smart Station Locator",
      description:
        "Find charging stations near you with real-time availability and compatibility filters.",
      color: "blue",
    },
    {
      icon: Battery,
      title: "Range Estimation",
      description:
        "Calculate your driving range based on battery percentage and vehicle specifications.",
      color: "emerald",
    },
    {
      icon: DollarSign,
      title: "Cost Comparison",
      description:
        "Compare charging costs across different stations and find the most economical options.",
      color: "purple",
    },
    {
      icon: Navigation,
      title: "EV Trip Planner",
      description:
        "Plan long trips with optimized charging stops based on your route and battery capacity.",
      color: "orange",
    },
  ];

  return (
    <section id="features" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-5 tracking-tight">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
            Everything you need to optimize your EV charging experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
