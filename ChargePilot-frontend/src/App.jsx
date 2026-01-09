import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import FindStations from "./pages/Findstations";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";
import Profile from './pages/Profile';

import BookingForm from "./components/booking/BookingForm";
import TripPlanningUI from "./components/TripPlanner/TripPlanner";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/findStations" element={<FindStations />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/users" element={<UserDashboard />} />
      <Route path="/book/:id" element={<BookingForm />} />
      <Route path="/trip-planner" element={<TripPlanningUI />} />
      <Route path="/profile" element={<Profile />} /> 
    </Routes>
  );
}

export default App;
