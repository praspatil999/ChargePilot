import React, { useState } from "react";
import { MapPin, Crosshair, Search } from "lucide-react";
import "mapbox-gl/dist/mapbox-gl.css";

const OPEN_CHARGER_API_KEY = import.meta.env.VITE_OPEN_CHARGER_API_KEY;

const LocationInput = ({ onStationsFetched, compact = false }) => {
  const [loading, setLoading] = useState(false);
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");

  const popularCities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Hyderabad",
    "Pune",
  ];

  // Function to fetch stations by coordinates using browser Geolocation API
  const fetchStations = async (latitude, longitude) => {
    try {
      console.log("Fetching stations for:", latitude, longitude);

      const url = `https://api.openchargemap.io/v3/poi/?latitude=${latitude}&longitude=${longitude}&distance=200&distanceunit=KM&maxresults=50&countrycode=IN&key=${OPEN_CHARGER_API_KEY}`;

      console.log("API URL:", url);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched stations:", data);
      return data;
    } catch (error) {
      console.error("Error fetching stations:", error);
      throw error;
    }
  };

  // Function to get current location using browser's Geolocation API
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser"));
        return;
      }

      setDetectingLocation(true);
      setStatus("Detecting your location...");

      // Configure geolocation options
      const options = {
        enableHighAccuracy: true, // Use GPS if available
        timeout: 10000, // 10 seconds timeout
        maximumAge: 0, // Don't use cached position
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Geolocation success:", position);
          resolve(position);
        },
        (error) => {
          console.error("Geolocation error:", error);
          let errorMessage = "Unable to retrieve location.";

          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage =
                "Location permission denied. Please allow location access in your browser settings.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage =
                "Location information is unavailable. Please check your GPS/Wi-Fi connection.";
              break;
            case error.TIMEOUT:
              errorMessage = "Location request timed out. Please try again.";
              break;
            default:
              errorMessage =
                "An unknown error occurred while getting your location.";
          }

          reject(new Error(errorMessage));
        },
        options
      );
    });
  };

  // Get coordinates from popular cities (fallback for manual search)
  const getCoordinatesFromCity = (cityName) => {
    const cityCoordinates = {
      Mumbai: { latitude: 19.076, longitude: 72.8777 },
      Delhi: { latitude: 28.7041, longitude: 77.1025 },
      Bangalore: { latitude: 12.9716, longitude: 77.5946 },
      Chennai: { latitude: 13.0827, longitude: 80.2707 },
      Hyderabad: { latitude: 17.385, longitude: 78.4867 },
      Pune: { latitude: 18.5204, longitude: 73.8567 },
    };

    return cityCoordinates[cityName] || null;
  };

  // Main function to handle station fetching
  const handleFetchStations = async (useCurrentLocation = false) => {
    setLoading(true);
    setStatus("Searching for charging stations...");

    try {
      let latitude, longitude;
      let locationName = "";

      if (useCurrentLocation) {
        // Get current location using browser's Geolocation API
        setDetectingLocation(true);
        const position = await getCurrentLocation();
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        locationName = "Your Current Location";

        // Update the input field with approximate location
        setLocation("Current Location");
      } else if (location.trim()) {
        // Check if it's a popular city
        const cityCoords = getCoordinatesFromCity(location.trim());

        if (cityCoords) {
          latitude = cityCoords.latitude;
          longitude = cityCoords.longitude;
          locationName = location.trim();
        } else {
          // For other locations, you would need a geocoding API
          // For now, use Delhi as fallback
          setStatus(
            "Using Delhi as default location. For other locations, please use current location."
          );
          latitude = 28.7041;
          longitude = 77.1025;
          locationName = "Delhi (Default)";
        }
      } else {
        throw new Error("Please enter a location or use current location");
      }

      console.log(
        `Fetching stations near: ${locationName} (${latitude}, ${longitude})`
      );

      // Fetch stations from OpenChargeMap API
      const stations = await fetchStations(latitude, longitude);

      // Process stations data
      const processedStations = stations.map((station) => ({
        id: station.ID || Math.random(),
        name: station.AddressInfo?.Title || "Unnamed Station",
        address: station.AddressInfo?.AddressLine1 || "Address not available",
        city: station.AddressInfo?.Town || "Unknown City",
        latitude: station.AddressInfo?.Latitude,
        longitude: station.AddressInfo?.Longitude,
        connectors: station.Connections || [],
        operator: station.OperatorInfo?.Title || "Unknown Operator",
        distance: station.AddressInfo?.Distance || 0,
      }));

      console.log(`Found ${processedStations.length} stations`);

      // Pass stations and location info to parent component
      if (onStationsFetched && typeof onStationsFetched === "function") {
        onStationsFetched({
          stations: processedStations,
          center: { latitude, longitude },
          locationName,
          total: processedStations.length,
        });
      }

      setStatus(
        `Found ${processedStations.length} charging stations near ${locationName}`
      );
    } catch (error) {
      console.error("Error in handleFetchStations:", error);
      setStatus(`Error: ${error.message}`);
    } finally {
      setLoading(false);
      setDetectingLocation(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && location.trim() && !loading) {
      handleFetchStations(false);
    }
  };

  // Handle popular city selection
  const handlePopularCityClick = (city) => {
    setLocation(city);
    // Optionally fetch immediately
    setTimeout(() => handleFetchStations(false), 100);
  };

  return (
    <div className={compact ? "w-full" : "max-w-2xl mx-auto mb-8 animate-slide-up"}>
      <div className={compact ? "" : "bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl shadow-blue-100/50 dark:shadow-blue-900/10 border border-white dark:border-gray-700 transition-colors duration-300"}>
        {!compact && (
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Search className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">
              Find EV Charging Stations
            </h2>
            <p className="text-gray-600 dark:text-gray-400 transition-colors">
              Discover charging points near you using browser location
            </p>
          </div>
        )}

        <div className={compact ? "flex flex-col md:flex-row gap-3" : "space-y-6"}>
          {/* Location Input */}
          <div className={`relative group ${compact ? "flex-1" : ""}`}>
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
              <MapPin className={`text-gray-400 group-focus-within:text-blue-500 transition-colors ${compact ? "w-5 h-5" : "w-6 h-6"}`} />
            </div>
            <input
              type="text"
              placeholder={compact ? "Enter city or location..." : "Enter city name or click 'Use Current Location'"}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyPress={handleKeyPress}
              className={`w-full pl-12 pr-4 border-2 border-gray-200 dark:border-gray-600 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-gray-50/50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 group-hover:bg-white dark:group-hover:bg-gray-700 group-hover:border-blue-300 dark:group-hover:border-blue-500 ${compact ? "py-2.5 rounded-xl text-sm" : "py-5 rounded-2xl text-lg"}`}
              disabled={loading}
            />
          </div>

          <div className={`flex gap-3 ${compact ? "w-full md:w-auto" : "flex-col"}`}>
            {/* Find Stations Button */}
            <button
              onClick={() => handleFetchStations(false)}
              disabled={loading || !location.trim()}
              className={`bg-gradient-to-r from-blue-600 to-emerald-600 text-white hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-1 active:translate-y-0 flex items-center justify-center space-x-2 group ${compact ? "px-5 py-2.5 rounded-xl text-sm whitespace-nowrap" : "w-full px-6 py-5 rounded-2xl text-lg"}`}
            >
              <span>{loading && !detectingLocation ? "..." : "Search"}</span>
              {!loading && !compact && (
                 <div className="group-hover:translate-x-1 transition-transform">
                  <Search className="w-5 h-5" />
                </div>
              )}
            </button>

             {/* Use Current Location Button */}
            <button
              onClick={() => handleFetchStations(true)}
              disabled={loading}
              className={`bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-1 active:translate-y-0 flex items-center justify-center space-x-2 group ${compact ? "px-4 py-2.5 rounded-xl text-sm" : "w-full px-6 py-5 rounded-2xl text-lg"}`}
              title="Use Current Location"
            >
              <Crosshair className={`w-5 h-5 ${detectingLocation ? "animate-spin" : ""}`} />
              {!compact && <span>{detectingLocation ? "Accessing..." : "Use Browser Location"}</span>}
            </button>
          </div>

          {!compact && (
            <>
               {/* Status Message */}
              {status && (
                <div
                  className={`text-center p-3 rounded-xl text-sm font-medium ${
                    status.includes("Error:") ||
                    status.includes("denied") ||
                    status.includes("unavailable")
                      ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                      : status.includes("Found")
                      ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                      : "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                  }`}
                >
                  {status}
                </div>
              )}

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-medium transition-colors">
                    OR
                  </span>
                </div>
              </div>

               <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2 transition-colors">
                <p>
                  Clicking "Use Browser Location" will request permission to access
                  your device's location
                </p>
              </div>

              {/* Popular Cities */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700 transition-colors">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 transition-colors">
                  Popular Indian Cities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularCities.map((city) => (
                    <button
                      key={city}
                      onClick={() => handlePopularCityClick(city)}
                      disabled={loading}
                      className="px-4 py-2 bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-900/30 dark:to-emerald-900/30 text-blue-700 dark:text-blue-300 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/50 hover:scale-105 transition-all duration-200 text-sm font-medium disabled:opacity-50 border border-blue-100 dark:border-blue-900/50"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationInput;
