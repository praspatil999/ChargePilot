// components/Navbar.jsx
import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

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
      const response = await fetch("http://localhost:8080/logout", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Clear local storage
        localStorage.removeItem("isLoggedIn");
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
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              ChargePilot
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <a
              href="#features"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors hover:text-blue-600"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors hover:text-blue-600"
            >
              How It Works
            </a>
            <a
              href="#map"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors hover:text-blue-600"
            >
              Map
            </a>

            {/* User Icon with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="w-10 h-10 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center hover:shadow-md transition-all duration-300 hover:scale-105 relative"
              >
                <User className="w-5 h-5 text-blue-600" />
                {isLoggedIn && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 py-2 animate-fade-in z-50">
                  {isLoggedIn ? (
                    <>
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                            {userName.charAt(0) || "U"}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">
                              {userName || "User"}
                            </div>
                            <div className="text-sm text-gray-600">
                              Premium Member
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <button
                        onClick={handleProfileClick}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors group"
                      >
                        <User className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
                        <span className="font-medium text-gray-700 group-hover:text-blue-600">
                          My Profile
                        </span>
                      </button>

                      <Link
                        to="/bookings"
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <CreditCard className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
                        <span className="font-medium text-gray-700 group-hover:text-blue-600">
                          My Bookings
                        </span>
                      </Link>

                      <Link
                        to="/settings"
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
                        <span className="font-medium text-gray-700 group-hover:text-blue-600">
                          Settings
                        </span>
                      </Link>

                      <div className="border-t border-gray-100 my-2"></div>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-red-50 transition-colors group"
                      >
                        <LogOut className="w-5 h-5 text-red-500 group-hover:text-red-600" />
                        <span className="font-medium text-gray-700 group-hover:text-red-600">
                          Logout
                        </span>
                      </button>
                    </>
                  ) : (
                    <>
                      {/* Login/Signup Options */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <h3 className="font-bold text-gray-900">Welcome!</h3>
                        <p className="text-sm text-gray-600">
                          Sign in to access your account
                        </p>
                      </div>

                      <button
                        onClick={handleLoginClick}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors group"
                      >
                        <LogIn className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
                        <span className="font-medium text-gray-700 group-hover:text-blue-600">
                          Login
                        </span>
                      </button>

                      <button
                        onClick={handleSignupClick}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors group"
                      >
                        <UserPlus className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
                        <span className="font-medium text-gray-700 group-hover:text-blue-600">
                          Create Account
                        </span>
                      </button>

                      <div className="border-t border-gray-100 my-2"></div>

                      <Link
                        to="/help"
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <HelpCircle className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
                        <span className="font-medium text-gray-700 group-hover:text-blue-600">
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
            {/* User Icon for Mobile */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="w-10 h-10 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center hover:shadow-md transition-all duration-300"
              >
                <User className="w-5 h-5 text-blue-600" />
                {isLoggedIn && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </button>
            </div>

            <button className="md:hidden">
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile User Dropdown Menu */}
      {isUserMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
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
                      <div className="font-bold text-gray-900">
                        {userName || "User"}
                      </div>
                      <div className="text-sm text-gray-600">
                        Premium Member
                      </div>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <button
                  onClick={handleProfileClick}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 rounded-xl transition-colors mb-2"
                >
                  <User className="w-5 h-5 text-gray-500" />
                  <span className="font-medium text-gray-700">My Profile</span>
                </button>

                <Link
                  to="/bookings"
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors mb-2"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <CreditCard className="w-5 h-5 text-gray-500" />
                  <span className="font-medium">My Bookings</span>
                </Link>

                <Link
                  to="/settings"
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors mb-2"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <Settings className="w-5 h-5 text-gray-500" />
                  <span className="font-medium">Settings</span>
                </Link>

                <div className="border-t border-gray-200 my-3"></div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </>
            ) : (
              <>
                {/* Login/Signup for Mobile */}
                <div className="mb-4">
                  <h3 className="font-bold text-gray-900 text-lg">Welcome!</h3>
                  <p className="text-gray-600">
                    Sign in to access your account
                  </p>
                </div>

                <button
                  onClick={handleLoginClick}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-medium mb-3 flex items-center justify-center space-x-2"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Login</span>
                </button>

                <button
                  onClick={handleSignupClick}
                  className="w-full bg-white text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-xl hover:bg-blue-50 transition-all duration-300 font-medium flex items-center justify-center space-x-2"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Create Account</span>
                </button>

                <div className="border-t border-gray-200 my-3"></div>

                <Link
                  to="/help"
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
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
