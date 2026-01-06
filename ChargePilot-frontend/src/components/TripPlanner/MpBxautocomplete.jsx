// components/MapboxAutocomplete.js
import React, { useState, useRef, useEffect } from "react";
import { MapPin, Search, AlertCircle } from "lucide-react";

const MapboxAutocomplete = ({
  placeholder,
  value,
  onChange,
  onCoordinatesSelect,
  type = "source",
  className = "",
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // IMPORTANT: Add your Mapbox token here
  const MAPBOX_TOKEN = import.meta.env.VITE_MAP_TOKEN;
  // OR better: store in .env file as REACT_APP_MAPBOX_TOKEN

  // Check if token is valid
  const isValidToken = MAPBOX_TOKEN && MAPBOX_TOKEN.startsWith("pk.");

  // Fetch suggestions from Mapbox API
  const fetchSuggestions = async (query) => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    if (!isValidToken) {
      setError("Mapbox token not configured. Please add your token.");
      setSuggestions([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        query
      )}.json?access_token=${MAPBOX_TOKEN}&country=in&autocomplete=true&limit=5`;

      console.log("Fetching from:", url);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.features && data.features.length > 0) {
        setSuggestions(data.features);
        setShowDropdown(true);
      } else {
        setSuggestions([]);
        setShowDropdown(true);
      }
    } catch (error) {
      console.error("Mapbox API error:", error);
      setError(`Failed to fetch locations: ${error.message}`);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchSuggestions(value);
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [value]);

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion) => {
    const address = suggestion.place_name;
    const coordinates = suggestion.center; // [longitude, latitude]

    onChange(address);
    onCoordinatesSelect(coordinates);
    setShowDropdown(false);
    setSuggestions([]);

    console.log(`${type} selected:`, {
      address,
      coordinates,
      fullData: suggestion,
    });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get border color based on type
  const getBorderColor = () => {
    if (error) return "border-red-300";
    return type === "source" ? "border-emerald-200" : "border-blue-200";
  };

  // Get background color based on type
  const getBgColor = () => {
    if (error) return "bg-red-50/50";
    return type === "source" ? "bg-emerald-50/50" : "bg-blue-50/50";
  };

  // Get icon color based on type
  const getIconColor = () => {
    if (error) return "text-red-500";
    return type === "source" ? "text-emerald-600" : "text-blue-600";
  };

  // Test with sample data if no token
  const handleUseSampleData = () => {
    const sampleData = [
      {
        id: "1",
        place_name: "Mumbai, Maharashtra, India",
        center: [72.8777, 19.076],
        properties: { category: "city" },
      },
      {
        id: "2",
        place_name: "Delhi, India",
        center: [77.1025, 28.7041],
        properties: { category: "city" },
      },
      {
        id: "3",
        place_name: "Bangalore, Karnataka, India",
        center: [77.5946, 12.9716],
        properties: { category: "city" },
      },
    ];

    setSuggestions(sampleData);
    setShowDropdown(true);
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            if (!showDropdown) setShowDropdown(true);
          }}
          onFocus={() => {
            if (value.length >= 2) setShowDropdown(true);
          }}
          className={`w-full pl-12 pr-10 py-4 border-2 rounded-xl focus:ring-4 outline-none transition-all text-lg ${getBorderColor()} ${getBgColor()} focus:border-emerald-500 ${className}`}
          autoComplete="off"
        />
        <MapPin
          className={`w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 ${getIconColor()}`}
        />
        {loading && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Token Error Message */}
      {!isValidToken && (
        <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-yellow-800">
                <strong>Mapbox token not configured.</strong> Please add your
                Mapbox access token.
              </p>
              <button
                onClick={handleUseSampleData}
                className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Use sample locations for testing →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* Suggestions Dropdown */}
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-white rounded-xl shadow-xl border border-gray-200 max-h-64 overflow-y-auto"
        >
          {loading ? (
            <div className="p-4 text-center">
              <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
              <p className="text-sm text-gray-500 mt-2">
                Searching locations...
              </p>
            </div>
          ) : suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <button
                key={suggestion.id || index}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                  index !== suggestions.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">
                      {suggestion.place_name}
                    </p>
                    {suggestion.properties?.category && (
                      <p className="text-sm text-gray-500 mt-1">
                        {suggestion.properties.category}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">
                      Coordinates: {suggestion.center[1].toFixed(4)},{" "}
                      {suggestion.center[0].toFixed(4)}
                    </p>
                  </div>
                </div>
              </button>
            ))
          ) : value.length >= 2 ? (
            <div className="p-6 text-center">
              <Search className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">No locations found</p>
              <p className="text-sm text-gray-400 mt-1">
                Try a different search term
              </p>
              {!isValidToken && (
                <button
                  onClick={handleUseSampleData}
                  className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Use sample locations instead
                </button>
              )}
            </div>
          ) : null}
        </div>
      )}

      {/* Quick Test Buttons */}
      {!isValidToken && (
        <div className="mt-3">
          <p className="text-xs text-gray-500 mb-2">
            Quick test (sample data):
          </p>
          <div className="flex flex-wrap gap-2">
            {["Mumbai", "Delhi", "Bangalore"].map((city) => (
              <button
                key={city}
                onClick={() => {
                  onChange(`${city}, India`);
                  const mockCoords = {
                    Mumbai: [72.8777, 19.076],
                    Delhi: [77.1025, 28.7041],
                    Bangalore: [77.5946, 12.9716],
                  };
                  handleCoordinatesUpdate(mockCoords[city]);
                }}
                className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MapboxAutocomplete;
