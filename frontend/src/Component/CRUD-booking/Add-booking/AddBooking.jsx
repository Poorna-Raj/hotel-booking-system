import { useState } from 'react';
import './Add-Booking.css';

function AddBooking({ setShowAddBookingModal }) {
  const [formData, setFormData] = useState({
    guestName: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    roomType: '',
    guests: 1,
    specialRequests: '',
    advancedPayment: 0, // New state for advanced payment
    total: 0,           // New state for total price
    balance: 0          // New state for balance
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

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

  const validate = () => {
    const newErrors = {};
    if (!formData.guestName.trim()) newErrors.guestName = 'Guest name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.checkIn) newErrors.checkIn = 'Check-in date is required';
    if (!formData.checkOut) newErrors.checkOut = 'Check-out date is required';
    if (!formData.roomType) newErrors.roomType = 'Room type is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    console.log('Booking submitted:', formData);
    // Add your API call here to save booking
    
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({
      guestName: '',
      email: '',
      phone: '',
      checkIn: '',
      checkOut: '',
      roomType: '',
      guests: 1,
      specialRequests: '',
      advancedPayment: 0,
      total: 0,
      balance: 0
    });
  };

  return (
    <div className="modal-overlay">
      <div className="booking-container">
        <div className="booking-form-wrapper">
          <button className="modal-close-btn" onClick={() => setShowAddBookingModal(false)}>
            X
          </button>
          
          <h2 className="booking-title">Add New Booking</h2>

          {submitted && (
            <div className="success-message">
              Booking added successfully!
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Guest Name *</label>
              <input
                type="text"
                name="guestName"
                value={formData.guestName}
                onChange={handleChange}
                className="form-input"
                placeholder="Arosh Smith"
              />
              {errors.guestName && <p className="form-error">{errors.guestName}</p>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="smith32gampaha@.com"
                />
                {errors.email && <p className="form-error">{errors.email}</p>}
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="+94 712345678"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Check-in Date *</label>
                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  className="form-input"
                />
                {errors.checkIn && <p className="form-error">{errors.checkIn}</p>}
              </div>
              <div className="form-group">
                <label className="form-label">Check-out Date *</label>
                <input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  className="form-input"
                />
                {errors.checkOut && <p className="form-error">{errors.checkOut}</p>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Room Type *</label>
                <select
                  name="roomType"
                  value={formData.roomType}
                  onChange={(e) => {
                    handleChange(e);
                    calculatePrice(); // Recalculate price when room type changes
                  }}
                  className="form-select"
                >
                  <option value="">Select Room</option>
                  <option value="standard">Standard Room</option>
                  <option value="deluxe">Deluxe Room</option>
                  <option value="suite">Suite</option>
                  <option value="penthouse">Penthouse</option>
                </select>
                {errors.roomType && <p className="form-error">{errors.roomType}</p>}
              </div>
              <div className="form-group">
                <label className="form-label">Number of Guests *</label>
                <input
                  type="number"
                  name="guests"
                  value={formData.guests}
                  onChange={(e) => {
                    handleChange(e);
                    calculatePrice(); // Recalculate price when guests number changes
                  }}
                  className="form-input"
                  min="1"
                  max="10"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Special Requests</label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                className="form-textarea"
                rows="3"
                placeholder="Any special requirements..."
              />
            </div>

            {/* Advanced Payment */}
            <div className="form-group">
              <label className="form-label">Advanced Payment</label>
              <input
                type="number"
                name="advancedPayment"
                value={formData.advancedPayment}
                onChange={(e) => {
                  handleChange(e);
                  calculatePrice(); // Recalculate balance when advanced payment changes
                }}
                className="form-input"
                min="0"
                max={formData.total} // Ensure advanced payment is not greater than the total
              />
            </div>

            {/* Total and Balance */}
            <div className="form-row">
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

            <button type="submit" className="submit-btn">
              Add Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBooking;
