import React, { useState } from 'react';
import './RoomList.css';
import AddRoomForm from '../../Component/CRUD-room/Add-Room/AddRoom';

const RoomList = () => {
  const [searchName, setSearchName] = useState('');
  const [roomStatus, setRoomStatus] = useState('--ALL--');
  const [orderBy, setOrderBy] = useState('--DEFAULT--');
  const [showAddForm, setShowAddForm] = useState(false);

  // Sample room data
  const rooms = [
    {
      id: 1,
      name: 'Deluxe Suite',
      type: 'Luxury',
      bedSize: 'King Size',
      price: 12500,
      status: 'Available',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'Standard Room',
      type: 'Standard',
      bedSize: 'Queen Size',
      price: 8000,
      status: 'Booked',
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=500&h=300&fit=crop'
    },
    {
      id: 3,
      name: 'Standard Room',
      type: 'Standard',
      bedSize: 'Queen Size',
      price: 8000,
      status: 'Booked',
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=500&h=300&fit=crop'
    },
    {
      id: 4,
      name: 'Standard Room',
      type: 'Standard',
      bedSize: 'Queen Size',
      price: 8000,
      status: 'Booked',
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=500&h=300&fit=crop'
    },
    {
      id: 5,
      name: 'Standard Room',
      type: 'Standard',
      bedSize: 'Queen Size',
      price: 8000,
      status: 'Booked',
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=500&h=300&fit=crop'
    }
  ];

  const handleSearch = () => {
    // Search functionality will filter rooms
    console.log('Searching...', { searchName, roomStatus, orderBy });
  };

  const handleViewDetails = (roomId) => {
    // This will navigate to room details page or open details popup
    console.log('View details for room:', roomId);
    // You can add navigation here: navigate(`/rooms/${roomId}`)
  };

  const handleAddRoom = () => {
    // This will open the add room form popup
    setShowAddForm(true);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
  };

  const handleFormSubmit = (formData) => {
    // Handle form submission - add API call here
    console.log('New room data:', formData);
    
    // Example: Add new room to the list
    // You can replace this with an API call
    // const newRoom = {
    //   id: rooms.length + 1,
    //   name: formData.name,
    //   type: formData.type,
    //   bedSize: formData.bedSize,
    //   price: parseFloat(formData.price),
    //   status: formData.status,
    //   image: URL.createObjectURL(formData.mainImage)
    // };
    
    // After successful submission
    setShowAddForm(false);
    
    // You might want to refresh the room list or show a success message
    alert('Room added successfully!');
  };

  return (
    <div className="room-list-container">
      <div className="search-section">
        <div className="search-field">
          <label>Search by Name</label>
          <input
            type="text"
            placeholder="Room Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="search-field">
          <label>Room Status</label>
          <select
            value={roomStatus}
            onChange={(e) => setRoomStatus(e.target.value)}
            className="search-select"
          >
            <option>--ALL--</option>
            <option>Available</option>
            <option>Booked</option>
          </select>
        </div>

        <div className="search-field">
          <label>Order By</label>
          <select
            value={orderBy}
            onChange={(e) => setOrderBy(e.target.value)}
            className="search-select"
          >
            <option>--DEFAULT--</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Name: A to Z</option>
          </select>
        </div>

        <button onClick={handleSearch} className="search-button">
          Search Rooms
        </button>
      </div>

      <div className="rooms-grid">
        {/* Add Room Card */}
        <div className="room-card add-room-card" onClick={handleAddRoom}>
          <div className="add-room-content">
            <div className="add-icon">+</div>
            <h3>Add New Room</h3>
          </div>
        </div>

        {/* Existing Room Cards */}
        {rooms.map((room) => (
          <div key={room.id} className="room-card">
            <div className="room-image">
              <img src={room.image} alt={room.name} />
              <span className={`status-badge ${room.status.toLowerCase()}`}>
                {room.status}
              </span>
            </div>
            
            <div className="room-content">
              <h3 className="room-name">{room.name}</h3>
              
              <div className="room-details">
                <div className="detail-row">
                  <span className="detail-label">{room.type}</span>
                  <span className="detail-value">{room.bedSize}</span>
                </div>
              </div>

              <div className="room-price">
                Rs. {room.price.toLocaleString()}
              </div>

              <button
                onClick={() => handleViewDetails(room.id)}
                className="view-details-button"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Room Form Popup */}
      {showAddForm && (
        <AddRoomForm 
          onClose={handleCloseForm}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default RoomList;