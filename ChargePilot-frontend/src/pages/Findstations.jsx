import React, { useState } from "react";
import MapSection from "../components/FindStations/mapSection";
import LocationInput from "../components/FindStations/LocationInput";
import FiltersSection from "../components/FindStations/FilterSection";
import StationCard from "../components/FindStations/Stationcards";
import StationCards from "../components/FindStations/StationCard";
import PageHeader from "../components/FindStations/PageHeader";
import { mockStations } from "../init/mockStations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShowStations from "../components/FindStations/Showstations";

export default function FindStations() {
  // const [location, setLocation] = useState("");
  // const [showStations, setShowStations] = useState(false);
  // const [chargerType, setChargerType] = useState("all");
  // const [sortBy, setSortBy] = useState("nearest");
  // const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  // const handleFindStations = () => {
  //   if (location.trim()) {
  //     setShowStations(true);
  //   }
  // };

  // const handleDetectLocation = () => {
  //   setIsDetectingLocation(true);
  //   setTimeout(() => {
  //     setLocation("Current Location (Bhiwandi, Maharashtra)");
  //     setIsDetectingLocation(false);
  //     setShowStations(true);
  //   }, 1500);
  // };

  // const filteredStations = mockStations
  //   .filter(
  //     (station) => chargerType === "all" || station.chargerType === chargerType
  //   )
  //   .sort((a, b) => {
  //     if (sortBy === "nearest") return a.distance - b.distance;
  //     if (sortBy === "cheapest") return a.pricePerKwh - b.pricePerKwh;
  //     if (sortBy === "fastest")
  //       return parseInt(b.chargingSpeed) - parseInt(a.chargingSpeed);
  //     return 0;
  //   });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar></Navbar>
      <PageHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* {!showStations ? (
          <LocationInput
            location={location}
            setLocation={setLocation}
            handleFindStations={handleFindStations}
            handleDetectLocation={handleDetectLocation}
            isDetectingLocation={isDetectingLocation}
          />
        ) : (
          <>
            <FiltersSection
              chargerType={chargerType}
              setChargerType={setChargerType}
              sortBy={sortBy}
              setSortBy={setSortBy}
              setShowStations={setShowStations}
            />

            <StationCards filteredStations={filteredStations} />
          </>
        )} */}
        {/* <MapSection
          showStations={showStations}
          location={location}
          filteredStations={filteredStations}
        /> */}
        <ShowStations />
      </div>
      <Footer></Footer>
    </div>
  );
}
