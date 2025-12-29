// components/booking/BookingProgress.js
import React from "react";
import { CheckCircle } from "lucide-react";

const BookingProgress = ({ step }) => {
  const steps = [
    { number: 1, label: "Time & Vehicle" },
    { number: 2, label: "Charger Type" },
    { number: 3, label: "Confirm" },
  ];

  return (
    <div className="flex justify-between mb-12 relative">
      <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 -z-10">
        <div
          className="h-1 bg-gradient-to-r from-blue-600 to-emerald-600 transition-all duration-500"
          style={{ width: `${(step - 1) * 50}%` }}
        ></div>
      </div>
      {steps.map(({ number, label }) => (
        <ProgressStep
          key={number}
          number={number}
          label={label}
          active={step === number}
          completed={step > number}
        />
      ))}
    </div>
  );
};

const ProgressStep = ({ number, label, active, completed }) => (
  <div className="flex flex-col items-center">
    <div
      className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
        completed
          ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white"
          : active
          ? "bg-gradient-to-r from-blue-600 to-emerald-600 text-white"
          : "bg-gray-200 text-gray-400"
      }`}
    >
      {completed ? <CheckCircle className="w-6 h-6" /> : number}
    </div>
    <span
      className={`text-sm font-medium ${
        active ? "text-blue-600" : "text-gray-500"
      }`}
    >
      {label}
    </span>
  </div>
);

export default BookingProgress;
