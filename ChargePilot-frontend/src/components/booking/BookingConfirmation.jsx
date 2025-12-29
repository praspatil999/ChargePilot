// components/booking/BookingConfirmation.js
import React from "react";
import { CheckCircle, MapPin, Calendar, Clock, Battery } from "lucide-react";

const BookingConfirmation = ({
  station,
  formData,
  calculatePrice,
  navigate,
}) => {
  return (
    <div className="text-center py-12">
      <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
        <CheckCircle className="w-12 h-12 text-white" />
      </div>

      <h3 className="text-3xl font-bold text-gray-800 mb-4">
        Booking Confirmed! 🎉
      </h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Your charging slot has been booked successfully. You'll receive a
        confirmation email with details.
      </p>

      {/* Booking Details Card */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 max-w-lg mx-auto mb-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Booking ID:</span>
            <span className="font-mono font-bold text-gray-800">
              EV{Date.now().toString().slice(-8)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Station:</span>
            <span className="font-semibold text-gray-800">{station?.name}</span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Date:</span>
            </div>
            <span className="font-semibold text-gray-800">{formData.date}</span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              <span>Time:</span>
            </div>
            <span className="font-semibold text-gray-800">
              {formData.timeSlot}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center text-gray-600">
              <Battery className="w-4 h-4 mr-2" />
              <span>Duration:</span>
            </div>
            <span className="font-semibold text-gray-800">
              {formData.duration} hours
            </span>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-800">
                Estimated Cost:
              </span>
              <span className="text-xl font-bold text-emerald-600">
                ₹{calculatePrice()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => navigate("/stations")}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          Back to Stations
        </button>
        <button
          onClick={() => navigate("/my-bookings")}
          className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all"
        >
          View My Bookings
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
