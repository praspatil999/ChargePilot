import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import FindStations from "./pages/Findstations";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BookingForm from "./components/booking/BookingForm";
import TripPlanningUI from "./components/TripPlanner/TripPlanner";
import Profile from "./pages/Profile";
import MyBookings from "./pages/MyBookings";
import Settings from "./pages/Settings";
import DarkModeContext from "./context/DarkModeContext";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Default to dark mode
    const saved = localStorage.getItem("darkMode");
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      <div className={darkMode ? "dark bg-gray-900" : "bg-white"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/findStations" element={<FindStations />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/book/:id" element={<BookingForm />} />
          <Route path="/trip-planner" element={<TripPlanningUI />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </DarkModeContext.Provider>
  );
}

export default App;
