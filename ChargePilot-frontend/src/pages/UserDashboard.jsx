import StatCard from "../components/StatCard";
import VehicleCard from "../components/VehicleCard";
import TripCard from "../components/TripCard";

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        User Dashboard
      </h1>
      <p className="text-gray-600 mb-10">
        Your EV activity overview
      </p>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatCard title="Total Distance" value="1,240 km" />
        <StatCard title="Energy Used" value="182 kWh" />
        <StatCard title="Money Saved" value="₹3,450" />
      </div>

      {/* Vehicles */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        My Vehicles
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        <VehicleCard
          model="Tata Nexon EV"
          battery="40 kWh"
          efficiency="7 km/kWh"
          connector="CCS"
          isDefault
        />

        <VehicleCard
          model="MG ZS EV"
          battery="50 kWh"
          efficiency="6.5 km/kWh"
          connector="CCS"
        />

        <button className="bg-white rounded-2xl shadow-lg p-6
          border-2 border-dashed text-gray-500
          hover:bg-blue-50 hover:-translate-y-1 transition-all">
          + Add New Vehicle
        </button>
      </div>

      {/* Trips */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Recent Trips
      </h2>

      <div className="space-y-6">
        <TripCard
          route="Pune → Mumbai"
          distance="120 km"
          energy="18 kWh"
          duration="3h 10m"
          station="Tata Power – Lonavala"
        />

        <TripCard
          route="Pune → Nashik"
          distance="210 km"
          energy="32 kWh"
          duration="5h 20m"
          station="ChargeZone – Sinnar"
        />
      </div>
    </div>
  );
}
