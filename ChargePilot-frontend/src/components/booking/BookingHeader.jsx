// components/booking/BookingHeader.js
import React from "react";
import { ArrowLeft } from "lucide-react";

const BookingHeader = ({ navigate }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 hover:text-blue-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-2xl font-bold">Book Charging Slot</h1>
          <div className="w-20"></div>
        </div>
      </div>
    </div>
  );
};

export default BookingHeader;
