import React, { useState, useEffect } from "react";
import { User, Mail, Car, Edit2, Save, X, Plus } from "lucide-react";
import api from "../api/axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/api/users/profile");
      if (response.data.success) {
        setUser(response.data.user);
        setFormData({
          fullName: response.data.user.fullName,
          email: response.data.user.email,
        });
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put("/api/users/profile", formData);
      if (response.data.success) {
        setUser(response.data.user);
        setEditing(false);
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gray-50 dark:bg-gray-900 font-[Outfit] transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Profile</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your account settings and vehicle information</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* User Info Card */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl shadow-gray-200/50 dark:shadow-black/20 border border-gray-100 dark:border-gray-700 transition-colors">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-blue-500/30">
                    {user?.fullName?.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white px-2">
                       {user?.fullName}
                    </h2>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mt-1">
                      {user?.role === "admin" ? "Administrator" : "User Account"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setEditing(!editing)}
                  className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                >
                  {editing ? <X className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
                </button>
              </div>

              {editing ? (
                <form onSubmit={handleUpdate} className="space-y-4 animate-fade-in-up">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                      />
                    </div>
                  </div>
                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4 animate-fade-in">
                  <div className="p-4 rounded-2xl border border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 mb-1">
                      <User className="w-4 h-4" />
                      <span className="text-xs font-medium uppercase tracking-wider">Full Name</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white pl-7">{user?.fullName}</p>
                  </div>
                  <div className="p-4 rounded-2xl border border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 mb-1">
                      <Mail className="w-4 h-4" />
                      <span className="text-xs font-medium uppercase tracking-wider">Email Address</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white pl-7">{user?.email}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Vehicles Card */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl shadow-gray-200/50 dark:shadow-black/20 border border-gray-100 dark:border-gray-700 transition-colors h-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Car className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  Vehicles
                </h3>
                <button className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {user?.vehicles && user.vehicles.length > 0 ? (
                  user.vehicles.map((vehicle, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-700/30 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500/50 transition-all group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-gray-900 dark:text-white">{vehicle.model.replace(/_/g, " ")}</h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300">
                          {vehicle.connectorType}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span>{vehicle.batteryCapacity || "N/A"} kWh</span>
                        <span>{vehicle.maxChargingPower || "N/A"} kW</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400">
                      <Car className="w-8 h-8" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">No vehicles added</p>
                    <p className="text-xs text-gray-400 mt-1">Add a vehicle to start booking</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
