import { useState, useEffect } from 'react';
import './Viewbooking.css';

function ViewBooking({ setShowViewBookingModal, bookingDetails }) {
  const [formData, setFormData] = useState({
    guestName: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    roomType: '',
    guests: 1,
    specialRequests: '',
    advancedPayment: 0,  // Advanced payment state
    total: 0,            // Total price state
    balance: 0           // Balance state
  });

  // Initialize formData with booking details passed from props
  useEffect(() => {
    if (bookingDetails) {
      setFormData({
        guestName: bookingDetails.guestName || '',
        email: bookingDetails.email || '',
        phone: bookingDetails.phone || '',
        checkIn: bookingDetails.checkIn || '',
        checkOut: bookingDetails.checkOut || '',
        roomType: bookingDetails.roomType || '',
        guests: bookingDetails.guests || 1,
        specialRequests: bookingDetails.specialRequests || '',
        advancedPayment: bookingDetails.advancedPayment || 0,
        total: bookingDetails.total || 0,
        balance: bookingDetails.balance || 0
      });
    }
  }, [bookingDetails]);

  const calculatePrice = () => {
    const roomPrices = {
      standard: 100, // Example price for standard room
      deluxe: 150,   // Example price for deluxe room
      suite: 200,    // Example price for suite
      penthouse: 300 // Example price for penthouse
    };

    const basePrice = roomPrices[formData.roomType] || 0;
    const totalPrice = basePrice * formData.guests;

    const advancedPayment = formData.advancedPayment;
    const balance = totalPrice - advancedPayment;

    setFormData(prev => ({
      ...prev,
      total: totalPrice,
      balance: balance
    }));
  };

  useEffect(() => {
    if (formData.roomType && formData.guests) {
      calculatePrice();
    }
  }, [formData.roomType, formData.guests]); // Recalculate when room type or guests change

  return (
    <div className="modal-overlay">
      <div className="booking-container">
        <div className="booking-form-wrapper">
          {/* Close Button inside the header */}
          <button className="modal-close-btn" onClick={() => setShowViewBookingModal(false)}>
            X
          </button>
          
          <h2 className="booking-title">View Booking</h2>

          {/* Display booking details */}
          <div className="form-group">
            <label className="form-label">Guest Name</label>
            <input
              type="text"
              name="guestName"
              value={formData.guestName}
              className="form-input"
              readOnly
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                className="form-input"
                readOnly
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                className="form-input"
                readOnly
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Check-in Date</label>
              <input
                type="date"
                name="checkIn"
                value={formData.checkIn}
                className="form-input"
                readOnly
              />
            </div>
            <div className="form-group">
              <label className="form-label">Check-out Date</label>
              <input
                type="date"
                name="checkOut"
                value={formData.checkOut}
                className="form-input"
                readOnly
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Room Type</label>
              <input
                type="text"
                name="roomType"
                value={formData.roomType}
                className="form-input"
                readOnly
              />
            </div>
            <div className="form-group">
              <label className="form-label">Number of Guests</label>
              <input
                type="number"
                name="guests"
                value={formData.guests}
                className="form-input"
                readOnly
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Special Requests</label>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              className="form-textarea"
              rows="3"
              readOnly
            />
          </div>

          {/* Advanced Payment, Total, and Balance */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Advanced Payment</label>
              <input
                type="text"
                value={`$${formData.advancedPayment}`}
                className="form-input"
                readOnly
              />
            </div>
            <div className="form-group">
              <label className="form-label">Total</label>
              <input
                type="text"
                value={`$${formData.total}`}
                className="form-input"
                readOnly
              />
            </div>
            <div className="form-group">
              <label className="form-label">Balance</label>
              <input
                type="text"
                value={`$${formData.balance}`}
                className="form-input"
                readOnly
              />
            </div>
          </div>

          {/* No Submit button as this is just for viewing the details */}
        </div>
      </div>
    </div>
  );
}

export default ViewBooking;
