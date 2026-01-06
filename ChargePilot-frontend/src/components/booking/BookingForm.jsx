// components/booking/BookingForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import BookingHeader from "./BookingHeader";
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

  const [formData, setFormData] = useState({
    stationOCMId: id, // ✅ renamed
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
      const response = await axios.get(
        `http://localhost:8080/api/stations/${id}`,
        { withCredentials: true }
      );

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
    }
  };

  // ================= FETCH VEHICLES =================
  const fetchUserVehicles = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/vehicles`,
        {
          withCredentials: true,
        }
      );
      console.log("I am in the fetchUserVehcicles");
      
      console.log(`Vehicles at bookingForm :  ${response.data}`);
      setUserVehicles(response.data.vehicles || []);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
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

        // ✅ REQUIRED by backend
        stationSnapshot: {
          name: station.name,
          address: station.address,
          chargerType: charger.type,
          power: charger.power,
          pricePerUnit: charger.pricePerUnit,
        },

        vehicleId: formData.vehicleId,
        startTime: `${formData.date}T${formData.timeSlot}:00`,
        duration: Number(formData.duration), // ✅ force number
      };

      const response = await api.post("/api/bookings", bookingPayload);

      console.log("Booking success:", response.data);
      setBookingConfirmed(true);
    } catch (error) {
      console.error("Booking error:", error);
      alert("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ================= RENDER =================
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
    return <div className="text-center p-10">Loading station…</div>;
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
              {step > 1 && <button onClick={handlePrevious}>Previous</button>}
              <button onClick={handleNext}>
                {step === 3
                  ? `Confirm Booking - ₹${calculatePrice()}`
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
