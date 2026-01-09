import { useState, useEffect } from 'react';
import { User, Zap, CreditCard, Car, Clock, TrendingUp, Edit2, Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    memberSince: ''
  });

  const [editData, setEditData] = useState({ ...userData });

  const [chargingStats, setChargingStats] = useState({
    totalSessions: 0,
    totalEnergy: 0,
    totalCost: 0,
    avgSessionTime: 0,
    co2Saved: 0
  });

  const [recentSessions, setRecentSessions] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);

  // Fetch profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/user/profile', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          
          setUserData({
            name: data.name || '',
            email: data.email || '',
            phone: data.phone || '',
            memberSince: data.memberSince || ''
          });

          setChargingStats(data.stats || {
            totalSessions: 0,
            totalEnergy: 0,
            totalCost: 0,
            avgSessionTime: 0,
            co2Saved: 0
          });

          setRecentSessions(data.recentSessions || []);
          setVehicles(data.vehicles || []);
          setPaymentMethods(data.paymentMethods || []);
        } else if (response.status === 401) {
          // Not authenticated, redirect to login
          navigate('/login');
        } else {
          console.error('Failed to fetch profile');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...userData });
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(editData)
      });

      if (response.ok) {
        const data = await response.json();
        setUserData({ ...editData });
        
        // Update localStorage for navbar
        localStorage.setItem('userName', editData.name);
        
        setIsEditing(false);
        alert('Profile updated successfully!');
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    }
  };

  const handleCancel = () => {
    setEditData({ ...userData });
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {userData.name ? userData.name.split(' ').map(n => n[0]).join('') : 'U'}
              </div>
              <div>
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      className="text-3xl font-bold border-b-2 border-blue-500 focus:outline-none"
                    />
                    <input
                      type="email"
                      name="email"
                      value={editData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="text-gray-600 border-b-2 border-blue-500 focus:outline-none block"
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={editData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 XXXXX XXXXX"
                      className="text-gray-600 border-b-2 border-blue-500 focus:outline-none block"
                    />
                  </div>
                ) : (
                  <>
                    <h1 className="text-3xl font-bold text-gray-800">{userData.name || 'User Name'}</h1>
                    <p className="text-gray-600 mt-1">{userData.email || 'email@example.com'}</p>
                    <p className="text-gray-600">{userData.phone || '+91 XXXXX XXXXX'}</p>
                    <p className="text-sm text-gray-500 mt-2">Member since {userData.memberSince || 'N/A'}</p>
                  </>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <button onClick={handleSave} className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                    <Save size={20} />
                  </button>
                  <button onClick={handleCancel} className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition">
                    <X size={20} />
                  </button>
                </>
              ) : (
                <button onClick={handleEdit} className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                  <Edit2 size={20} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-6">
          <div className="flex border-b border-gray-200">
            {['overview', 'history', 'vehicles', 'payments'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-6 py-4 font-semibold capitalize transition ${
                  activeTab === tab
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Charging Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Zap className="text-blue-600" size={24} />
                      <h3 className="font-semibold text-gray-700">Total Sessions</h3>
                    </div>
                    <p className="text-3xl font-bold text-blue-600">{chargingStats.totalSessions}</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="text-green-600" size={24} />
                      <h3 className="font-semibold text-gray-700">Total Energy</h3>
                    </div>
                    <p className="text-3xl font-bold text-green-600">{chargingStats.totalEnergy} kWh</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <CreditCard className="text-purple-600" size={24} />
                      <h3 className="font-semibold text-gray-700">Total Cost</h3>
                    </div>
                    <p className="text-3xl font-bold text-purple-600">₹{chargingStats.totalCost}</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="text-orange-600" size={24} />
                      <h3 className="font-semibold text-gray-700">Avg Session Time</h3>
                    </div>
                    <p className="text-3xl font-bold text-orange-600">{chargingStats.avgSessionTime} min</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 md:col-span-2">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-6 h-6 text-emerald-600">🌱</div>
                      <h3 className="font-semibold text-gray-700">CO₂ Emissions Saved</h3>
                    </div>
                    <p className="text-3xl font-bold text-emerald-600">{chargingStats.co2Saved} kg</p>
                    <p className="text-sm text-gray-600 mt-2">Contributing to cleaner air in India</p>
                  </div>
                </div>
              </div>
            )}

            {/* History Tab */}
            {activeTab === 'history' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Charging Sessions</h2>
                {recentSessions.length === 0 ? (
                  <div className="text-center py-12">
                    <Zap className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-600">No charging sessions yet</p>
                    <p className="text-sm text-gray-500 mt-2">Start charging to see your history</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentSessions.map(session => (
                      <div key={session.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-gray-800 text-lg">{session.location}</h3>
                            <p className="text-gray-600 text-sm mt-1">{session.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-blue-600">₹{session.cost}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div>
                            <p className="text-sm text-gray-600">Energy</p>
                            <p className="font-semibold text-gray-800">{session.energy} kWh</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Duration</p>
                            <p className="font-semibold text-gray-800">{session.duration} min</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Vehicles Tab */}
            {activeTab === 'vehicles' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">My Vehicles</h2>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                    + Add Vehicle
                  </button>
                </div>
                {vehicles.length === 0 ? (
                  <div className="text-center py-12">
                    <Car className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-600">No vehicles added yet</p>
                    <p className="text-sm text-gray-500 mt-2">Add your EV to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {vehicles.map(vehicle => (
                      <div key={vehicle.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                              <Car className="text-white" size={32} />
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-800 text-lg">
                                {vehicle.year} {vehicle.make} {vehicle.model}
                              </h3>
                              <p className="text-gray-600 text-sm mt-1">Battery: {vehicle.batteryCapacity} kWh</p>
                              {vehicle.isPrimary && (
                                <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                                  Primary Vehicle
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Payments Tab */}
            {activeTab === 'payments' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Payment Methods</h2>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                    + Add Payment Method
                  </button>
                </div>
                {paymentMethods.length === 0 ? (
                  <div className="text-center py-12">
                    <CreditCard className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-600">No payment methods added</p>
                    <p className="text-sm text-gray-500 mt-2">Add UPI, Card, or Wallet to pay easily</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {paymentMethods.map(method => (
                      <div key={method.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center">
                              <CreditCard className="text-white" size={28} />
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-800 text-lg">{method.type}</h3>
                              <p className="text-gray-600 text-sm mt-1">{method.details}</p>
                              {method.isDefault && (
                                <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                          </div>
                          <button className="text-red-500 hover:text-red-700 font-semibold">Remove</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}