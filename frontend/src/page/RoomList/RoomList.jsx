import React, { startTransition, useEffect, useState } from "react";
import "./RoomList.css";
import AddRoomForm from "../../Component/CRUD-room/Add-Room/AddRoom";
import { createRoom, getRooms } from "./roomApi";

const RoomList = () => {
  const [searchName, setSearchName] = useState("");
  const [roomStatus, setRoomStatus] = useState("--ALL--");
  const [orderBy, setOrderBy] = useState("--DEFAULT--");
  const [showAddForm, setShowAddForm] = useState(false);
  const [roomData, setRoomData] = useState([]);

  const fetchRooms = async () => {
    try {
      const res = await getRooms();
      if (res.status === 200) {
        startTransition(() => {
          setRoomData(res.data);
        });
      }
    } catch (err) {
      console.error(err.message);
      alert(err.error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleSearch = () => {
    // Search functionality will filter rooms
    //TODO::implement the function here
    console.log("Searching...", { searchName, roomStatus, orderBy });
  };

  const handleViewDetails = (roomId) => {
    // This will navigate to room details page or open details popup
    console.log("View details for room:", roomId);
    // You can add navigation here: navigate(`/rooms/${roomId}`)
  };

  const handleAddRoom = () => {
    // This will open the add room form popup
    setShowAddForm(true);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
  };

  const handleFormSubmit = async (formData) => {
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    try {
      const res = await createRoom(data);
      if (res.status === 201 || res.status === 200) {
        console.log("Form submitted successfully");
      }
    } catch (err) {
      console.log(err.message);
      alert(err.error);
    }
    alert("Room added successfully!");
    setShowAddForm(false);
    fetchRooms();
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
        {roomData.map((room) => (
          <div key={room.id} className="room-card">
            <div className="room-image">
              <img src={room.imageNo1} alt={room.name} />
              <span className={`status-badge ${room.roomStatus.toLowerCase()}`}>
                {room.roomStatus}
              </span>
            </div>

            <div className="room-content">
              <h3 className="room-name">{room.name}</h3>

              <div className="room-details">
                <div className="detail-row">
                  <span className="detail-label">{room.roomType}</span>
                  <span className="detail-value">{room.bedType}</span>
                </div>
              </div>

              <div className="room-price">
                USD {room.basePrice.toLocaleString()}
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
        <AddRoomForm onClose={handleCloseForm} onSubmit={handleFormSubmit} />
      )}
    </div>
  );
};

export default RoomList;
