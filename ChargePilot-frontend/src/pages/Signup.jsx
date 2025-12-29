import React, { useState } from "react";
import {
  Zap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  User,
  Car,
  Battery,
  Gauge,
  Plug,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  // User credentials
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // EV Vehicle info (optional)
  const [showVehicleInfo, setShowVehicleInfo] = useState(false);
  const [evModel, setEvModel] = useState("");
  const [batteryCapacity, setBatteryCapacity] = useState("");
  const [efficiency, setEfficiency] = useState("");
  const [connectorType, setConnectorType] = useState("");
  const [maxChargingPower, setMaxChargingPower] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Account Info, 2: Vehicle Info

const handleAccountSubmit = () => {
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  if (showVehicleInfo) {
    setStep(2);
  } else {
    // If user doesn't want to add a vehicle, submit immediately
    handleFinalSubmit();
  }
};

const handleFinalSubmit = async () => {
  setIsLoading(true);

  const userData = {
    fullName,
    email,
    password,
    // Only include vehicle data if the user opted in
    vehicle: showVehicleInfo
      ? {
          model: evModel,
          batteryCapacity: parseFloat(batteryCapacity),
          efficiency: parseFloat(efficiency),
          connectorType,
          maxChargingPower: maxChargingPower
            ? parseFloat(maxChargingPower)
            : null,
        }
      : null,
  };

  try {
    const response = await fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("isLoggedIn", "true");
      // Since your backend uses Sessions/Passport, we check for data.user
      // Or simply check if response.ok is true
      alert("Signup successful!");
      navigate("/");
    } else {
      // This catches errors like "User already exists" from your backend
      alert(data.message || "Signup failed. Please try again.");
    }
  } catch (error) {
    console.error("Connection Error:", error);
    alert("Could not connect to the server. Is the backend running?");
  } finally {
    setIsLoading(false);
  }
};

const handleKeyPress = (e) => {
  if (e.key === "Enter") {
    if (step === 1) {
      handleAccountSubmit();
    } else {
      handleFinalSubmit();
    }
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-emerald-50/30 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl"></div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center space-x-3 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <span className="text-3xl font-bold text-gray-900">
              ChargePilot
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Create Your Account
          </h1>
          <p className="text-gray-600 font-light">
            Start your smart EV charging journey today
          </p>
        </div>

        {/* Progress Indicator */}
        {showVehicleInfo && (
          <div className="flex items-center justify-center mb-8 space-x-4">
            <div
              className={`flex items-center ${
                step === 1 ? "text-blue-600" : "text-emerald-600"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${
                  step === 1
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-emerald-600 border-emerald-600 text-white"
                }`}
              >
                1
              </div>
              <span className="ml-2 font-semibold">Account</span>
            </div>
            <div
              className={`w-16 h-0.5 ${
                step === 2 ? "bg-emerald-600" : "bg-gray-300"
              }`}
            ></div>
            <div
              className={`flex items-center ${
                step === 2 ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${
                  step === 2
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-white border-gray-300"
                }`}
              >
                2
              </div>
              <span className="ml-2 font-semibold">Vehicle</span>
            </div>
          </div>
        )}

        {/* Signup Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 backdrop-blur-sm">
          {step === 1 ? (
            /* Step 1: Account Information */
            <div className="space-y-6">
              {/* Full Name Input */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-gray-900 placeholder-gray-400"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-gray-900 placeholder-gray-400"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-gray-900 placeholder-gray-400"
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Input */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-gray-900 placeholder-gray-400"
                    placeholder="Re-enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Add Vehicle Info Toggle */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <label className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center space-x-3">
                    <Car className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        Add EV Vehicle Information
                      </div>
                      <div className="text-xs text-gray-600">
                        Optional - Get personalized recommendations
                      </div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={showVehicleInfo}
                    onChange={(e) => setShowVehicleInfo(e.target.checked)}
                    className="w-5 h-5 rounded border-2 border-gray-300 text-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer"
                  />
                </label>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  className="w-4 h-4 mt-0.5 rounded border-2 border-gray-300 text-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer"
                />
                <label className="text-sm text-gray-600">
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleAccountSubmit}
                disabled={isLoading}
                className="group w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3.5 rounded-xl hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 font-semibold flex items-center justify-center space-x-2 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                <span>{showVehicleInfo ? "Continue" : "Create Account"}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ) : (
            /* Step 2: Vehicle Information */
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Car className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Your EV Details
                </h2>
                <p className="text-gray-600 text-sm">
                  Help us personalize your charging experience
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* EV Model */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="evModel"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    EV Model{" "}
                    <span className="text-gray-400 font-normal">
                      (Optional)
                    </span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Car className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      id="evModel"
                      type="text"
                      value={evModel}
                      onChange={(e) => setEvModel(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-gray-900 placeholder-gray-400"
                      placeholder="e.g., Tesla Model 3, Nissan Leaf"
                    />
                  </div>
                </div>

                {/* Battery Capacity */}
                <div>
                  <label
                    htmlFor="batteryCapacity"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Battery Capacity (kWh){" "}
                    <span className="text-gray-400 font-normal">
                      (Optional)
                    </span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Battery className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      id="batteryCapacity"
                      type="number"
                      value={batteryCapacity}
                      onChange={(e) => setBatteryCapacity(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-gray-900 placeholder-gray-400"
                      placeholder="e.g., 75"
                    />
                  </div>
                </div>

                {/* Efficiency */}
                <div>
                  <label
                    htmlFor="efficiency"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Efficiency (Wh/km){" "}
                    <span className="text-gray-400 font-normal">
                      (Optional)
                    </span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Gauge className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      id="efficiency"
                      type="number"
                      value={efficiency}
                      onChange={(e) => setEfficiency(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-gray-900 placeholder-gray-400"
                      placeholder="e.g., 150"
                    />
                  </div>
                </div>

                {/* Connector Type */}
                <div>
                  <label
                    htmlFor="connectorType"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Connector Type{" "}
                    <span className="text-gray-400 font-normal">
                      (Optional)
                    </span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Plug className="w-5 h-5 text-gray-400" />
                    </div>
                    <select
                      id="connectorType"
                      value={connectorType}
                      onChange={(e) => setConnectorType(e.target.value)}
                      className="w-full pl-12 pr-10 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-gray-900 appearance-none cursor-pointer"
                    >
                      <option value="">Select connector type</option>
                      <option value="CCS">
                        CCS (Combined Charging System)
                      </option>
                      <option value="CHAdeMO">CHAdeMO</option>
                      <option value="Type2">Type 2 (Mennekes)</option>
                      <option value="Tesla">Tesla Supercharger</option>
                      <option value="Type1">Type 1 (J1772)</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Max Charging Power */}
                <div>
                  <label
                    htmlFor="maxChargingPower"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Max Charging Power (kW){" "}
                    <span className="text-gray-400 font-normal">
                      (Optional)
                    </span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Zap className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      id="maxChargingPower"
                      type="number"
                      value={maxChargingPower}
                      onChange={(e) => setMaxChargingPower(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-gray-900 placeholder-gray-400"
                      placeholder="e.g., 250"
                    />
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                <p className="text-sm text-emerald-800">
                  <span className="font-semibold">💡 Pro Tip:</span> Adding your
                  vehicle details helps us show you compatible charging stations
                  and accurate range estimates.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-white text-gray-700 border-2 border-gray-200 py-3.5 rounded-xl hover:border-gray-300 hover:shadow-lg transition-all duration-300 font-semibold hover:-translate-y-0.5"
                >
                  Back
                </button>
                <button
                  onClick={handleFinalSubmit}
                  disabled={isLoading}
                  className="group flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3.5 rounded-xl hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 font-semibold flex items-center justify-center space-x-2 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 1 && (
            <>
              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">
                    Or sign up with
                  </span>
                </div>
              </div>

              {/* Social Signup Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => {
                    // TODO: Backend OAuth integration
                    // window.location.href = 'http://localhost:5000/api/auth/google';
                    alert("Google OAuth will be connected to backend");
                  }}
                  className="flex items-center justify-center space-x-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-lg transition-all duration-300 font-medium text-gray-700 hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    // TODO: Backend OAuth integration
                    // window.location.href = 'http://localhost:5000/api/auth/github';
                    alert("GitHub OAuth will be connected to backend");
                  }}
                  className="flex items-center justify-center space-x-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-lg transition-all duration-300 font-medium text-gray-700 hover:-translate-y-0.5"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span>GitHub</span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Login Link */}
        <p className="text-center mt-8 text-gray-600">
          Already have an account?{" "}
          <a
            href="#"
            className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
