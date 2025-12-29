import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Homepage/Hero";
import Features from "../components/Homepage/features";
import HowItWorks from "../components/Homepage/HowItWorks";
import MapPreview from "../components/Homepage/MapView";
import CTA from "../components/Homepage/CTA";
import Footer from "../components/Footer";
import ClickSpark from "@/components/3D Elements/ClickSpark";

export default function Home() {
  return (
    <ClickSpark
  sparkColor="#fff"
  sparkSize={10}
  sparkRadius={15}
  sparkCount={8}
  duration={400}
  >
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <MapPreview />
      <CTA />
      <Footer />
    </div>
  </ClickSpark>
  );
}
