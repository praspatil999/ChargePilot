import React, { useState } from "react";
import {
  MapPin,
  Zap,
  Navigation,
  Clock,
  Battery,
  Wifi,
  Coffee,
  Filter,
  Star,
  ChevronRight,
  Phone,
  LayoutGrid,
  List,
  Search,
  X
} from "lucide-react";
import LocationInput from "./LocationInput";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

function StationFinder() {
  const navigate = useNavigate();
  const [stationsData, setStationsData] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'grid'
  const [filter, setFilter] = useState("all"); // 'all', 'fast', 'available'

  const handleStationsFetched = (data) => {
    console.log("Received stations data:", data);
    setStationsData(data);
    setSelectedStation(null);
  };

  // Mock station status for demo
  const getStationStatus = (station) => {
    const statuses = ["Available", "Busy", "Offline"];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    return {
      text: randomStatus,
      color:
        randomStatus === "Available"
          ? "bg-emerald-500"
          : randomStatus === "Busy"
          ? "bg-amber-500"
          : "bg-gray-400",
      bgValues:
        randomStatus === "Available"
          ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800"
          : randomStatus === "Busy"
          ? "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-100 dark:border-amber-800"
          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700",
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col font-[Outfit] transition-colors duration-300">
      {/* Header & Search */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight transition-colors">Station Finder</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium transition-colors">Global Network</p>
              </div>
            </div>
            
            <div className="flex-1 max-w-2xl">
               <LocationInput onStationsFetched={handleStationsFetched} compact={true} />
            </div>

             <div className="flex items-center space-x-3">
                {/* View Toggle */}
               <div className="hidden md:flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg transition-colors">
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-md transition-all ${viewMode === "list" ? "bg-white dark:bg-gray-600 shadow-sm text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-md transition-all ${viewMode === "grid" ? "bg-white dark:bg-gray-600 shadow-sm text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"}`}
                  >
                    <LayoutGrid className="w-5 h-5" />
                  </button>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
        <AnimatePresence mode="wait">
          {stationsData ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Results Meta */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors">
                  {stationsData.total} stations near <span className="text-blue-600 dark:text-blue-400 transition-colors">{stationsData.locationName}</span>
                </h2>
                
                {/* Mobile Filter / Sort */}
                <div className="flex items-center gap-2">
                   <select 
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900 dark:text-white transition-colors"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                   >
                     <option value="all">All types</option>
                     <option value="fast">Fast (50kW+)</option>
                     <option value="available">Available</option>
                   </select>
                </div>
              </div>

              {/* Grid/List */}
              <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                {stationsData.stations.map((station) => {
                   const status = getStationStatus(station);
                   // Mock data for display
                   const speed = [22, 50, 150, 350][Math.floor(Math.random()*4)];
                   const price = (Math.random()*15 + 10).toFixed(2);
                   const rating = (Math.random() * 2 + 3).toFixed(1);

                   return (
                     <motion.div
                        layout
                        key={station.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        onClick={() => setSelectedStation({...station, status, speed, price, rating})}
                        className={`bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 ${selectedStation?.id === station.id ? 'ring-2 ring-blue-500' : ''}`}
                     >
                        <div className="p-5">
                           <div className="flex justify-between items-start mb-4">
                              <div className="flex items-start gap-4">
                                 <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${status.bgValues}`}>
                                    <Zap className="w-6 h-6" />
                                 </div>
                                 <div>
                                    <h3 className="font-bold text-gray-900 leading-tight mb-1 group-hover:text-blue-600 transition-colors">{station.name}</h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                       <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400"/> {rating}</span>
                                       <span>•</span>
                                       <span>{station.distance.toFixed(1)} km</span>
                                    </div>
                                 </div>
                              </div>
                              <div className={`px-2.5 py-1 rounded-full text-xs font-bold border ${status.bgValues}`}>
                                 {status.text}
                              </div>
                           </div>

                           <div className="grid grid-cols-2 gap-3 mb-4">
                              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2.5 transition-colors">
                                 <div className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase mb-0.5">Speed</div>
                                 <div className="text-sm font-bold text-gray-900 dark:text-white">{speed} kW</div>
                              </div>
                              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2.5 transition-colors">
                                 <div className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase mb-0.5">Rate</div>
                                 <div className="text-sm font-bold text-gray-900 dark:text-white">₹{price}/kWh</div>
                              </div>
                           </div>

                           <div className="flex items-center gap-1.5 mb-5 flex-wrap">
                              {["CCS2", "Type 2"].map((type, i) => (
                                 <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium rounded-md transition-colors">
                                    {type}
                                 </span>
                              ))}
                           </div>

                           <div className="flex gap-3">
                              <button 
                                onClick={(e) => { e.stopPropagation(); navigate(`/book/${station.id}`)}}
                                className="flex-1 bg-gray-900 dark:bg-blue-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-800 dark:hover:bg-blue-700 transition-colors"
                              >
                                Book Slot
                              </button>
                           </div>
                        </div>
                     </motion.div>
                   )
                })}
              </div>

            </motion.div>
          ) : (
            /* Empty State */
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="flex flex-col items-center justify-center py-20 text-center"
            >
               <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-6 transition-colors">
                  <Search className="w-10 h-10 text-blue-500 dark:text-blue-400" />
               </div>
               <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">Search for stations</h2>
               <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8 transition-colors">
                  Enter a city, zip code, or address to find nearby charging stations tailored to your EV.
               </p>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl opacity-60">
                  {/* Decorative placeholders */}
                  {[1,2,3,4].map(i => (
                     <div key={i} className="h-32 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse transition-colors"></div>
                  ))}
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

       {/* Detailed Side Panel / Modal */}
       <AnimatePresence>
          {selectedStation && (
             <>
               <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedStation(null)}
                  className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
               />
               <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto"
               >
                  <div className="p-6">
                     <button 
                        onClick={() => setSelectedStation(null)}
                        className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                     >
                        <X className="w-5 h-5 text-gray-500" />
                     </button>
                     
                     <div className="mt-8">
                        <div className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border mb-4 ${selectedStation.status.bgValues}`}>
                           {selectedStation.status.text}
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-2">{selectedStation.name}</h2>
                        <div className="flex items-center text-gray-500 mb-6">
                           <MapPin className="w-4 h-4 mr-1.5" />
                           <span className="text-sm">{selectedStation.address}, {selectedStation.city}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                           <div className="bg-blue-50 p-4 rounded-2xl">
                              <div className="flex items-center gap-2 mb-2 text-blue-700">
                                 <Zap className="w-5 h-5" />
                                 <span className="font-bold">Power</span>
                              </div>
                              <span className="text-2xl font-bold text-gray-900">{selectedStation.speed} kW</span>
                           </div>
                           <div className="bg-emerald-50 p-4 rounded-2xl">
                              <div className="flex items-center gap-2 mb-2 text-emerald-700">
                                 <CreditCardIcon className="w-5 h-5" />
                                 <span className="font-bold">Price</span>
                              </div>
                              <span className="text-2xl font-bold text-gray-900">₹{selectedStation.price}</span>
                           </div>
                        </div>

                        <h3 className="font-bold text-gray-900 mb-4">Amenities</h3>
                        <div className="flex gap-3 mb-8">
                           {[<Wifi className="w-4 h-4"/>, <Coffee className="w-4 h-4"/>].map((icon, i) => (
                              <div key={i} className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-600">
                                 {icon}
                              </div>
                           ))}
                        </div>

                        <button 
                           onClick={() => navigate(`/book/${selectedStation.id}`)}
                           className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all hover:shadow-xl hover:shadow-blue-500/30 active:scale-[0.98]"
                        >
                           Book Charging Slot
                        </button>
                     </div>
                  </div>
               </motion.div>
             </>
          )}
       </AnimatePresence>
    </div>
  );
}

function CreditCardIcon(props) {
   return (
      <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
   )
}

export default StationFinder;
