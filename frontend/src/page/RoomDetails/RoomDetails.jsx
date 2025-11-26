import React from 'react';
import './RoomDetails.css';

const RoomDetails = () => {
  // Sample room data - you can pass this as props or fetch from API
  const room = {
    id: 1,
    name: 'Deluxe Suite',
    type: 'Luxury',
    bedSize: 'King Size',
    price: 12500,
    status: 'Available',
    roomNumber: '101',
    floor: '1st Floor',
    capacity: '2 Adults',
    view: 'City View',
    amenities: ['Wi-Fi', 'Air Conditioning', 'Mini Bar', 'TV', 'Room Service', 'Balcony'],
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=500&fit=crop',
    additionalImages: [
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=300&h=200&fit=crop'
    ]
  };

  const handleUpdate = () => {
    // This will open the update form popup
    console.log('Update room:', room.id);
  };

  const handleDelete = () => {
    // This will open the delete confirmation popup
    console.log('Delete room:', room.id);
  };

  const handleBack = () => {
    // Navigate back to room list
    console.log('Go back to room list');
  };

  return (
    <div className="room-details-container">
      <div className="details-header">
        <button onClick={handleBack} className="back-button">
          ← Back to Rooms
        </button>
        <div className="header-actions">
          <button onClick={handleUpdate} className="update-button">
            Update Room
          </button>
          <button onClick={handleDelete} className="delete-button">
            Delete Room
          </button>
        </div>
      </div>

      <div className="details-content">
        {/* Main Image Section */}
        <div className="main-image-section">
          <img src={room.image} alt={room.name} className="main-image" />
          <span className={`status-badge ${room.status.toLowerCase()}`}>
            {room.status}
          </span>
        </div>

        {/* Additional Images */}
        <div className="additional-images">
          {room.additionalImages.map((img, index) => (
            <img key={index} src={img} alt={`Room view ${index + 1}`} className="thumbnail-image" />
          ))}
        </div>

        {/* Room Information */}
        <div className="info-section">
          <div className="info-header">
            <h1 className="room-title">{room.name}</h1>
            <div className="room-price-large">Rs. {room.price.toLocaleString()}</div>
          </div>

          {/* Details Grid */}
          <div className="details-grid">
            <div className="detail-card">
              <div className="detail-icon">🏠</div>
              <div className="detail-info">
                <span className="detail-label">Room Number</span>
                <span className="detail-value">{room.roomNumber}</span>
              </div>
            </div>

            <div className="detail-card">
              <div className="detail-icon">🏢</div>
              <div className="detail-info">
                <span className="detail-label">Floor</span>
                <span className="detail-value">{room.floor}</span>
              </div>
            </div>

            <div className="detail-card">
              <div className="detail-icon">🛏️</div>
              <div className="detail-info">
                <span className="detail-label">Bed Size</span>
                <span className="detail-value">{room.bedSize}</span>
              </div>
            </div>

            <div className="detail-card">
              <div className="detail-icon">👥</div>
              <div className="detail-info">
                <span className="detail-label">Capacity</span>
                <span className="detail-value">{room.capacity}</span>
              </div>
            </div>

            <div className="detail-card">
              <div className="detail-icon">🏷️</div>
              <div className="detail-info">
                <span className="detail-label">Room Type</span>
                <span className="detail-value">{room.type}</span>
              </div>
            </div>

            <div className="detail-card">
              <div className="detail-icon">🌆</div>
              <div className="detail-info">
                <span className="detail-label">View</span>
                <span className="detail-value">{room.view}</span>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default RoomDetails;