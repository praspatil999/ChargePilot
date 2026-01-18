// components/Navbar.jsx
import React, { useState, useEffect, useContext } from "react";
import {
  Zap,
  Menu,
  User,
  LogOut,
  LogIn,
  UserPlus,
  ChevronDown,
  Settings,
  CreditCard,
  HelpCircle,
  Moon,
  Sun,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import DarkModeContext from "../context/DarkModeContext";
import api from "../api/axios";

const Navbar = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  // Check login status on component mount (in real app, this would be from context/API)
  useEffect(() => {
    // Mock: Check if user is logged in from localStorage
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedName = localStorage.getItem("userName") || "";

    setIsLoggedIn(loggedIn);
    setUserName(storedName);
  }, []);

  const handleLoginClick = () => {
    setIsUserMenuOpen(false);
    navigate("/login");
  };

  const handleSignupClick = () => {
    setIsUserMenuOpen(false);
    navigate("/signup");
  };

  const handleLogout = async () => {
    try {
      // Call logout endpoint
      const response = await api.get("/logout");

      if (response.status === 200) {
        // Clear local storage
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("authToken");
        localStorage.removeItem("userName");

        // Update state
        setIsLoggedIn(false);
        setUserName("");
        setIsUserMenuOpen(false);

        // Redirect to home page
        navigate("/home");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleProfileClick = () => {
    setIsUserMenuOpen(false);
    navigate("/profile");
  };

  return (
    <nav className={`${darkMode ? "bg-gray-800/80 border-gray-700" : "bg-white/80 border-gray-100"} backdrop-blur-md border-b sticky top-0 z-50 shadow-sm transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
              ChargePilot
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <Link
              to="/home"
              className={`${darkMode ? "text-gray-300 hover:text-blue-400" : "text-gray-700 hover:text-blue-600"} font-medium transition-colors`}
            >
              Home
            </Link>
            <Link
              to="/findStations"
              className={`${darkMode ? "text-gray-300 hover:text-blue-400" : "text-gray-700 hover:text-blue-600"} font-medium transition-colors`}
            >
              Find Stations
            </Link>
            <Link
              to="/trip-planner"
              className={`${darkMode ? "text-gray-300 hover:text-blue-400" : "text-gray-700 hover:text-blue-600"} font-medium transition-colors`}
            >
              Trip Planner
            </Link>
            <a
              href="#features"
              className={`${darkMode ? "text-gray-300 hover:text-blue-400" : "text-gray-700 hover:text-blue-600"} font-medium transition-colors`}
            >
              Features
            </a>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-xl transition-all duration-300 ${
                darkMode
                  ? "bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400"
                  : "bg-gray-800/20 hover:bg-gray-800/30 text-gray-800"
              }`}
              title={darkMode ? "Light Mode" : "Dark Mode"}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* User Icon with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={`w-10 h-10 ${darkMode ? "bg-blue-900/40" : "bg-blue-50"} rounded-xl flex items-center justify-center hover:shadow-md transition-all duration-300 hover:scale-105 relative`}
              >
                <User className={`w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                {isLoggedIn && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                )}
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div className={`absolute right-0 mt-2 w-64 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-2xl shadow-xl border py-2 animate-fade-in z-50`}>
                  {isLoggedIn ? (
                    <>
                      {/* User Info */}
                      <div className={`px-4 py-3 border-b ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                            {userName.charAt(0) || "U"}
                          </div>
                          <div>
                            <div className={`font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                              {userName || "User"}
                            </div>
                            <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                              Premium Member
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <button
                        onClick={handleProfileClick}
                        className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors group ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}
                      >
                        <User className={`w-5 h-5 ${darkMode ? "text-gray-500 group-hover:text-blue-400" : "text-gray-500 group-hover:text-blue-600"}`} />
                        <span className={`font-medium ${darkMode ? "text-gray-300 group-hover:text-blue-400" : "text-gray-700 group-hover:text-blue-600"}`}>
                          My Profile
                        </span>
                      </button>

                      <Link
                        to="/bookings"
                        className={`flex items-center space-x-3 px-4 py-3 transition-colors group ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <CreditCard className={`w-5 h-5 ${darkMode ? "text-gray-500 group-hover:text-blue-400" : "text-gray-500 group-hover:text-blue-600"}`} />
                        <span className={`font-medium ${darkMode ? "text-gray-300 group-hover:text-blue-400" : "text-gray-700 group-hover:text-blue-600"}`}>
                          My Bookings
                        </span>
                      </Link>

                      <Link
                        to="/settings"
                        className={`flex items-center space-x-3 px-4 py-3 transition-colors group ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className={`w-5 h-5 ${darkMode ? "text-gray-500 group-hover:text-blue-400" : "text-gray-500 group-hover:text-blue-600"}`} />
                        <span className={`font-medium ${darkMode ? "text-gray-300 group-hover:text-blue-400" : "text-gray-700 group-hover:text-blue-600"}`}>
                          Settings
                        </span>
                      </Link>

                      <div className={`border-t ${darkMode ? "border-gray-700" : "border-gray-100"} my-2`}></div>

                      <button
                        onClick={handleLogout}
                        className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors group ${darkMode ? "hover:bg-red-900/30" : "hover:bg-red-50"}`}
                      >
                        <LogOut className={`w-5 h-5 ${darkMode ? "text-red-400 group-hover:text-red-300" : "text-red-500 group-hover:text-red-600"}`} />
                        <span className={`font-medium ${darkMode ? "text-gray-300 group-hover:text-red-300" : "text-gray-700 group-hover:text-red-600"}`}>
                          Logout
                        </span>
                      </button>
                    </>
                  ) : (
                    <>
                      {/* Login/Signup Options */}
                      <div className={`px-4 py-3 border-b ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
                        <h3 className={`font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Welcome!</h3>
                        <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                          Sign in to access your account
                        </p>
                      </div>

                      <button
                        onClick={handleLoginClick}
                        className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors group ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}
                      >
                        <LogIn className={`w-5 h-5 ${darkMode ? "text-gray-500 group-hover:text-blue-400" : "text-gray-500 group-hover:text-blue-600"}`} />
                        <span className={`font-medium ${darkMode ? "text-gray-300 group-hover:text-blue-400" : "text-gray-700 group-hover:text-blue-600"}`}>
                          Login
                        </span>
                      </button>

                      <button
                        onClick={handleSignupClick}
                        className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors group ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}
                      >
                        <UserPlus className={`w-5 h-5 ${darkMode ? "text-gray-500 group-hover:text-blue-400" : "text-gray-500 group-hover:text-blue-600"}`} />
                        <span className={`font-medium ${darkMode ? "text-gray-300 group-hover:text-blue-400" : "text-gray-700 group-hover:text-blue-600"}`}>
                          Create Account
                        </span>
                      </button>

                      <div className={`border-t ${darkMode ? "border-gray-700" : "border-gray-100"} my-2`}></div>

                      <Link
                        to="/help"
                        className={`flex items-center space-x-3 px-4 py-3 transition-colors group ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <HelpCircle className={`w-5 h-5 ${darkMode ? "text-gray-500 group-hover:text-blue-400" : "text-gray-500 group-hover:text-blue-600"}`} />
                        <span className={`font-medium ${darkMode ? "text-gray-300 group-hover:text-blue-400" : "text-gray-700 group-hover:text-blue-600"}`}>
                          Help & Support
                        </span>
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Dark Mode Toggle Mobile */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-xl transition-all duration-300 ${
                darkMode
                  ? "bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400"
                  : "bg-gray-800/20 hover:bg-gray-800/30 text-gray-800"
              }`}
              title={darkMode ? "Light Mode" : "Dark Mode"}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* User Icon for Mobile */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={`w-10 h-10 ${darkMode ? "bg-blue-900/40" : "bg-blue-50"} rounded-xl flex items-center justify-center hover:shadow-md transition-all duration-300`}
              >
                <User className={`w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                {isLoggedIn && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                )}
              </button>
            </div>

            <button className="md:hidden">
              <Menu className={`w-6 h-6 ${darkMode ? "text-gray-300" : "text-gray-700"}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile User Dropdown Menu */}
      {isUserMenuOpen && (
        <div className={`md:hidden ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"} border-t shadow-lg`}>
          <div className="max-w-7xl mx-auto px-6 py-4">
            {isLoggedIn ? (
              <>
                {/* User Info */}
                <div className="mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {userName.charAt(0) || "U"}
                    </div>
                    <div>
                      <div className={`font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                        {userName || "User"}
                      </div>
                      <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Premium Member
                      </div>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <button
                  onClick={handleProfileClick}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-xl transition-colors mb-2 ${darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-50 text-gray-700"}`}
                >
                  <User className={`w-5 h-5 ${darkMode ? "text-gray-500" : "text-gray-500"}`} />
                  <span className="font-medium">My Profile</span>
                </button>

                <Link
                  to="/bookings"
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors mb-2 ${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-50"}`}
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <CreditCard className="w-5 h-5 text-gray-500" />
                  <span className="font-medium">My Bookings</span>
                </Link>

                <Link
                  to="/settings"
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors mb-2 ${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-50"}`}
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <Settings className="w-5 h-5 text-gray-500" />
                  <span className="font-medium">Settings</span>
                </Link>

                <div className={`border-t ${darkMode ? "border-gray-700" : "border-gray-200"} my-3`}></div>

                <button
                  onClick={handleLogout}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${darkMode ? "text-red-400 hover:bg-red-900/30" : "text-red-600 hover:bg-red-50"}`}
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </>
            ) : (
              <>
                {/* Login/Signup for Mobile */}
                <div className="mb-4">
                  <h3 className={`font-bold text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>Welcome!</h3>
                  <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                    Sign in to access your account
                  </p>
                </div>

                <button
                  onClick={handleLoginClick}
                  className={`w-full px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-medium mb-3 flex items-center justify-center space-x-2 ${
                    darkMode
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  <LogIn className="w-5 h-5" />
                  <span>Login</span>
                </button>

                <button
                  onClick={handleSignupClick}
                  className={`w-full px-6 py-3 rounded-xl hover:transition-all duration-300 font-medium flex items-center justify-center space-x-2 border-2 ${
                    darkMode
                      ? "bg-gray-700 text-blue-400 border-blue-400 hover:bg-gray-600"
                      : "bg-white text-blue-600 border-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Create Account</span>
                </button>

                <div className={`border-t ${darkMode ? "border-gray-700" : "border-gray-200"} my-3`}></div>

                <Link
                  to="/help"
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-50"}`}
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <HelpCircle className="w-5 h-5 text-gray-500" />
                  <span className="font-medium">Help & Support</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

