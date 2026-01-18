import React, { useContext } from "react";
import { Moon, Sun, Bell, Shield, LogOut, ChevronRight, HelpCircle } from "lucide-react";
import DarkModeContext from "../context/DarkModeContext";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
      try {
          await api.get("/api/users/logout");
      } catch (error) {
          console.error("Logout failed", error);
      } finally {
          localStorage.removeItem("authToken");
          window.location.href = "/login";
      }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gray-50 dark:bg-gray-900 font-[Outfit] transition-colors duration-300">
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
           <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Settings</h1>
           <p className="text-gray-500 dark:text-gray-400">Customize your app experience</p>
        </div>

        <div className="space-y-6">
            {/* Appearance Section */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl shadow-gray-200/50 dark:shadow-black/20 border border-gray-100 dark:border-gray-700 transition-colors">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">Appearance</h3>
                
                <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer" onClick={() => setDarkMode(!darkMode)}>
                    <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? "bg-indigo-900/50 text-indigo-400" : "bg-yellow-100 text-yellow-600"}`}>
                            {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">Dark Mode</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{darkMode ? "On" : "Off"}</p>
                        </div>
                    </div>
                    <div className={`w-12 h-6 rounded-full p-1 transition-colors ${darkMode ? "bg-blue-600" : "bg-gray-200"}`}>
                        <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform ${darkMode ? "translate-x-6" : "translate-x-0"}`}></div>
                    </div>
                </div>
            </div>

            {/* Notifications & Privacy */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl shadow-gray-200/50 dark:shadow-black/20 border border-gray-100 dark:border-gray-700 transition-colors">
                 <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">Preferences</h3>

                 <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center">
                                <Bell className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">Notifications</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Manage push notifications</p>
                            </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                                <Shield className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">Privacy & Security</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Password, 2FA</p>
                            </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                 </div>
            </div>

            {/* Support */}
             <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl shadow-gray-200/50 dark:shadow-black/20 border border-gray-100 dark:border-gray-700 transition-colors">
                 <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                                <HelpCircle className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">Help & Support</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">FAQs, Contact Us</p>
                            </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
             </div>

             {/* Logout */}
             <button 
                onClick={handleLogout}
                className="w-full p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold flex items-center justify-center gap-2 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
             >
                 <LogOut className="w-5 h-5" />
                 Log Out
             </button>

             <p className="text-center text-xs text-gray-400 mt-8">ChargePilot v1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
