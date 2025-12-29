// components/HowItWorks.jsx
import React from "react";
import { ArrowRight } from "lucide-react";

const Step = ({ number, title, description, showArrow = true }) => {
  const colorClasses = {
    1: "from-blue-500 to-blue-600 shadow-blue-500/20",
    2: "from-emerald-500 to-emerald-600 shadow-emerald-500/20",
    3: "from-purple-500 to-purple-600 shadow-purple-500/20",
    4: "from-orange-500 to-orange-600 shadow-orange-500/20",
  };

  return (
    <div className="relative text-center group">
      <div
        className={`w-20 h-20 bg-gradient-to-br ${colorClasses[number]} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold shadow-xl group-hover:scale-110 transition-transform duration-300`}
      >
        {number}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
      {showArrow && (
        <div className="hidden lg:block absolute top-10 -right-4 text-gray-300">
          <ArrowRight className="w-6 h-6" />
        </div>
      )}
    </div>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Enter Vehicle Details",
      description:
        "Add your EV model, battery capacity, and current charge level.",
    },
    {
      number: 2,
      title: "Discover Stations",
      description:
        "Browse nearby charging stations with real-time availability data.",
    },
    {
      number: 3,
      title: "Compare & Analyze",
      description:
        "Compare costs, reachability, and charging speeds across stations.",
    },
    {
      number: 4,
      title: "Navigate & Charge",
      description:
        "Get directions and start charging at your selected station.",
      showArrow: false,
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-5 tracking-tight">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 font-light">
            Four simple steps to smarter EV charging
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {steps.map((step) => (
            <Step key={step.number} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
