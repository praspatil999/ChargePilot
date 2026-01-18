import React from "react";
import { Check } from "lucide-react";

const BookingProgress = ({ step }) => {
  const steps = [
    { id: 1, label: "Details" },
    { id: 2, label: "Charger" },
    { id: 3, label: "Confirm" },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between relative overflow-hidden transition-colors duration-300">
        {/* Connecting Line - Background */}
        <div className="absolute left-0 top-1/2 w-full h-[2px] bg-gray-100 dark:bg-gray-700 -z-10 transform -translate-y-1/2 transition-colors"></div>
        
        {/* Connecting Line - Active */}
         <div 
            className="absolute left-0 top-1/2 h-[2px] bg-blue-600 -z-10 transform -translate-y-1/2 transition-all duration-500 ease-in-out"
            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
        ></div>


      {steps.map((s) => {
        const isActive = s.id === step;
        const isCompleted = s.id < step;

        return (
          <div key={s.id} className="relative z-10 flex flex-col items-center flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-4 ${
                isActive
                  ? "bg-white dark:bg-gray-800 border-blue-600 text-blue-600 scale-110 shadow-lg shadow-blue-200 dark:shadow-blue-900/20"
                  : isCompleted
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500"
              }`}
            >
              {isCompleted ? (
                <Check className="w-5 h-5" />
              ) : (
                <span className="text-sm font-bold">{s.id}</span>
              )}
            </div>
            <span
              className={`mt-2 text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${
                isActive || isCompleted ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"
              }`}
            >
              {s.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default BookingProgress;
