// components/booking/BookingForm.js
import React, { useState, useEffect } from "react";
// import axios from "axios";
import api from "../../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import BookingProgress from "./BookingProgress";
import BookingStep1 from "./BookingStep1";
import BookingStep2 from "./BookingStep2";
import BookingStep3 from "./BookingStep3";
import BookingConfirmation from "./BookingConfirmation";

const BookingForm = () => {
  const { id } = useParams(); // OpenChargeMap station ID
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [station, setStation] = useState(null);
  const [userVehicles, setUserVehicles] = useState([]);
  const [fetchingStation, setFetchingStation] = useState(true);

  const [formData, setFormData] = useState({
    stationOCMId: id,
    vehicleId: "",
    chargerType: "DC",
    date: "",
    timeSlot: "",
    duration: "1",
  });

  useEffect(() => {
    fetchStationDetails();
    fetchUserVehicles();
  }, [id]);

  // ================= FETCH STATION =================
  const fetchStationDetails = async () => {
    try {
      setFetchingStation(true);
      // Use the 'api' instance for consistency
      const response = await api.get(`/api/stations/${id}`);

      const data = response.data;

      const mappedStation = {
        ocmId: data.ID,
        name: data.AddressInfo?.Title || "Unknown Station",
        address: `${data.AddressInfo?.AddressLine1 || ""}, ${
          data.AddressInfo?.Town || ""
        }`,
        chargers: data.Connections.map((conn) => ({
          type: conn.CurrentType?.Title === "DC" ? "DC" : "AC",
          power: conn.PowerKW || 0,
          pricePerUnit: parseFloat(data.UsageCost?.replace(",", ".")) || 15,
          title: conn.ConnectionType?.Title,
        })),
      };

      setStation(mappedStation);
    } catch (error) {
      console.error("Error fetching station:", error);
    } finally {
      setFetchingStation(false);
    }
  };

  // ================= FETCH VEHICLES =================
  const fetchUserVehicles = async () => {
    try {
      console.log("Fetching user vehicles...");
      const response = await api.get(`/api/vehicles`);
      console.log("Vehicles Response:", response.data);
      
      // Robust handling: check if response.data is the array or if it has a vehicles property
      let vehicles = [];
      if (Array.isArray(response.data)) {
        vehicles = response.data;
      } else if (response.data && Array.isArray(response.data.vehicles)) {
        vehicles = response.data.vehicles;
      } else if (response.data && response.data.vehicle) { // Handle potential single object or misnamed prop
         vehicles = [response.data.vehicle]; 
      }

      setUserVehicles(vehicles);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      // Optional: set an error state here to show in UI
    }
  };

  // ================= FORM =================
  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else handleSubmitBooking();
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  // ================= PRICE CALC =================
  const calculatePrice = () => {
    if (!station) return 0;

    const charger = station.chargers.find(
      (c) => c.type === formData.chargerType
    );

    if (!charger) return 0;

    const hours = Number(formData.duration);
    const energy = charger.power * hours;
    return (energy * charger.pricePerUnit).toFixed(2);
  };

  // ================= SUBMIT BOOKING =================
  const handleSubmitBooking = async () => {
    setLoading(true);

    try {
      const charger = station.chargers.find(
        (c) => c.type === formData.chargerType
      );

      if (!charger) {
        alert("Selected charger not available");
        return;
      }

      const bookingPayload = {
        stationOCMId: station.ocmId,
        stationSnapshot: {
          name: station.name,
          address: station.address,
          chargerType: charger.type,
          power: charger.power,
          pricePerUnit: charger.pricePerUnit,
        },
        vehicleId: formData.vehicleId,
        startTime: `${formData.date}T${formData.timeSlot}:00`,
        duration: Number(formData.duration),
      };

      const response = await api.post("/api/bookings", bookingPayload);
      setBookingConfirmed(true);
    } catch (error) {
      console.error("Booking error:", error);
      const msg = error.response?.data?.message || "Booking failed. Please try again.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  if (fetchingStation) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center font-[Outfit] transition-colors duration-300">
        <div className="text-center">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 font-medium transition-colors">Loading station details...</p>
        </div>
      </div>
    );
  }

  if (!station) {
     return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center font-[Outfit]">
           <div className="text-center">
              <p className="text-red-500 font-medium text-lg">Failed to load station details.</p>
              <button onClick={() => navigate(-1)} className="mt-4 text-blue-600 hover:underline">Go Back</button>
           </div>
        </div>
     )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 md:p-8 font-[Outfit] relative overflow-hidden transition-colors duration-300">
        {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-[100px] pointer-events-none"></div>
      
      <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         className="w-full max-w-5xl relative z-10"
      >
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-8">
            <button 
               onClick={() => navigate(-1)}
               className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 dark:border-gray-700 shadow-sm hover:shadow-md"
            >
                <ArrowLeft className="w-4 h-4" />
                <span className="font-medium">Back to Map</span>
            </button>
            <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    CP
                </div>
                <span className="font-bold text-gray-900 dark:text-white tracking-tight transition-colors">ChargePilot</span>
            </div>
        </div>

        {bookingConfirmed ? (
          <BookingConfirmation
            station={station}
            formData={formData}
            calculatePrice={calculatePrice}
            navigate={navigate}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
             {/* Left Column - Steps */}
            <div className="lg:col-span-8 space-y-6">
                <BookingProgress step={step} />

                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700 rounded-3xl p-6 md:p-8 shadow-xl shadow-blue-900/5 transition-colors duration-300">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {step === 1 && (
                                <BookingStep1
                                    formData={formData}
                                    userVehicles={userVehicles}
                                    onChange={handleChange}
                                />
                            )}
                            {step === 2 && (
                                <BookingStep2
                                    formData={formData}
                                    station={station}
                                    onChange={handleChange}
                                />
                            )}
                            {step === 3 && (
                                <BookingStep3
                                    formData={formData}
                                    station={station}
                                    calculatePrice={calculatePrice}
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
                
                <div className="flex justify-between items-center bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-4 rounded-2xl border border-white/40 dark:border-gray-700 shadow-sm transition-colors duration-300">
                    <button 
                        onClick={handlePrevious}
                        disabled={step === 1}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all ${step === 1 ? "opacity-0 pointer-events-none" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}
                    >
                        Back
                    </button>
                    
                    <button 
                        onClick={handleNext}
                        className="flex items-center space-x-2 bg-gray-900 dark:bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 dark:hover:bg-blue-700 transition-all shadow-lg shadow-gray-900/20 active:scale-95 hover:-translate-y-0.5"
                    >
                         <span>{step === 3 ? "Confirm Booking" : "Continue"}</span>
                         {step === 3 ? <CheckCircle2 className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    </button>
                </div>
            </div>

            {/* Right Column - Summary Card */}
            <div className="lg:col-span-4">
               <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl shadow-blue-900/5 border border-gray-100 dark:border-gray-700 sticky top-4 transition-colors duration-300">
                  <div className="flex items-start justify-between mb-6">
                      <div>
                          <p className="text-sm font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase mb-1 transition-colors">Station</p>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight transition-colors">{station.name}</h3>
                      </div>
                      <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center transition-colors">
                          <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                  </div>
                  
                  <div className="space-y-4 py-4 border-t border-b border-gray-100 dark:border-gray-700 transition-colors">
                      <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400 text-sm transition-colors">Charger</span>
                          <span className="font-semibold text-gray-900 dark:text-white transition-colors">{formData.chargerType}</span>
                      </div>
                      <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400 text-sm transition-colors">Duration</span>
                          <span className="font-semibold text-gray-900 dark:text-white transition-colors">{formData.duration} hr</span>
                      </div>
                      {step === 3 && (
                           <div className="flex justify-between">
                                <span className="text-gray-500 dark:text-gray-400 text-sm transition-colors">Rate</span>
                                <span className="font-semibold text-gray-900 dark:text-white transition-colors">₹{station.chargers.find(c => c.type === formData.chargerType)?.pricePerUnit}/kWh</span>
                            </div>
                      )}
                  </div>

                  <div className="mt-6">
                      <div className="flex justify-between items-end mb-2">
                          <span className="text-gray-500 dark:text-gray-400 font-medium transition-colors">Total Est.</span>
                          <span className="text-3xl font-bold text-gray-900 dark:text-white transition-colors">₹{calculatePrice() || "0"}</span>
                      </div>
                  </div>
               </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default BookingForm;
