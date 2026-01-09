import { MapPin, BatteryCharging, Clock } from "lucide-react";

export default function TripCard({
  route,
  distance,
  energy,
  duration,
  station,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6
      hover:-translate-y-1 transition-all">

      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 text-white">
            <MapPin />
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800">
              {route}
            </p>
            <p className="text-sm text-gray-600">{distance}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <BatteryCharging className="text-blue-600" />
          {energy}
        </div>

        <div className="flex items-center gap-2">
          <Clock className="text-emerald-600" />
          {duration}
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="text-purple-600" />
          {station}
        </div>
      </div>
    </div>
  );
}
