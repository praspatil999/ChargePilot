import { Car } from "lucide-react";

export default function VehicleCard({
  model,
  battery,
  efficiency,
  connector,
  isDefault = false,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6
      hover:-translate-y-1 transition-all relative">

      {isDefault && (
        <span className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full
          bg-gradient-to-r from-blue-600 to-emerald-600 text-white">
          Default
        </span>
      )}

      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <Car />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">
          {model}
        </h3>
      </div>

      <p className="text-sm text-gray-600">Battery: {battery}</p>
      <p className="text-sm text-gray-600">Efficiency: {efficiency}</p>
      <p className="text-sm text-gray-600">Connector: {connector}</p>
    </div>
  );
}
