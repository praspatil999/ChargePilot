import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FindStations from "./pages/Findstations";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BookingForm from "./components/booking/BookingForm";
import TripPlanningUI from "./components/TripPlanner/TripPlanner";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/findStations" element={<FindStations />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/book/:id" element={<BookingForm />} />
      <Route path="/trip-planner" element={<TripPlanningUI />} />
    </Routes>
  );
}

export default App;
