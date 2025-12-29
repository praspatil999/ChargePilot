// components/booking/BookingStep3.js
import React from "react";
import {
  CreditCard,
  Shield,
  MapPin,
  Calendar,
  Clock,
  Battery,
  Zap,
} from "lucide-react";

const BookingStep3 = ({ formData, station, calculatePrice }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl p-2">
          <CreditCard className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">Confirm Booking</h3>
      </div>

      {/* Booking Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl p-6 border border-blue-100">
        <h4 className="font-bold text-gray-800 mb-4">Booking Summary</h4>

        <div className="space-y-4">
          {/* Station Info */}
          <div className="flex items-start">
            <MapPin className="w-5 h-5 text-blue-600 mt-1 mr-3" />
            <div>
              <p className="font-semibold">{station?.name}</p>
              <p className="text-sm text-gray-600">{station?.address}</p>
            </div>
          </div>

          {/* Booking Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-3">
              <div className="flex items-center mb-1">
                <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">Date</span>
              </div>
              <p className="font-semibold">{formData.date}</p>
            </div>

            <div className="bg-white rounded-lg p-3">
              <div className="flex items-center mb-1">
                <Clock className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">Time</span>
              </div>
              <p className="font-semibold">{formData.timeSlot}</p>
            </div>

            <div className="bg-white rounded-lg p-3">
              <div className="flex items-center mb-1">
                <Battery className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">Duration</span>
              </div>
              <p className="font-semibold">{formData.duration} hour(s)</p>
            </div>

            <div className="bg-white rounded-lg p-3">
              <div className="flex items-center mb-1">
                <Zap className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">Charger</span>
              </div>
              <p className="font-semibold">{formData.chargerType}</p>
            </div>
          </div>

          {/* Price */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-800">
                Estimated Amount
              </span>
              <span className="text-2xl font-bold text-emerald-600">
                ₹{calculatePrice()}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Payment will be processed after charging completion
            </p>
          </div>
        </div>
      </div>

      {/* Terms & Conditions */}
      <div className="bg-blue-50 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm text-gray-700">
              By confirming, you agree to our Terms of Service. You can cancel
              up to 2 hours before your scheduled time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingStep3;
