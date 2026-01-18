// components/booking/BookingConfirmation.js
import React from "react";
import { CheckCircle2, Home, Map } from "lucide-react";
import { motion } from "motion/react";

const BookingConfirmation = ({ station, formData, calculatePrice, navigate }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-xl mx-auto text-center font-[Outfit]"
    >
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl shadow-emerald-900/10 dark:shadow-emerald-900/30 border border-emerald-100 dark:border-emerald-900/30 relative overflow-hidden transition-colors duration-300">
        {/* Success Background Effect */}
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-emerald-400 to-green-500"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 dark:bg-emerald-900/20 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none transition-colors"></div>

        <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8, bounce: 0.5 }}
            className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors"
        >
            <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
        </motion.div>

        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">Booking Confirmed!</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 transition-colors">Your charging slot has been successfully reserved.</p>

        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6 mb-8 text-left border border-gray-100 dark:border-gray-600 transition-colors">
           <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-600 mb-4 transition-colors">
                <span className="text-gray-500 dark:text-gray-400 text-sm font-medium transition-colors">Booking ID</span>
                <span className="text-gray-900 dark:text-white font-mono font-bold transition-colors">#CP-{Math.floor(Math.random() * 100000)}</span>
           </div>
           
           <div className="space-y-3">
               <div className="flex justify-between">
                   <span className="text-gray-600 dark:text-gray-300 transition-colors">Station</span>
                   <span className="font-semibold text-gray-900 dark:text-white text-right transition-colors">{station?.name}</span>
               </div>
               <div className="flex justify-between">
                   <span className="text-gray-600 dark:text-gray-300 transition-colors">Date & Time</span>
                   <span className="font-semibold text-gray-900 dark:text-white transition-colors">{formData.date} at {formData.timeSlot}</span>
               </div>
               <div className="flex justify-between">
                   <span className="text-gray-600 dark:text-gray-300 transition-colors">Estimate</span>
                   <span className="font-bold text-emerald-600 dark:text-emerald-400 transition-colors">₹{calculatePrice()}</span>
               </div>
           </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
            <button 
                onClick={() => navigate("/")}
                className="flex-1 py-4 px-6 rounded-xl border border-gray-200 dark:border-gray-600 font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500 transition-all flex items-center justify-center gap-2"
            >
                <Home className="w-4 h-4" />
                Return Home
            </button>
            <button 
                onClick={() => navigate("/findStations")}
                className="flex-1 py-4 px-6 rounded-xl bg-gray-900 dark:bg-emerald-600 text-white font-semibold hover:bg-gray-800 dark:hover:bg-emerald-700 transition-all shadow-lg shadow-gray-900/20 dark:shadow-emerald-900/20 active:translate-y-0.5 flex items-center justify-center gap-2"
            >
                <Map className="w-4 h-4" />
                Find More Stations
            </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingConfirmation;
