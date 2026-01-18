import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  MapPin,
  Navigation,
  Battery,
  Zap,
  Clock,
  CircleDollarSign,
  ChevronRight,
  Car,
  Loader2,
  ChevronDown
} from "lucide-react";
import api from "../../api/axios";

// Initialize Mapbox token
// In a real app, this should be in .env
mapboxgl.accessToken =
  "pk.eyJ1IjoicHJhc2h1LTk5OSIsImEiOiJjbWo0MWV1NXcxZW9oM2NyN3g4czlxOHI5In0.laInwvn9hclMb6fHP0ONig";

const TripPlanningUI = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [calculating, setCalculating] = useState(false);
  const [tripResult, setTripResult] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    source: "",
    destination: "",
    vehicleId: "",
    batteryPercentage: 80,
  });

  // Suggestions State
  const [suggestions, setSuggestions] = useState({
    source: [],
    destination: [],
  });
  const [activeField, setActiveField] = useState(null);

  // Coords State
  const [coords, setCoords] = useState({
    source: null,
    destination: null,
  });

  useEffect(() => {
    fetchVehicles();
    initializeMap();

    return () => map.current?.remove();
  }, []);

  const initializeMap = () => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12", // Changed to streets for better visibility
      center: [78.9629, 20.5937], // India center
      zoom: 4,
    });

    // Ensure map resizes correctly
    const resizeObserver = new ResizeObserver(() => {
        map.current?.resize();
    });
    resizeObserver.observe(mapContainer.current);

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
  };

  const fetchVehicles = async () => {
    try {
      const response = await api.get("/api/vehicles");
      let vList = [];
      if (Array.isArray(response.data)) vList = response.data;
      else if (response.data.vehicles) vList = response.data.vehicles;
      
       // Handle case where vehicle might be a single object
      if (!Array.isArray(vList) && response.data.vehicle) {
          vList = [response.data.vehicle];
      }

      setVehicles(vList);
      if (vList.length > 0)
        setFormData((prev) => ({ ...prev, vehicleId: vList[0]._id }));
    } catch (error) {
      console.error("Failed to fetch vehicles", error);
    }
  };

  const handleInputChange = async (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setActiveField(field);

    if (value.length > 2) {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            value
          )}.json?country=in&access_token=${mapboxgl.accessToken}`
        );
        const data = await response.json();
        setSuggestions((prev) => ({ ...prev, [field]: data.features }));
      } catch (error) {
        console.error("Geocoding error:", error);
      }
    } else {
      setSuggestions((prev) => ({ ...prev, [field]: [] }));
    }
  };

  const selectSuggestion = (field, feature) => {
    setFormData((prev) => ({ ...prev, [field]: feature.place_name }));
    setCoords((prev) => ({ ...prev, [field]: feature.center }));
    setSuggestions((prev) => ({ ...prev, [field]: [] }));
    setActiveField(null);

    // Add marker
    new mapboxgl.Marker({ color: field === "source" ? "#10b981" : "#ef4444" })
      .setLngLat(feature.center)
      .addTo(map.current);

    // Fly to location
    map.current.flyTo({ center: feature.center, zoom: 12 });
  };

  const handlePlanTrip = async () => {
    if (
      !coords.source ||
      !coords.destination ||
      !formData.vehicleId ||
      !formData.batteryPercentage
    ) {
      alert("Please fill in all fields correctly.");
      return;
    }

    setCalculating(true);
    try {
      const payload = {
        source: {
          address: formData.source,
          coordinates: coords.source,
        },
        destination: {
          address: formData.destination,
          coordinates: coords.destination,
        },
        vehicleId: formData.vehicleId,
        batteryPercentage: Number(formData.batteryPercentage),
      };

      const response = await api.post("/api/trip/plan", payload);
      
      const tripData = response.data.data;
      setTripResult(tripData);
      drawRoute(tripData);

    } catch (error) {
      console.error("Trip planning failed:", error);
      alert(error.response?.data?.message || "Failed to plan trip");
    } finally {
      setCalculating(false);
    }
  };

  const drawRoute = (data) => {
    const routeGeoJSON = {
      type: "Feature",
      properties: {},
      geometry: data.route.geometry,
    };

    if (map.current.getSource("route")) {
      map.current.getSource("route").setData(routeGeoJSON);
    } else {
      map.current.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: routeGeoJSON,
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#3b82f6",
          "line-width": 5,
          "line-opacity": 0.8,
        },
      });
    }

    // Add charging stops
    // Add charging stops
    console.log("Drawing stops:", data.chargingAnalysis.chargingStops);
    
    data.chargingAnalysis.chargingStops.forEach((stop, index) => {
        if (!stop.location) return;

        // Use default marker for now to ensure visibility
        new mapboxgl.Marker({ color: "#eab308" }) // Yellow color for charging stops
            .setLngLat(stop.location)
            .setPopup(new mapboxgl.Popup({ offset: 25 })
                .setHTML(`
                    <div style="padding: 10px; color: black;">
                        <h3 style="font-weight: bold; margin-bottom: 5px;">${stop.stationName}</h3>
                        <p style="font-size: 14px; margin: 0;">Stop #${index + 1}</p>
                        <p style="font-size: 12px; color: #666; margin: 2px 0;">Charge: ${stop.batteryAtArrival.toFixed(0)}% → ${stop.batteryAfterCharging}%</p>
                        <p style="font-size: 12px; color: #666; margin: 0;">Cost: ₹${stop.cost.toFixed(0)}</p>
                    </div>
                `))
            .addTo(map.current);
    });

    // Fit bounds
    const bounds = new mapboxgl.LngLatBounds();
    coords.source && bounds.extend(coords.source);
    coords.destination && bounds.extend(coords.destination);
    data.chargingAnalysis.chargingStops.forEach(stop => bounds.extend(stop.location)); // include stops in bounds

    map.current.fitBounds(bounds, { padding: 50 });
  };

  return (
    <div className="flex h-[calc(100vh-80px)] font-[Outfit] bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar Controls */}
      <div className="w-[400px] shrink-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto px-6 py-8 shadow-xl z-20 transition-colors duration-300">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2 transition-colors">
          <Navigation className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          Trip Planner
        </h1>

        <div className="space-y-6">
          {/* Source Input */}
          <div className="relative z-50">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors">
              Starting Point
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.source}
                onChange={(e) => handleInputChange("source", e.target.value)}
                placeholder="Enter starting location"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
              />
            </div>
            {suggestions.source.length > 0 && activeField === "source" && (
              <ul className="absolute z-50 w-full bg-white dark:bg-gray-800 mt-1 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 max-h-60 overflow-y-auto transition-colors">
                {suggestions.source.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => selectSuggestion("source", item)}
                    className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-900 dark:text-white border-b border-gray-50 dark:border-gray-700 last:border-0 transition-colors"
                  >
                    {item.place_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Destination Input */}
          <div className="relative z-40">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors">
              Destination
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-red-500" />
              <input
                type="text"
                value={formData.destination}
                onChange={(e) =>
                  handleInputChange("destination", e.target.value)
                }
                placeholder="Enter destination"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
              />
            </div>
            {suggestions.destination.length > 0 &&
              activeField === "destination" && (
                <ul className="absolute z-50 w-full bg-white dark:bg-gray-800 mt-1 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 max-h-60 overflow-y-auto transition-colors">
                  {suggestions.destination.map((item) => (
                    <li
                      key={item.id}
                      onClick={() => selectSuggestion("destination", item)}
                      className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-900 dark:text-white border-b border-gray-50 dark:border-gray-700 last:border-0 transition-colors"
                    >
                      {item.place_name}
                    </li>
                  ))}
                </ul>
              )}
          </div>

          {/* Vehicle Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors">
              Select Vehicle
            </label>
            <div className="relative">
              <Car className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <select
                value={formData.vehicleId}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, vehicleId: e.target.value }))
                }
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none appearance-none"
              >
                {vehicles.length === 0 && <option>No vehicles found</option>}
                {vehicles.map((v) => (
                  <option key={v._id} value={v._id}>
                    {v.brand} {v.model}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Start Battery */}
          <div>
            <label className="flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors">
              <span>Start Battery</span>
              <span className="text-blue-600 dark:text-blue-400 font-bold transition-colors">
                {formData.batteryPercentage}%
              </span>
            </label>
            <div className="flex items-center gap-3">
              <Battery className="w-5 h-5 text-gray-400" />
              <input
                type="range"
                min="10"
                max="100"
                value={formData.batteryPercentage}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    batteryPercentage: e.target.value,
                  }))
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>

          {/* Plan Button */}
          <button
            onClick={handlePlanTrip}
            disabled={calculating}
            className="w-full bg-gray-900 dark:bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg shadow-gray-900/20 dark:shadow-blue-900/20 hover:bg-gray-800 dark:hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {calculating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Calculating...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" /> Plan Trip
              </>
            )}
          </button>
        </div>

        {/* Trip Stats */}
        {/* Trip Stats */}
        {tripResult && (
          <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700 animate-fade-in space-y-4 transition-colors">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 transition-colors">Trip Summary</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl transition-colors">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold mb-1 transition-colors">
                  Distance
                </p>
                <div className="flex items-center gap-1.5">
                  <Navigation className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="font-bold text-gray-900 dark:text-white transition-colors">
                    {tripResult.route.totalDistanceKm} km
                  </span>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl transition-colors">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold mb-1 transition-colors">
                  Duration
                </p>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span className="font-bold text-gray-900 dark:text-white transition-colors">
                    {tripResult.route.totalDurationHours} hrs
                  </span>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl transition-colors">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold mb-1 transition-colors">
                  Stops
                </p>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span className="font-bold text-gray-900 dark:text-white transition-colors">
                    {tripResult.chargingAnalysis.numberOfStops} stops
                  </span>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl transition-colors">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold mb-1 transition-colors">
                  Est. Cost
                </p>
                <div className="flex items-center gap-1.5">
                  <CircleDollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="font-bold text-gray-900 dark:text-white transition-colors">
                    ₹{tripResult.costBreakdown.estimatedTotalCost.toFixed(0)}
                  </span>
                </div>
              </div>
            </div>

            {/* Stops List */}
            {tripResult.chargingAnalysis.chargingStops.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 transition-colors">
                  Charging Stops
                </h4>
                <div className="space-y-3">
                  {tripResult.chargingAnalysis.chargingStops.map((stop, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 p-3 rounded-xl shadow-sm transition-colors"
                    >
                      <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 transition-colors">
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1 transition-colors">
                          {stop.stationName}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 transition-colors">
                          {stop.chargingTime.toFixed(0)} min charge • ₹
                          {stop.cost.toFixed(0)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Map Container */}
      <div className="flex-1 relative bg-gray-200 dark:bg-gray-800 z-0 transition-colors duration-300">
        <div ref={mapContainer} className="absolute inset-0 w-full h-full" />
      </div>
    </div>
  );
};

export default TripPlanningUI;
