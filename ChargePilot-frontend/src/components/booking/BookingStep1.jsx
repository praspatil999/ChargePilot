// components/booking/BookingStep1.js
import React from "react";
import { Calendar, Clock, Car, Battery, ChevronDown } from "lucide-react";

const BookingStep1 = ({ formData, userVehicles, onChange }) => {
  const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", "12:00", "13:00",
    "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex items-center space-x-3 mb-2">
        <div className="bg-blue-100/50 dark:bg-blue-900/30 p-2 rounded-xl transition-colors">
           <Car className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
           <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight transition-colors">Session Details</h3>
           <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors">Select vehicle and schedule</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Vehicle Selection */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1 transition-colors">Select Vehicle</label>
            <div className="relative group">
                <Car className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <select
                value={formData.vehicleId}
                onChange={(e) => onChange("vehicleId", e.target.value)}
                className="w-full pl-12 pr-10 py-3.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:bg-white dark:focus:bg-gray-700 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none appearance-none cursor-pointer text-gray-900 dark:text-white font-medium"
                required
                >
                    <option value="">Choose a vehicle...</option>
                    {userVehicles.map((vehicle) => (
                        <option key={vehicle._id} value={vehicle._id}>
                        {vehicle.model} ({vehicle.connectorType})
                        </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            {userVehicles.length === 0 && (
                <p className="text-xs text-amber-600 dark:text-amber-400 ml-1 transition-colors">No vehicles found. Please add a vehicle in your profile.</p>
            )}
          </div>

          {/* Date Selection */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1 transition-colors">Date</label>
            <div className="relative group">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => onChange("date", e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:bg-white dark:focus:bg-gray-700 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-gray-900 dark:text-white font-medium cursor-pointer placeholder-gray-500 dark:placeholder-gray-400"
                    required
                />
            </div>
          </div>

          {/* Time Slot Selection */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1 transition-colors">Start Time</label>
             <div className="relative group">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <select
                value={formData.timeSlot}
                onChange={(e) => onChange("timeSlot", e.target.value)}
                className="w-full pl-12 pr-10 py-3.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:bg-white dark:focus:bg-gray-700 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none appearance-none cursor-pointer text-gray-900 dark:text-white font-medium"
                required
                >
                    <option value="">Select time...</option>
                    {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                        {slot}
                        </option>
                    ))}
                </select>
                 <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Duration Selection */}
          <div className="space-y-3 md:col-span-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1 flex items-center gap-2 transition-colors">
                <Battery className="w-4 h-4 text-gray-400" />
                Duration required
            </label>
            <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((hours) => (
                <button
                key={hours}
                type="button"
                onClick={() => onChange("duration", hours.toString())}
                className={`py-3 px-2 rounded-xl border font-semibold transition-all duration-200 ${
                    formData.duration === hours.toString()
                    ? "border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/30 transform scale-[1.02]"
                    : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:border-blue-200 dark:hover:border-blue-500/50 hover:bg-blue-50 dark:hover:bg-gray-600"
                }`}
                >
                <span className="text-lg">{hours}</span>
                <span className="text-xs ml-1 opacity-80">hr</span>
                </button>
            ))}
            </div>
          </div>
      </div>
    </div>
  );
};

export default BookingStep1;
