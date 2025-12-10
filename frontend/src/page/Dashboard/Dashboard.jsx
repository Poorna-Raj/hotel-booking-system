import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('today');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Mock data
  const stats = {
    totalRooms: 50,
    availableRooms: 23,
    activeBookings: 27,
    upcomingWeek: 45,
    occupancyRate: 54,
    revenue: {
      today: 5420,
      week: 28750,
      month: 125600
    }
  };

  const bookings = [
    { id: 1, guestName: 'John Smith', room: '101', checkIn: '2024-12-10', checkOut: '2024-12-12', status: 'confirmed', amount: 350 },
    { id: 2, guestName: 'Emma Wilson', room: '205', checkIn: '2024-12-10', checkOut: '2024-12-13', status: 'confirmed', amount: 420 },
    { id: 3, guestName: 'Michael Brown', room: '310', checkIn: '2024-12-11', checkOut: '2024-12-14', status: 'pending', amount: 390 },
    { id: 4, guestName: 'Sarah Davis', room: '102', checkIn: '2024-12-09', checkOut: '2024-12-10', status: 'cancelled', amount: 280 },
    { id: 5, guestName: 'James Miller', room: '403', checkIn: '2024-12-10', checkOut: '2024-12-15', status: 'confirmed', amount: 650 },
  ];

  const rooms = [
    { id: '101', type: 'Standard', status: 'occupied', guest: 'John Smith' },
    { id: '102', type: 'Standard', status: 'available' },
    { id: '103', type: 'Standard', status: 'cleaning' },
    { id: '104', type: 'Standard', status: 'available' },
    { id: '201', type: 'Deluxe', status: 'occupied', guest: 'Emma Wilson' },
    { id: '202', type: 'Deluxe', status: 'available' },
    { id: '203', type: 'Deluxe', status: 'maintenance' },
    { id: '204', type: 'Deluxe', status: 'available' },
    { id: '301', type: 'Suite', status: 'available' },
    { id: '302', type: 'Suite', status: 'occupied', guest: 'Michael Brown' },
    { id: '401', type: 'Presidential', status: 'available' },
    { id: '402', type: 'Presidential', status: 'occupied', guest: 'James Miller' },
  ];

  const roomTypes = [
    { type: 'Standard', total: 20, available: 12 },
    { type: 'Deluxe', total: 15, available: 6 },
    { type: 'Suite', total: 10, available: 4 },
    { type: 'Presidential', total: 5, available: 1 },
  ];

  const getRevenue = () => {
    switch(timeRange) {
      case 'today': return stats.revenue.today;
      case 'week': return stats.revenue.week;
      case 'month': return stats.revenue.month;
      default: return stats.revenue.today;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'confirmed': return '✓';
      case 'pending': return '⏱';
      case 'cancelled': return '✕';
      default: return null;
    }
  };

  const getRoomStatusColor = (status) => {
    switch(status) {
      case 'available': return 'bg-green-500';
      case 'occupied': return 'bg-blue-500';
      case 'maintenance': return 'bg-orange-500';
      case 'cleaning': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getRoomStatusIcon = (status) => {
    switch(status) {
      case 'available': return '✓';
      case 'occupied': return '🏠';
      case 'maintenance': return '🔧';
      case 'cleaning': return '✨';
      default: return null;
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.room.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const StatCard = ({ icon, title, value, subtitle, color, delay }) => (
    <div className="stat-card bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <h3 className="stat-value text-3xl font-bold text-gray-900 mb-2">{value}</h3>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
        <div className={`icon-bounce p-3 rounded-lg ${color}`}>
          <span className="text-2xl text-white">{icon}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-orange-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 header-fade-in">
          <h1 className="text-3xl font-bold text-orange-900 mb-2">Room Booking Dashboard</h1>
          <p className="text-orange-700">Monitor your bookings and room availability</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon="🏠"
            title="Total Rooms"
            value={stats.totalRooms}
            subtitle={`${stats.availableRooms} available now`}
            color="bg-orange-500"
            delay={0}
          />
          <StatCard
            icon="📅"
            title="Active Bookings Today"
            value={stats.activeBookings}
            subtitle={`${stats.totalRooms - stats.availableRooms} rooms occupied`}
            color="bg-orange-600"
            delay={100}
          />
          <StatCard
            icon="📈"
            title="Upcoming This Week"
            value={stats.upcomingWeek}
            subtitle="Total bookings scheduled"
            color="bg-orange-700"
            delay={200}
          />
          <StatCard
            icon="📊"
            title="Occupancy Rate"
            value={`${stats.occupancyRate}%`}
            subtitle="Current utilization"
            color="bg-orange-800"
            delay={300}
          />
        </div>

        {/* Revenue Card */}
        <div className="revenue-card bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="icon-pulse p-3 rounded-lg bg-orange-500">
                <span className="text-2xl text-white">💰</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Revenue</h3>
                <p className="text-sm text-gray-500">Track your earnings</p>
              </div>
            </div>
            <div className="flex gap-2">
              {['today', 'week', 'month'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 capitalize transform hover:scale-105 ${
                    timeRange === range
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="revenue-number text-4xl font-bold text-gray-900">${getRevenue().toLocaleString()}</span>
            <span className="text-sm text-gray-500 capitalize">
              {timeRange === 'today' ? 'today' : `this ${timeRange}`}
            </span>
          </div>
          <div className="pt-6 border-t border-gray-200">
            <div className="grid grid-cols-3 gap-4">
              <div className="stat-item">
                <p className="text-xs text-gray-500 mb-1">Today</p>
                <p className="text-lg font-semibold text-gray-900">${stats.revenue.today.toLocaleString()}</p>
              </div>
              <div className="stat-item">
                <p className="text-xs text-gray-500 mb-1">This Week</p>
                <p className="text-lg font-semibold text-gray-900">${stats.revenue.week.toLocaleString()}</p>
              </div>
              <div className="stat-item">
                <p className="text-xs text-gray-500 mb-1">This Month</p>
                <p className="text-lg font-semibold text-gray-900">${stats.revenue.month.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Booking Management */}
          <div className="booking-card bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Bookings</h2>
            
            <div className="flex gap-3 mb-4">
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
                <input
                  type="text"
                  placeholder="Search by guest or room..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredBookings.map((booking, index) => (
                <div key={booking.id} className="booking-item border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-all duration-300" style={{ animationDelay: `${index * 50}ms` }}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{booking.guestName}</h3>
                      <p className="text-sm text-gray-500">Room {booking.room}</p>
                    </div>
                    <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      <span>{getStatusIcon(booking.status)}</span>
                      {booking.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <span>{booking.checkIn} to {booking.checkOut}</span>
                    <span className="font-semibold text-gray-900">${booking.amount}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="action-btn flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-all duration-300 text-sm font-medium">
                      <span>👁️</span>
                      View
                    </button>
                    <button className="action-btn flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-all duration-300 text-sm font-medium">
                      <span>✏️</span>
                      Modify
                    </button>
                    <button className="action-btn flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all duration-300 text-sm font-medium">
                      <span>✕</span>
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Room Status Overview */}
          <div className="room-card bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Room Status Overview</h2>
            
            {/* Room Type Summary */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {roomTypes.map((type, index) => (
                <div key={type.type} className="room-type-card bg-gray-50 rounded-lg p-3" style={{ animationDelay: `${index * 100}ms` }}>
                  <p className="text-sm font-medium text-gray-600">{type.type}</p>
                  <p className="text-xl font-bold text-gray-900">{type.available}/{type.total}</p>
                  <p className="text-xs text-gray-500">Available</p>
                </div>
              ))}
            </div>

            {/* Status Legend */}
            <div className="flex flex-wrap gap-3 mb-4 pb-4 border-b border-gray-200">
              {[
                { status: 'available', label: 'Available' },
                { status: 'occupied', label: 'Occupied' },
                { status: 'cleaning', label: 'Cleaning' },
                { status: 'maintenance', label: 'Maintenance' }
              ].map(({ status, label }) => (
                <div key={status} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getRoomStatusColor(status)} legend-pulse`}></div>
                  <span className="text-sm text-gray-600">{label}</span>
                </div>
              ))}
            </div>

            {/* Room Grid */}
            <div className="grid grid-cols-4 gap-3 max-h-80 overflow-y-auto">
              {rooms.map((room, index) => (
                <div
                  key={room.id}
                  className="room-grid-item relative group cursor-pointer"
                  onMouseEnter={() => setSelectedRoom(room)}
                  onMouseLeave={() => setSelectedRoom(null)}
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <div className={`${getRoomStatusColor(room.status)} rounded-lg p-4 text-white text-center font-semibold hover:opacity-90 transition-all duration-300 transform hover:scale-110`}>
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xl">{getRoomStatusIcon(room.status)}</span>
                      <span className="text-sm">{room.id}</span>
                    </div>
                  </div>
                  
                  {selectedRoom?.id === room.id && (
                    <div className="tooltip absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs rounded-lg p-3 whitespace-nowrap shadow-lg">
                      <p className="font-semibold">Room {room.id}</p>
                      <p className="text-gray-300">{room.type}</p>
                      <p className="capitalize">{room.status}</p>
                      {room.guest && <p className="text-blue-300 mt-1">{room.guest}</p>}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;