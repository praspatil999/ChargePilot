import React, { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, DollarSign, Battery, Zap, AlertCircle } from "lucide-react";
import api from "../api/axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get("/api/bookings/my");
      if (response.data.success) {
        setBookings(response.data.bookings);
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-900/50";
      case "confirmed": return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-900/50";
      case "completed": return "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50";
      case "cancelled": return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-900/50";
      default: return "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400";
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.scheduledStart);
    const now = new Date();
    if (activeTab === "upcoming") {
       return bookingDate >= now && booking.status !== "cancelled";
    }
    return bookingDate < now || booking.status === "cancelled";
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gray-50 dark:bg-gray-900 font-[Outfit] transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
             <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Bookings</h1>
             <p className="text-gray-500 dark:text-gray-400">Track your charging sessions and history</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-1 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex">
             <button 
                onClick={() => setActiveTab("upcoming")}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === "upcoming" ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20" : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"}`}
             >
                Upcoming
             </button>
             <button 
                onClick={() => setActiveTab("past")}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === "past" ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20" : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"}`}
             >
                History
             </button>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
           {filteredBookings.length > 0 ? (
             filteredBookings.map((booking) => (
               <div key={booking._id} className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl shadow-gray-200/50 dark:shadow-black/20 border border-gray-100 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-900/50 transition-all group relative overflow-hidden">
                   {/* Status Badge */}
                   <div className={`absolute top-6 right-6 px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(booking.status)} uppercase tracking-wider`}>
                      {booking.status}
                   </div>

                   <div className="grid md:grid-cols-4 gap-6 items-center">
                        {/* Station Info */}
                        <div className="md:col-span-2">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 pr-20">{booking.stationSnapshot?.name || "Unknown Station"}</h3>
                            <div className="flex items-start gap-2 text-gray-500 dark:text-gray-400 text-sm mb-4">
                               <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                               <span className="line-clamp-2">{booking.stationSnapshot?.address}</span>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300">
                                   <Zap className="w-3.5 h-3.5" />
                                   {booking.chargerType} ({booking.stationSnapshot?.power}kW)
                                </span>
                                {booking.vehicle && (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300">
                                        {booking.vehicle.model.replace(/_/g, " ")}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Timing */}
                        <div>
                             <div className="space-y-3">
                                 <div>
                                     <p className="text-xs text-gray-400 uppercase font-bold mb-1">Date</p>
                                     <div className="flex items-center gap-2 text-gray-900 dark:text-white font-semibold">
                                         <Calendar className="w-4 h-4 text-emerald-500" />
                                         {new Date(booking.scheduledStart).toLocaleDateString()}
                                     </div>
                                 </div>
                                 <div>
                                     <p className="text-xs text-gray-400 uppercase font-bold mb-1">Time</p>
                                     <div className="flex items-center gap-2 text-gray-900 dark:text-white font-semibold">
                                         <Clock className="w-4 h-4 text-emerald-500" />
                                         {new Date(booking.scheduledStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                     </div>
                                 </div>
                             </div>
                        </div>

                         {/* Cost */}
                        <div className="text-left md:text-right">
                            <div className="inline-block bg-emerald-50 dark:bg-emerald-900/20 px-4 py-3 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
                                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase mb-1">Total Cost</p>
                                <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 flex items-center justify-end gap-1">
                                    <span className="text-lg">₹</span>
                                    {booking.estimatedCost?.toFixed(0) || "0"}
                                </div>
                            </div>
                        </div>
                   </div>
               </div>
             ))
           ) : (
                <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 border-dashed">
                    <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calendar className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Bookings Found</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                        {activeTab === "upcoming" ? "You don't have any upcoming charging sessions." : "You haven't completed any charging sessions yet."}
                    </p>
                    {activeTab === "upcoming" && (
                         <a href="/findStations" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/20 transition-all">
                            Find a Station
                         </a>
                    )}
                </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
