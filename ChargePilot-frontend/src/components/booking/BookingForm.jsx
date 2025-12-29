// components/booking/BookingForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";    
import { useParams, useNavigate } from "react-router-dom";
import BookingHeader from "./BookingHeader";
import BookingProgress from "./BookingProgress";
import BookingStep1 from "./BookingStep1";
import BookingStep2 from "./BookingStep2";
import BookingStep3 from "./BookingStep3";
import BookingConfirmation from "./BookingConfirmation";

const BookingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [station, setStation] = useState(null);
  const [userVehicles, setUserVehicles] = useState([]);

  // Form state
  const [formData, setFormData] = useState({
    stationId: id,
    vehicleId: "",
    chargerType: "DC",
    date: "",
    timeSlot: "",
    duration: "1",
  });

  // Fetch station and user data
  useEffect(() => {
    fetchStationDetails();
    fetchUserVehicles();
  }, [id]);

  // API: Fetch station details
const fetchStationDetails = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/stations/${id}`,
      {
        withCredentials: true,
      }
    );

    const data = response.data;
    console.log(JSON.stringify(data));

    // Transform Open Charge Map data to match your UI needs
    const mappedStation = {
      _id: data.ID,
      name: data.AddressInfo?.Title || "Unknown Station",
      address: `${data.AddressInfo?.AddressLine1}, ${data.AddressInfo?.Town}`,
      // Map 'Connections' to your 'chargers' format
      chargers: data.Connections.map((conn) => ({
        type: conn.CurrentType?.Title === "DC" ? "DC" : "AC",
        power: conn.PowerKW || 0,
        // The API returns "0,55€/kWh". We'll try to extract the number
        pricePerUnit: parseFloat(data.UsageCost?.replace(",", ".") || 15),
        title: conn.ConnectionType?.Title,
      })),
      availablePorts: data.NumberOfPoints || 0,
    };

    setStation(mappedStation);
  } catch (error) {
    console.error("Error fetching station:", error);
  }
};


  const fetchUserVehicles = async () => {
    try {
      
      // TODO: Uncomment and implement API call
      const response = await axios.get("/api/vehicles", {
        withCredentials: true
      });
      setUserVehicles(response.data.vehicles);
      

      // Mock data - Remove when API is ready
      setUserVehicles([
        {
          _id: "veh1",
          model: "Tesla Model 3",
          connectorType: "CCS",
          maxChargingPower: 250,
        },
        {
          _id: "veh2",
          model: "Tata Nexon EV",
          connectorType: "CCS",
          maxChargingPower: 50,
        },
      ]);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  // Handle form changes
  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Navigation
  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else handleSubmitBooking();
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };


  const calculatePrice = () => {
    if (!station || !formData.duration) return 0;

    // Find the selected charger type from the mapped connections
    const charger = station.chargers.find(
      (c) => c.type === formData.chargerType
    );

    const pricePerUnit = charger?.pricePerUnit || 15;
    const power = charger?.power || 50; // Default to 50kW if not found
    const durationHours = parseFloat(formData.duration);

    // Energy (kWh) = Power (kW) * Time (h)
    const estimatedEnergy = power * durationHours;
    return (estimatedEnergy * pricePerUnit).toFixed(2);
  };

  // API: Submit booking
  const handleSubmitBooking = async () => {
    setLoading(true);

    try {
      /*
      // TODO: Uncomment and implement API call
      const bookingData = {
        stationId: formData.stationId,
        vehicleId: formData.vehicleId,
        chargerType: formData.chargerType,
        startTime: `${formData.date}T${formData.timeSlot}:00`,
        duration: formData.duration,
      };
      
      const response = await axios.post("/api/bookings", bookingData, {
        withCredentials: true
      });
      
      setBookingConfirmed(true);
      */

      // Mock success - Remove when API is ready
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setBookingConfirmed(true);
    } catch (error) {
      console.error("Booking error:", error);
      alert("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Render current step
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <BookingStep1
            formData={formData}
            userVehicles={userVehicles}
            onChange={handleChange}
          />
        );
      case 2:
        return (
          <BookingStep2
            formData={formData}
            station={station}
            onChange={handleChange}
          />
        );
      case 3:
        return (
          <BookingStep3
            formData={formData}
            station={station}
            calculatePrice={calculatePrice}
          />
        );
      default:
        return null;
    }
  };

  if (!station) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading station details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <BookingHeader navigate={navigate} />

      <div className="container mx-auto px-4 py-8">
        {bookingConfirmed ? (
          <BookingConfirmation
            station={station}
            formData={formData}
            calculatePrice={calculatePrice}
            navigate={navigate}
          />
        ) : (
          <div className="max-w-4xl mx-auto">
            <BookingProgress step={step} />

            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              {renderStep()}
            </div>

            <div className="flex justify-between">
              {step > 1 && (
                <button
                  onClick={handlePrevious}
                  disabled={loading}
                  className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all flex items-center space-x-2 disabled:opacity-50"
                >
                  <span>Previous</span>
                </button>
              )}

              <button
                onClick={handleNext}
                disabled={loading || validateStep(step)}
                className={`ml-auto px-8 py-3 rounded-xl font-semibold transition-all flex items-center space-x-2 ${
                  step === 3
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg"
                    : "bg-gradient-to-r from-blue-600 to-emerald-600 text-white hover:shadow-lg"
                } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>
                    {step === 3
                      ? `Confirm Booking - ₹${calculatePrice()}`
                      : "Continue"}
                  </span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Validation for each step
const validateStep = (step) => {
  // This should be implemented based on formData
  return false;
};

export default BookingForm;
