// components/booking/BookingStep2.js
import React from "react";
import { Zap, CircleDollarSign } from "lucide-react";

const BookingStep2 = ({ formData, station, onChange }) => {
  return (
    <div className="space-y-8 animate-fade-in-up">
       <div className="flex items-center space-x-3 mb-2">
        <div className="bg-blue-100/50 dark:bg-blue-900/30 p-2 rounded-xl transition-colors">
           <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
           <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight transition-colors">Select Charger</h3>
           <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors">Choose suitable connector type</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {station?.chargers?.map((charger, index) => {
            const isSelected = formData.chargerType === charger.type;
            const estimatedCost = (charger.power * formData.duration * charger.pricePerUnit).toFixed(2);

            return (
                <div
                    key={index}
                    onClick={() => onChange("chargerType", charger.type)}
                    className={`relative border-2 rounded-2xl p-5 cursor-pointer transition-all duration-300 group overflow-hidden ${
                         isSelected 
                         ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/10 shadow-md ring-1 ring-blue-500/20" 
                         : "border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-200 dark:hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-50 dark:hover:shadow-blue-900/10"
                    }`}
                >
                   {isSelected && (
                        <div className="absolute right-0 top-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                            SELECTED
                        </div>
                   )}
                   
                   <div className="flex justify-between items-center">
                       <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${isSelected ? "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400" : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 group-hover:bg-blue-50 dark:group-hover:bg-gray-600"}`}>
                                <Zap className="w-6 h-6" fill="currentColor" />
                            </div>
                            <div>
                                <h4 className="flex items-center gap-2 font-bold text-gray-900 dark:text-white text-lg transition-colors">
                                    {charger.type} Charger
                                    <span className="text-xs font-medium px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 transition-colors">
                                        {charger.power} kW
                                    </span>
                                </h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors">{charger.title || "Generic Connector"}</p>
                            </div>
                       </div>
                       
                       <div className="text-right">
                           <div className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">₹{charger.pricePerUnit}</div>
                           <div className="text-xs text-gray-400 font-medium">per kWh</div>
                       </div>
                   </div>

                   {/* Estimation strip */}
                   <div className={`mt-4 pt-4 border-t flex items-center justify-between transition-colors ${isSelected ? "border-blue-200" : "border-gray-100"}`}>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <CircleDollarSign className="w-4 h-4" />
                            Est. for {formData.duration}h
                        </div> 
                        <div className="font-bold text-emerald-600">
                             ₹{estimatedCost}
                        </div>
                   </div>
                </div>
            )
        })}
      </div>
    </div>
  );
};

export default BookingStep2;
