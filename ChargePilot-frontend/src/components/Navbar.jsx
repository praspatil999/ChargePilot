import React, { useState, useEffect } from "react";
import {
  Menu,
  User,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// ✅ Correct local asset import
import logoImage from "../assets/logo.png";

const Navbar = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedName = localStorage.getItem("userName") || "";
    setIsLoggedIn(loggedIn);
    setUserName(storedName);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8080/logout", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userName");
        setIsLoggedIn(false);
        setUserName("");
        setIsUserMenuOpen(false);
        navigate("/home");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/40 backdrop-blur-lg border-b border-white/10 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* ================= LOGO ================= */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 flex items-center justify-center 
              bg-white/10 backdrop-blur-md 
              rounded-xl p-2 
              shadow-lg shadow-blue-500/20 
              transition-transform group-hover:scale-105">
              <img
                src={logoImage}
                alt="ChargePilot Logo"
                className="w-full h-full object-contain scale-380"
              />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              ChargePilot
            </span>
          </Link>

          {/* ================= DESKTOP LINKS ================= */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-200 hover:text-white font-medium transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-200 hover:text-white font-medium transition-colors">
              How It Works
            </a>
            <a href="#map" className="text-gray-200 hover:text-white font-medium transition-colors">
              Map
            </a>

            {/* ================= USER MENU ================= */}
            <div className="relative ml-4">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 
                flex items-center justify-center hover:bg-white/20 
                transition-all text-white"
              >
                <User className="w-5 h-5" />
                {isLoggedIn && (
                  <span className="absolute -top-0.5 -right-0.5 w-3 h-3 
                  bg-emerald-500 rounded-full border-2 border-black"></span>
                )}
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-3 w-60 
                bg-[#1a1f2e] border border-white/10 
                rounded-2xl shadow-2xl py-2">
                  {isLoggedIn ? (
                    <>
                      <div className="px-4 py-3 border-b border-white/5 text-white">
                        <p className="text-xs text-gray-400">Signed in as</p>
                        <p className="font-semibold truncate">
                          {userName || "User"}
                        </p>
                      </div>

                      <button
                        onClick={() => navigate("/profile")}
                        className="w-full flex items-center space-x-3 
                        px-4 py-3 hover:bg-white/5 text-white"
                      >
                        <User className="w-4 h-4 text-gray-400" />
                        <span>My Profile</span>
                      </button>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 
                        px-4 py-3 text-red-400 hover:bg-red-400/10"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => navigate("/login")}
                        className="w-full flex items-center space-x-3 
                        px-4 py-3 hover:bg-white/5 text-white"
                      >
                        <LogIn className="w-4 h-4 text-gray-400" />
                        <span>Login</span>
                      </button>

                      <button
                        onClick={() => navigate("/signup")}
                        className="w-full flex items-center space-x-3 
                        px-4 py-3 hover:bg-white/5 text-white"
                      >
                        <UserPlus className="w-4 h-4 text-gray-400" />
                        <span>Sign Up</span>
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ================= MOBILE MENU ================= */}
          <button className="md:hidden text-white">
            <Menu className="w-6 h-6" />
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;