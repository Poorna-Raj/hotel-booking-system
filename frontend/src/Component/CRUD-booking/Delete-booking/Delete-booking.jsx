import React from "react";
import "./Delete-booking.css";

function DeleteBookingModal({ booking, onClose, handleConfirmDelete }) {
  const handleDelete = () => {
    handleConfirmDelete(booking.id);
    console.log("Booking deleted:", booking.id);
  };

  const handleCancel = () => {
    console.log("Cancel button clicked");
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleCancel}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="delete-icon">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" stroke="#dc3545" strokeWidth="2" />
            <path
              d="M12 8V12"
              stroke="#dc3545"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="12" cy="16" r="1" fill="#dc3545" />
          </svg>
        </div>

        <h2 className="modal-title">
          Are you sure you want to delete this booking?
        </h2>

        <p className="modal-description">
          This action cannot be undone. Deleting the booking for{" "}
          <strong>{booking.guestName}</strong> will remove all associated data
          permanently.
        </p>

        <div className="booking-info-preview">
          <div className="info-item">
            <span className="info-label">Customer Name:</span>
            <span className="info-value">{booking.customerName}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Customer NIC:</span>
            <span className="info-value">{booking.customerNic}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Booking Status:</span>
            <span className="info-value">{booking.bookingStatus}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Check-in:</span>
            <span className="info-value">{booking.checkIn}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Check-out:</span>
            <span className="info-value">{booking.checkOut}</span>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn-delete" onClick={handleDelete}>
            Delete
          </button>
          <button className="btn-cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteBookingModal;
