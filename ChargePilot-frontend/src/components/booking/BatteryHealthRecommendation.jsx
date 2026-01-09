import React, { useEffect, useState } from "react";
import { batteryHealthService } from "../../services/batteryHealthService";
import { AlertCircle, CheckCircle, AlertTriangle } from "lucide-react";

const BatteryHealthRecommendation = ({
  batteryHealth = 90,
  currentCharge = 40,
  targetCharge = 80,
  chargingSpeed = "fast",
  setCurrentCharge,
  setTargetCharge,
  onOptimalSettingsApply,
}) => {
  const [recommendation, setRecommendation] = useState(null);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const rec = batteryHealthService.getChargingRecommendation(
      batteryHealth,
      currentCharge,
      targetCharge,
      chargingSpeed
    );
    setRecommendation(rec);
    setApplied(false);
  }, [batteryHealth, currentCharge, targetCharge, chargingSpeed]);

  if (!recommendation) return null;

  const energyPercent = Math.max(targetCharge - currentCharge, 0);
  const energyKWh = (energyPercent * 0.6).toFixed(1);

  const getRiskColor = () => {
    switch (recommendation.riskLevel) {
      case "high":
        return "#ef4444";
      case "medium":
        return "#f97316";
      case "low":
        return "#22c55e";
      default:
        return "#6b7280";
    }
  };

  const getHealthStatus = () => {
    if (batteryHealth >= 90) {
      return {
        icon: CheckCircle,
        color: "#22c55e",
        label: "Excellent",
        description: "Battery is in optimal condition",
      };
    } else if (batteryHealth >= 80) {
      return {
        icon: CheckCircle,
        color: "#84cc16",
        label: "Good",
        description: "Battery health is normal for typical usage",
      };
    } else if (batteryHealth >= 70) {
      return {
        icon: AlertTriangle,
        color: "#f97316",
        label: "Fair",
        description: "Battery shows moderate degradation",
      };
    } else if (batteryHealth >= 60) {
      return {
        icon: AlertTriangle,
        color: "#fb923c",
        label: "Poor",
        description: "Battery needs careful management",
      };
    } else {
      return {
        icon: AlertCircle,
        color: "#ef4444",
        label: "Critical",
        description: "Battery requires immediate attention",
      };
    }
  };

  const handleApplyOptimal = () => {
    setTargetCharge(recommendation.optimalTarget);

    if (onOptimalSettingsApply) {
      onOptimalSettingsApply(recommendation.optimalSpeed);
    }

    setApplied(true);
    setTimeout(() => setApplied(false), 3000);
  };

  const healthStatus = getHealthStatus();
  const HealthIcon = healthStatus.icon;

  return (
    <div
      style={{
        border: `2px solid ${getRiskColor()}`,
        borderRadius: "14px",
        padding: "20px",
        marginTop: "20px",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        <span style={{ fontSize: "28px" }}>
          {recommendation.riskLevel === "high"
            ? "⚠️"
            : recommendation.riskLevel === "medium"
            ? "⚡"
            : "✅"}
        </span>
        <div>
          <h3
            style={{
              margin: 0,
              fontWeight: "700",
              fontSize: "18px",
              color: getRiskColor(),
            }}
          >
            {recommendation.riskLevel === "high"
              ? "High Battery Stress"
              : recommendation.riskLevel === "medium"
              ? "Moderate Battery Stress"
              : "Optimal Charging Pattern"}
          </h3>
          <p
            style={{
              margin: "4px 0 0 0",
              fontSize: "13px",
              color: "#6b7280",
            }}
          >
            {recommendation.message}
          </p>
        </div>
      </div>

      {/* SOH Display with Health Indicator */}
      <div
        style={{
          backgroundColor: "#f9fafb",
          padding: "16px",
          borderRadius: "12px",
          marginBottom: "16px",
          border: `2px solid ${healthStatus.color}20`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#374151",
              }}
            >
             Battery SOH (State of Health)
            </span>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                backgroundColor: `${healthStatus.color}15`,
                padding: "4px 10px",
                borderRadius: "20px",
                border: `1px solid ${healthStatus.color}30`,
              }}
            >
              <HealthIcon
                style={{ width: "14px", height: "14px", color: healthStatus.color }}
              />
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  color: healthStatus.color,
                }}
              >
                {healthStatus.label}
              </span>
            </div>
          </div>
          <span
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: healthStatus.color,
            }}
          >
            {batteryHealth}%
          </span>
        </div>

        {/* Progress Bar */}
        {/* <div
          style={{
            width: "100%",
            height: "12px",
            backgroundColor: "#e5e7eb",
            borderRadius: "6px",
            overflow: "hidden",
            marginBottom: "8px",
          }}
        > */}
          <div
            style={{
              width: `${batteryHealth}%`,
              height: "100%",
              background: `linear-gradient(90deg, ${healthStatus.color} 0%, ${healthStatus.color}dd 100%)`,
              transition: "width 0.3s ease",
            }}
          />
        </div>

        {/* Health Scale */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "4px",
            marginBottom: "12px",
          }}
        >
          {[
            { min: 90, label: "Excellent", color: "#22c55e" },
            { min: 80, label: "Good", color: "#84cc16" },
            { min: 70, label: "Fair", color: "#f97316" },
            { min: 60, label: "Poor", color: "#fb923c" },
            { min: 50, label: "Critical", color: "#ef4444" },
          ].map((range, idx) => (
            <div
              key={idx}
              style={{
                textAlign: "center",
                padding: "6px 4px",
                borderRadius: "6px",
                backgroundColor:
                  batteryHealth >= range.min ? `${range.color}15` : "#f3f4f6",
                border: `1px solid ${
                  batteryHealth >= range.min ? `${range.color}30` : "#e5e7eb"
                }`,
              }}
            >
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: "600",
                  color: batteryHealth >= range.min ? range.color : "#9ca3af",
                }}
              >
                {range.label}
              </div>
              <div
                style={{
                  fontSize: "9px",
                  color: "#6b7280",
                  marginTop: "2px",
                }}
              >
                {range.min}%+
              </div>
            </div>
          ))}
        {/* </div> */}

        {/* Health Description */}
        <p
          style={{
            margin: 0,
            fontSize: "12px",
            color: "#6b7280",
            fontStyle: "italic",
            textAlign: "center",
          }}
        >
          {healthStatus.description}
        </p>
      </div>

      {/* Current SOC Slider */}
      <div style={{ marginBottom: "16px" }}>
        <label
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "14px",
            fontWeight: "600",
            color: "#374151",
            marginBottom: "8px",
          }}
        >
          <span>🔌 Current SOC</span>
          <span style={{ color: "#3b82f6" }}>{currentCharge}%</span>
        </label>
        <input
          type="range"
          min="0"
          max="100"
          step="5"
          value={currentCharge}
          onChange={(e) => setCurrentCharge(Number(e.target.value))}
          style={{
            width: "100%",
            height: "8px",
            borderRadius: "4px",
            outline: "none",
            cursor: "pointer",
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${currentCharge}%, #e5e7eb ${currentCharge}%, #e5e7eb 100%)`,
          }}
        />
      </div>

      {/* Target SOC Slider */}
      <div style={{ marginBottom: "16px" }}>
        <label
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "14px",
            fontWeight: "600",
            color: "#374151",
            marginBottom: "8px",
          }}
        >
          <span>🎯 Target SOC</span>
          <span style={{ color: "#8b5cf6" }}>{targetCharge}%</span>
        </label>
        <input
          type="range"
          min="20"
          max="100"
          step="5"
          value={targetCharge}
          onChange={(e) => setTargetCharge(Number(e.target.value))}
          style={{
            width: "100%",
            height: "8px",
            borderRadius: "4px",
            outline: "none",
            cursor: "pointer",
            background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${targetCharge}%, #e5e7eb ${targetCharge}%, #e5e7eb 100%)`,
          }}
        />
      </div>

      {/* Energy Display */}
      <div
        style={{
          backgroundColor: "#eff6ff",
          padding: "12px",
          borderRadius: "8px",
          marginBottom: "16px",
          border: "1px solid #bfdbfe",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{ fontSize: "13px", color: "#1e40af", fontWeight: "600" }}
          >
            ⚡ Energy to Add
          </span>
          <span
            style={{ fontSize: "18px", fontWeight: "700", color: "#1e40af" }}
          >
            {energyPercent}%{" "}
            <span style={{ fontSize: "14px", fontWeight: "500" }}>
              (~{energyKWh} kWh)
            </span>
          </span>
        </div>
      </div>

      {/* Charging Tips */}
      {recommendation.tips && recommendation.tips.length > 0 && (
        <div
          style={{
            backgroundColor: "#fef3c7",
            padding: "14px",
            borderRadius: "8px",
            marginBottom: "16px",
            border: "1px solid #fde68a",
          }}
        >
          <p
            style={{
              margin: "0 0 10px 0",
              fontWeight: "600",
              fontSize: "14px",
              color: "#92400e",
            }}
          >
            💡 Recommendations
          </p>
          <ul
            style={{
              margin: 0,
              paddingLeft: "20px",
              fontSize: "13px",
              color: "#78350f",
            }}
          >
            {recommendation.tips.map((tip, idx) => (
              <li key={idx} style={{ marginBottom: "6px" }}>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Apply Optimal Button */}
      {recommendation.riskLevel !== "low" && (
        <button
          onClick={handleApplyOptimal}
          disabled={applied}
          style={{
            backgroundColor: applied ? "#22c55e" : "#2563eb",
            color: "white",
            padding: "14px 20px",
            borderRadius: "10px",
            border: "none",
            fontWeight: "700",
            cursor: applied ? "default" : "pointer",
            width: "100%",
            fontSize: "15px",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            boxShadow: applied
              ? "0 4px 12px rgba(34, 197, 94, 0.3)"
              : "0 2px 8px rgba(37, 99, 235, 0.3)",
          }}
          onMouseOver={(e) => {
            if (!applied) e.target.style.backgroundColor = "#1d4ed8";
          }}
          onMouseOut={(e) => {
            if (!applied) e.target.style.backgroundColor = "#2563eb";
          }}
        >
          {applied ? (
            <>
              <span>✅</span>
              <span>Applied Successfully!</span>
            </>
          ) : (
            <>
              <span>🎯</span>
              <span>
                Apply Optimal (Target: {recommendation.optimalTarget}%, Speed:{" "}
                {recommendation.optimalSpeed})
              </span>
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default BatteryHealthRecommendation;