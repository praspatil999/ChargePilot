// components/booking/BookingStep1.js
import React from "react";
import { Calendar, Clock, Car, Battery } from "lucide-react";

const BookingStep1 = ({ formData, userVehicles, onChange }) => {
  const timeSlots = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl p-2">
          <Car className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">
          Select Vehicle & Time
        </h3>
      </div>

      {/* Vehicle Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Car className="w-4 h-4 inline mr-2" />
          Select Your Vehicle
        </label>
        <select
          value={formData.vehicleId}
          onChange={(e) => onChange("vehicleId", e.target.value)}
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
          required
        >
          <option value="">Select a vehicle</option>
          {userVehicles.map((vehicle) => (
            <option key={vehicle._id} value={vehicle._id}>
              {vehicle.model} ({vehicle.connectorType})
            </option>
          ))}
        </select>
      </div>

      {/* Date Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Calendar className="w-4 h-4 inline mr-2" />
          Select Date
        </label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => onChange("date", e.target.value)}
          min={new Date().toISOString().split("T")[0]}
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
          required
        />
      </div>

      {/* Time Slot Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Clock className="w-4 h-4 inline mr-2" />
          Select Time Slot
        </label>
        <select
          value={formData.timeSlot}
          onChange={(e) => onChange("timeSlot", e.target.value)}
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
          required
        >
          <option value="">Select time</option>
          {timeSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </div>

      {/* Duration Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Battery className="w-4 h-4 inline mr-2" />
          Charging Duration (Hours)
        </label>
        <div className="flex flex-wrap gap-3">
          {[1, 2, 3, 4].map((hours) => (
            <button
              key={hours}
              type="button"
              onClick={() => onChange("duration", hours.toString())}
              className={`px-6 py-3 rounded-xl border-2 font-medium transition-all ${
                formData.duration === hours.toString()
                  ? "border-emerald-500 bg-emerald-50 text-emerald-600"
                  : "border-gray-200 hover:border-emerald-300 hover:bg-emerald-50"
              }`}
            >
              {hours} {hours === 1 ? "Hour" : "Hours"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingStep1;
