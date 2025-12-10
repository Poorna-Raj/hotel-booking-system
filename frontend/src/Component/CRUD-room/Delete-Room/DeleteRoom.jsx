import React from 'react';
import './DeleteRoom.css';

const DeleteRoomModal = ({ room, onClose, onConfirm }) => {
  const handleDelete = () => {
    onConfirm(room.id);
    console.log('Room deleted:', room.id);
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="delete-overlay">
      <div className="delete-modal">
        <div className="delete-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="#dc3545" strokeWidth="2"/>
            <path d="M12 8V12" stroke="#dc3545" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="12" cy="16" r="1" fill="#dc3545"/>
          </svg>
        </div>

        <h2 className="delete-title">Delete Room?</h2>
        
        <p className="delete-message">
          Are you sure you want to delete <strong>{room.name}</strong>?
        </p>
        
        <div className="room-info-preview">
          <div className="info-item">
            <span className="info-label">Room Number:</span>
            <span className="info-value">{room.roomNumber}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Type:</span>
            <span className="info-value">{room.type}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Price:</span>
            <span className="info-value">Rs. {room.price?.toLocaleString()}</span>
          </div>
        </div>

        <p className="delete-warning">
          This action cannot be undone. All room data will be permanently deleted.
        </p>

        <div className="delete-actions">
          <button className="delete-cancel-button" onClick={handleCancel}>
            Cancel
          </button>
          <button className="delete-confirm-button" onClick={handleDelete}>
            Delete Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteRoomModal;