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
  Loader2,
  CheckCircle2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

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
      handleFinalSubmit();
    }
  };

  const handleFinalSubmit = async () => {
    setIsLoading(true);

    const userData = {
      fullName,
      email,
      password,
      vehicle: showVehicleInfo
        ? {
            model: evModel,
            batteryCapacity: parseFloat(batteryCapacity),
            efficiency: parseFloat(efficiency),
            connectorType,
            maxChargingPower: maxChargingPower ? parseFloat(maxChargingPower) : null,
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
        if (data.token) {
            localStorage.setItem("authToken", data.token);
        }
        // alert("Signup successful!");
        navigate("/");
      } else {
        alert(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Connection Error:", error);
      alert("Could not connect to the server. Is the backend running?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6 relative overflow-hidden font-[Outfit] transition-colors duration-300">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent opacity-70 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-100/40 via-transparent to-transparent opacity-70 pointer-events-none"></div>
      
      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-soft-light"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="inline-flex items-center justify-center space-x-3 mb-6"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight transition-colors">
              ChargePilot
            </span>
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight transition-colors">
            Create account
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-light transition-colors">
            Join the smart EV charging network
          </p>
        </div>

        {/* Progress Indicator */}
        <AnimatePresence>
          {showVehicleInfo && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center justify-center mb-8"
            >
              <div className="relative flex items-center w-full max-w-xs">
                <div className={`flex flex-col items-center relative z-10 ${step >= 1 ? "text-gray-900 dark:text-gray-100" : "text-gray-400 dark:text-gray-600"} transition-colors`}>
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors duration-300 ${step >= 1 ? "bg-gray-900 dark:bg-white border-gray-900 dark:border-white text-white dark:text-gray-900" : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"}`}>1</div>
                   <span className="text-xs font-semibold mt-1">Account</span>
                </div>
                <div className="flex-1 h-0.5 bg-gray-200 dark:bg-gray-700 mx-2 relative transition-colors">
                  <div className={`absolute inset-0 bg-gray-900 dark:bg-white transition-all duration-500 ${step >= 2 ? "w-full" : "w-0"}`}></div>
                </div>
                <div className={`flex flex-col items-center relative z-10 ${step >= 2 ? "text-gray-900 dark:text-gray-100" : "text-gray-400 dark:text-gray-600"} transition-colors`}>
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors duration-300 ${step >= 2 ? "bg-gray-900 dark:bg-white border-gray-900 dark:border-white text-white dark:text-gray-900" : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"}`}>2</div>
                   <span className="text-xs font-semibold mt-1">Vehicle</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 p-8 transition-colors duration-300">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1 transition-colors">Full Name</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:bg-white dark:focus:bg-gray-700 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-gray-900 dark:text-white placeholder-gray-400"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1 transition-colors">Email Address</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:bg-white dark:focus:bg-gray-700 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-gray-900 dark:text-white placeholder-gray-400"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {/* Password Fields Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1 transition-colors">Password</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-11 pr-10 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:bg-white dark:focus:bg-gray-700 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-gray-900 dark:text-white placeholder-gray-400 text-sm"
                        placeholder="Create password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1 transition-colors">Confirm Password</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                      </div>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-11 pr-10 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:bg-white dark:focus:bg-gray-700 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-gray-900 dark:text-white placeholder-gray-400 text-sm"
                        placeholder="Confirm password"
                      />
                       <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Add Vehicle Toggle */}
                <div 
                  className={`border rounded-2xl p-4 transition-all duration-300 cursor-pointer ${showVehicleInfo ? "bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-500/50" : "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-blue-200 hover:dark:border-blue-500/50"}`}
                  onClick={() => setShowVehicleInfo(!showVehicleInfo)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${showVehicleInfo ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400" : "bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-300"}`}>
                      <Car className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 dark:text-white">Add Vehicle Information</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Get personalized charging recommendations</div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${showVehicleInfo ? "bg-blue-600 border-blue-600" : "border-gray-300 dark:border-gray-500"}`}>
                      {showVehicleInfo && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleAccountSubmit}
                  className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl text-white bg-gray-900 dark:bg-blue-600 hover:bg-gray-800 dark:hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-900/10 dark:focus:ring-blue-500/20 font-medium transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div className="flex items-center space-x-2">
                    <span>{showVehicleInfo ? "Continue to Vehicle Details" : "Create Account"}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                 <div className="flex items-center space-x-2 text-gray-900 dark:text-white font-semibold mb-2">
                    <Car className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <h3>Vehicle Specification</h3>
                 </div>

                 {/* Grid for Vehicle inputs */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-1 md:col-span-2 space-y-2">
                        <label className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 ml-1">Model Name</label>
                        <input
                            type="text"
                            value={evModel}
                            onChange={(e) => setEvModel(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:bg-white dark:focus:bg-gray-700 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-gray-900 dark:text-white placeholder-gray-400"
                            placeholder="e.g. Tesla Model 3"
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 ml-1">Battery (kWh)</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={batteryCapacity}
                                onChange={(e) => setBatteryCapacity(e.target.value)}
                                className="w-full pl-4 pr-12 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:bg-white dark:focus:bg-gray-700 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-gray-900 dark:text-white placeholder-gray-400"
                                placeholder="75"
                            />
                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400 text-sm">kWh</div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 ml-1">Efficiency</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Gauge className="w-4 h-4 text-gray-400" />
                            </div>
                            <input
                                type="number"
                                value={efficiency}
                                onChange={(e) => setEfficiency(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:bg-white dark:focus:bg-gray-700 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-gray-900 dark:text-white placeholder-gray-400"
                                placeholder="150 Wh/km"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 ml-1">Connector</label>
                        <div className="relative">
                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Plug className="w-4 h-4 text-gray-400" />
                            </div>
                            <select
                                value={connectorType}
                                onChange={(e) => setConnectorType(e.target.value)}
                                className="w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:bg-white dark:focus:bg-gray-700 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-gray-900 dark:text-white appearance-none cursor-pointer"
                            >
                                <option value="">Select Type</option>
                                <option value="CCS">CCS2</option>
                                <option value="CHAdeMO">CHAdeMO</option>
                                <option value="Type2">Type 2</option>
                                <option value="Tesla">Tesla</option>
                            </select>
                             <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                         <label className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 ml-1">Max Power</label>
                         <div className="relative">
                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Zap className="w-4 h-4 text-gray-400" />
                            </div>
                            <input
                                type="number"
                                value={maxChargingPower}
                                onChange={(e) => setMaxChargingPower(e.target.value)}
                                className="w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:bg-white dark:focus:bg-gray-700 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-gray-900 dark:text-white placeholder-gray-400"
                                placeholder="250"
                            />
                             <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400 text-sm">kW</div>
                        </div>
                    </div>
                 </div>

                 {/* Actions */}
                 <div className="flex gap-4 pt-2">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 px-4 py-3.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleFinalSubmit}
                      disabled={isLoading}
                      className="flex-[2] group relative flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl text-white bg-gray-900 dark:bg-blue-600 hover:bg-gray-800 dark:hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-900/10 dark:focus:ring-blue-500/20 font-medium transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
                    >
                      {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span>Complete Signup</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      )}
                    </button>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Login Link */}
          {step === 1 && (
            <p className="text-center mt-8 text-gray-500 dark:text-gray-400 text-sm transition-colors">
              Already have an account?{" "}
              <a
                href="/Login"
                className="font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Sign in
              </a>
            </p>
          )}

        </div>
      </motion.div>
    </div>
  );
}
