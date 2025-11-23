import React from 'react';
import './Delete-booking.css';

function DeleteBookingModal({ isOpen, onClose, onDelete }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Are you sure you want to delete this booking?</h2>
        <p className="modal-description">
          This action cannot be undone. Deleting the booking will remove all associated data permanently.
        </p>
        
        <div className="modal-actions">
          <button className="btn-delete" onClick={onDelete}>Delete</button>
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteBookingModal;
