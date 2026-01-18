// components/booking/BookingStep3.js
import React from "react";
import {
  CreditCard,
  ShieldCheck,
  MapPin,
  Calendar,
  Clock,
  Zap,
} from "lucide-react";

const BookingStep3 = ({ formData, station, calculatePrice }) => {
  return (
    <div className="space-y-8 animate-fade-in-up">
       <div className="flex items-center space-x-3 mb-2">
        <div className="bg-blue-100/50 dark:bg-blue-900/30 p-2 rounded-xl transition-colors">
           <CreditCard className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
           <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight transition-colors">Confirm & Pay</h3>
           <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors">Review details before booking</p>
        </div>
      </div>

      {/* Booking Summary Ticket */}
      <div className="relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-3xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm transition-colors duration-300">
        {/* Decorative Top Border */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500"></div>

        <div className="p-6 md:p-8 space-y-6">
            <h4 className="text-xs font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4 transition-colors">RESERVATION SUMMARY</h4>
            
            <div className="flex items-start gap-4 pb-6 border-b border-dashed border-gray-300 dark:border-gray-700 transition-colors">
                <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-2xl shrink-0 transition-colors">
                    <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                   <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-tight transition-colors">{station?.name}</h2>
                   <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm leading-relaxed transition-colors">{station?.address}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div>
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1 transition-colors">
                        <Calendar className="w-3.5 h-3.5" /> Date
                    </span>
                    <p className="text-gray-900 dark:text-white font-bold transition-colors">{formData.date}</p>
                </div>
                <div>
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1 transition-colors">
                        <Clock className="w-3.5 h-3.5" /> Start Time
                    </span>
                    <p className="text-gray-900 dark:text-white font-bold transition-colors">{formData.timeSlot}</p>
                </div>
                 <div>
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1 transition-colors">
                        <Zap className="w-3.5 h-3.5" /> Charger
                    </span>
                    <p className="text-gray-900 dark:text-white font-bold transition-colors">{formData.chargerType}</p>
                </div>
                <div>
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1 transition-colors">
                        <Clock className="w-3.5 h-3.5" /> Duration
                    </span>
                    <p className="text-gray-900 dark:text-white font-bold transition-colors">{formData.duration} hour(s)</p>
                </div>
            </div>

            {/* Total Section */}
            <div className="bg-gray-900 dark:bg-black/40 rounded-2xl p-5 text-white flex items-center justify-between shadow-xl shadow-gray-900/10 dark:shadow-black/20 transition-colors">
                <div>
                    <p className="text-gray-400 text-sm font-medium">Total Estimated</p>
                    <p className="text-xs text-gray-500">Pay at station</p>
                </div>
                <div className="text-3xl font-bold">
                    ₹{calculatePrice()}
                </div>
            </div>
        </div>
      </div>

      {/* Terms */}
      <div className="flex gap-4 p-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/30 transition-colors">
          <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0" />
          <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed transition-colors">
            By confirming this booking, you agree to ChargePilot's <span className="text-blue-600 dark:text-blue-400 font-semibold cursor-pointer hover:underline">Terms of Service</span>. 
            Cancellation is free up to 2 hours before the slot.
          </div>
      </div>
    </div>
  );
};

export default BookingStep3;
