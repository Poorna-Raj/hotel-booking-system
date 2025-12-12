import { useState } from 'react';
import './Add-Booking.css';

function AddBooking({ setShowAddBookingModal }) {
  const [formData, setFormData] = useState({
    roomId: '',
    createdBy: '',
    guestName: '',
    customerNic: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    paymentType: '',
    transactionId: '',
    advancePayment: 0,
    guests: 1,
    specialRequests: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (backendError) setBackendError('');
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.roomId || Number.isNaN(Number(formData.roomId)) || Number(formData.roomId) <= 0) {
      newErrors.roomId = 'Room ID must be a positive number';
    }
    if (!formData.createdBy || Number.isNaN(Number(formData.createdBy)) || Number(formData.createdBy) <= 0) {
      newErrors.createdBy = 'CreatedBy (User ID) must be a positive number';
    }
    if (!formData.guestName.trim()) newErrors.guestName = 'Customer name is required';
    if (!formData.customerNic.trim()) newErrors.customerNic = 'Customer NIC is required';
    if (!formData.paymentType.trim()) newErrors.paymentType = 'Payment type is required';
    if (!formData.transactionId.trim()) newErrors.transactionId = 'Transaction ID is required';
    // advancePayment must be >= 0
    if (formData.advancePayment === '' || Number.isNaN(Number(formData.advancePayment)) || Number(formData.advancePayment) < 0) {
      newErrors.advancePayment = 'Advance payment must be a non-negative number';
    }
    // occupancy
    if (!formData.guests || Number.isNaN(Number(formData.guests)) || Number(formData.guests) <= 0) {
      newErrors.guests = 'Occupancy must be a positive number';
    }
    // check-in/out
    if (!formData.checkIn) newErrors.checkIn = 'Check-in date is required';
    if (!formData.checkOut) newErrors.checkOut = 'Check-out date is required';
    // verify checkIn <= checkOut
    if (formData.checkIn && formData.checkOut) {
      const inDate = new Date(formData.checkIn);
      const outDate = new Date(formData.checkOut);
      if (inDate > outDate) newErrors.checkOut = 'Check-out date must be after check-in';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // helper to convert date input (YYYY-MM-DD) to LocalDateTime string expected by backend
  const toLocalDateTime = (dateStr) => {
    // add noon time to avoid timezone edge cases: YYYY-MM-DDT12:00:00
    return `${dateStr}T12:00:00`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBackendError('');
    if (!validate()) return;

    const dto = {
      roomId: Number(formData.roomId),
      createdBy: Number(formData.createdBy),
      checkIn: toLocalDateTime(formData.checkIn),
      checkOut: toLocalDateTime(formData.checkOut),
      bookingStatus: 'Booked',
      customerName: formData.guestName.trim(),
      customerNic: formData.customerNic.trim(),
      advancePayment: Number(formData.advancePayment),
      paymentType: formData.paymentType.trim(),
      transactionId: formData.transactionId.trim(),
      occupancy: Number(formData.guests)
    };

    try {
      const response = await fetch('http://localhost:8082/booking-service/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto)
      });

      if (!response.ok) {
        // Try to parse backend validation message
        let msg = 'Failed to add booking';
        try {
          const data = await response.json();
          // backend returns combined message in `message` (from your example)
          msg = data.message || JSON.stringify(data);
        } catch (err) {
          // non-json response
          msg = `Server returned ${response.status}`;
        }
        setBackendError(msg);
        return;
      }

      // success
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2500);

      // reset form
      setFormData({
        roomId: '',
        createdBy: '',
        guestName: '',
        customerNic: '',
        email: '',
        phone: '',
        checkIn: '',
        checkOut: '',
        paymentType: '',
        transactionId: '',
        advancePayment: 0,
        guests: 1,
        specialRequests: ''
      });

      // close modal if caller provided the setter
      if (typeof setShowAddBookingModal === 'function') {
        setShowAddBookingModal(false);
      }
    } catch (err) {
      console.error(err);
      setBackendError('Network or server error — please try again.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="booking-container">
        <div className="booking-form-wrapper">
          <button className="modal-close-btn" onClick={() => typeof setShowAddBookingModal === 'function' ? setShowAddBookingModal(false) : null}>
            X
          </button>

          <h2 className="booking-title">Add New Booking</h2>

          {submitted && (
            <div className="success-message">
              Booking added successfully!
            </div>
          )}

          {backendError && (
            <div className="backend-error">
              {backendError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Room ID *</label>
                <input
                  type="number"
                  name="roomId"
                  value={formData.roomId}
                  onChange={handleChange}
                  className="form-input"
                  min="1"
                />
                {errors.roomId && <p className="form-error">{errors.roomId}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Created By (User ID) *</label>
                <input
                  type="number"
                  name="createdBy"
                  value={formData.createdBy}
                  onChange={handleChange}
                  className="form-input"
                  min="1"
                />
                {errors.createdBy && <p className="form-error">{errors.createdBy}</p>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Guest Name *</label>
              <input
                type="text"
                name="guestName"
                value={formData.guestName}
                onChange={handleChange}
                className="form-input"
              />
              {errors.guestName && <p className="form-error">{errors.guestName}</p>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Customer NIC *</label>
                <input
                  type="text"
                  name="customerNic"
                  value={formData.customerNic}
                  onChange={handleChange}
                  className="form-input"
                />
                {errors.customerNic && <p className="form-error">{errors.customerNic}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
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
                <label className="form-label">Payment Type *</label>
                <input
                  type="text"
                  name="paymentType"
                  value={formData.paymentType}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g. CARD, CASH, ONLINE"
                />
                {errors.paymentType && <p className="form-error">{errors.paymentType}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Transaction ID *</label>
                <input
                  type="text"
                  name="transactionId"
                  value={formData.transactionId}
                  onChange={handleChange}
                  className="form-input"
                />
                {errors.transactionId && <p className="form-error">{errors.transactionId}</p>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Advance Payment</label>
                <input
                  type="number"
                  name="advancePayment"
                  value={formData.advancePayment}
                  onChange={handleChange}
                  className="form-input"
                  min="0"
                />
                {errors.advancePayment && <p className="form-error">{errors.advancePayment}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Occupancy *</label>
                <input
                  type="number"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="form-input"
                  min="1"
                />
                {errors.guests && <p className="form-error">{errors.guests}</p>}
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
              />
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-button" onClick={() => typeof setShowAddBookingModal === 'function' ? setShowAddBookingModal(false) : null}>
                Cancel
              </button>
              <button type="submit" className="submit-btn">
                Add Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBooking;
