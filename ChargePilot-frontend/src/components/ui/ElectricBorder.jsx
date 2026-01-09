import React from "react";

const ElectricBorder = ({ children }) => {
  return (
    <div
      style={{
        borderRadius: "16px",
        padding: "2px",
        background: "linear-gradient(135deg, #7c3aed, #22c55e, #3b82f6)",
        display: "inline-block",
      }}
    >
      <div
        style={{
          backgroundColor: "#0f172a",
          borderRadius: "14px",
          padding: "20px",
          position: "relative",
          zIndex: 1,
          color: "white",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ElectricBorder;
