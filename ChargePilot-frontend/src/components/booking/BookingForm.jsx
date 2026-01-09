import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import BookingHeader from "./BookingHeader";
import BookingProgress from "./BookingProgress";
import BookingStep1 from "./BookingStep1";
import BookingStep2 from "./BookingStep2";
import BookingStep3 from "./BookingStep3";
import BookingConfirmation from "./BookingConfirmation";
import BatteryHealthRecommendation from "./BatteryHealthRecommendation";

const BookingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const [station, setStation] = useState(null);
  const [userVehicles, setUserVehicles] = useState([]);

  // 🔋 Battery + SOC state (SOURCE OF TRUTH)
  const [batteryHealth, setBatteryHealth] = useState(90); // SOH
  const [currentCharge, setCurrentCharge] = useState(40); // SOC
  const [targetCharge, setTargetCharge] = useState(80);   // SOC
  const [chargingSpeed, setChargingSpeed] = useState("fast");

  const [formData, setFormData] = useState({
    stationId: id,
    vehicleId: "",
    chargerType: "DC",
    date: "",
    timeSlot: "",
    duration: "1",
  });

  /* --------------------------------------------------
     FETCH STATION
  -------------------------------------------------- */
  useEffect(() => {
    fetchStationDetails();
    fetchUserVehicles();
  }, [id]);

  const fetchStationDetails = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/stations/${id}`
      );
      const data = res.data;

      setStation({
        _id: data.ID,
        name: data.AddressInfo?.Title || "Charging Station",
        address: `${data.AddressInfo?.AddressLine1 || ""}, ${
          data.AddressInfo?.Town || ""
        }`,
        chargers: data.Connections.map((c) => ({
          type: c.CurrentType?.Title === "DC" ? "DC" : "AC",
          power: c.PowerKW || 50,
          pricePerUnit: 15,
        })),
      });
    } catch {
      alert("Station not found");
    }
  };

  const fetchUserVehicles = async () => {
    setUserVehicles([
      { _id: "veh1", model: "Tata Nexon EV" },
      { _id: "veh2", model: "MG ZS EV" },
    ]);
  };

  /* --------------------------------------------------
     HELPERS
  -------------------------------------------------- */
  const calculatePrice = () => {
    if (!station) return 0;
    const charger = station.chargers.find(
      (c) => c.type === formData.chargerType
    );
    return (
      (charger?.power || 50) *
      (charger?.pricePerUnit || 15) *
      Number(formData.duration)
    ).toFixed(2);
  };

  const handleOptimalSettingsApply = (speed) => {
    setChargingSpeed(speed);
    setFormData((prev) => ({
      ...prev,
      chargerType: speed === "slow" ? "AC" : "DC",
    }));
  };

  /* --------------------------------------------------
     NAVIGATION
  -------------------------------------------------- */
  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else handleSubmitBooking();
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  /* --------------------------------------------------
     SUBMIT BOOKING
  -------------------------------------------------- */
  const handleSubmitBooking = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:8080/api/bookings/create", {
        ...formData,
        batteryHealth,
        currentCharge,
        targetCharge,
        chargingSpeed,
      });
      setBookingConfirmed(true);
    } catch {
      alert("Booking failed");
    } finally {
      setLoading(false);
    }
  };

  if (!station) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading station details...
      </div>
    );
  }

  /* --------------------------------------------------
     RENDER
  -------------------------------------------------- */
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
              {step === 1 && (
                <BookingStep1
                  formData={formData}
                  userVehicles={userVehicles}
                  onChange={(n, v) =>
                    setFormData((p) => ({ ...p, [n]: v }))
                  }
                />
              )}
              {step === 2 && (
                <BookingStep2
                  formData={formData}
                  station={station}
                  onChange={(n, v) =>
                    setFormData((p) => ({ ...p, [n]: v }))
                  }
                />
              )}
              {step === 3 && (
                <BookingStep3
                  formData={formData}
                  station={station}
                  calculatePrice={calculatePrice}
                />
              )}

              {/* 🔋 BATTERY HEALTH + SOC */}
              <BatteryHealthRecommendation
                batteryHealth={batteryHealth}
                currentCharge={currentCharge}
                targetCharge={targetCharge}
                chargingSpeed={chargingSpeed}
                setCurrentCharge={setCurrentCharge}   // ✅ FIX
                setTargetCharge={setTargetCharge}     // ✅ FIX
                onOptimalSettingsApply={handleOptimalSettingsApply}
              />
            </div>

            <div className="flex justify-between">
              {step > 1 && (
                <button onClick={handlePrevious}>Previous</button>
              )}
              <button onClick={handleNext} disabled={loading}>
                {step === 3
                  ? `Confirm Booking ₹${calculatePrice()}`
                  : "Continue"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
