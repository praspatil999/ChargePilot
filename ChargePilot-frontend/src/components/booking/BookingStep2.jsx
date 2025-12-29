// components/booking/BookingStep2.js
import React from "react";
import { Zap } from "lucide-react";

const BookingStep2 = ({ formData, station, onChange }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl p-2">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">Select Charger Type</h3>
      </div>

      {station?.chargers?.map((charger, index) => (
        <div
          key={index}
          className="border-2 border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-all"
        >
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="chargerType"
              value={charger.type}
              checked={formData.chargerType === charger.type}
              onChange={(e) => onChange("chargerType", e.target.value)}
              className="w-5 h-5 text-blue-600"
            />
            <div className="ml-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-800">
                  {charger.type} Charger ({charger.power}kW)
                </span>
                <span className="font-bold text-emerald-600">
                  ₹{charger.pricePerUnit}/kWh
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Estimated for {formData.duration} hour(s): ₹
                {(
                  charger.power *
                  formData.duration *
                  charger.pricePerUnit
                ).toFixed(2)}
              </p>
            </div>
          </label>
        </div>
      ))}
    </div>
  );
};

export default BookingStep2;
