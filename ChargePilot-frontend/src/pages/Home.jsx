import React, { useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Homepage/Hero";
import Features from "../components/Homepage/features";
import HowItWorks from "../components/Homepage/HowItWorks";
import MapPreview from "../components/Homepage/MapView";
import CTA from "../components/Homepage/CTA";
import Footer from "../components/Footer";
import DarkModeContext from "../context/DarkModeContext";

export default function Home() {
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`min-h-screen ${darkMode ? "dark bg-gray-900" : "bg-white"} font-[Outfit] transition-colors duration-300`}>
      <Navbar />
      <main className="flex flex-col">
        <Hero darkMode={darkMode} />
        <Features darkMode={darkMode} />
        <HowItWorks darkMode={darkMode} />
        <MapPreview darkMode={darkMode} />
        <CTA darkMode={darkMode} />
      </main>
      <Footer darkMode={darkMode} />
    </div>
  );
}
