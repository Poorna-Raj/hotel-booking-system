import { useState } from 'react';
import './Update-booking.css';

function UpdateBooking({ setShowUpdateBookingModal }) {
  const [formData, setFormData] = useState({
    guestName: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    roomType: '',
    guests: 1,
    specialRequests: ''
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
    
    console.log('Booking updated:', formData);
    // Add your API call here to save updated booking
    
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
      specialRequests: ''
    });
  };

  return (
    <div className="modal-overlay">
      <div className="booking-container">
        <div className="booking-form-wrapper">
          {/* Close Button inside the header */}
          <button className="modal-close-btn" onClick={() => setShowUpdateBookingModal(false)}>
            X
          </button>
          
          <h2 className="booking-title">Update Booking</h2>

          {submitted && (
            <div className="success-message">
              Booking updated successfully!
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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

            <button type="submit" className="submit-btn">
              Update Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateBooking;
