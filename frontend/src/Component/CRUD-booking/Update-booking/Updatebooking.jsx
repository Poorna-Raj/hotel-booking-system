import { useState } from "react";
import "./Update-booking.css";
import { updateBooking } from "./api";

function UpdateBooking({ booking, setShowUpdateBookingModal }) {
  const [formData, setFormData] = useState({
    roomId: booking.roomId,
    checkIn: booking.checkIn,
    checkOut: booking.checkOut,
    bookingStatus: booking.bookingStatus,
    customerName: booking.customerName,
    customerNic: booking.customerNic,
    occupancy: booking.occupancy,
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.customerName.trim())
      newErrors.customerName = "Customer name is required";
    if (!formData.customerNic.trim())
      newErrors.customerNic = "customerNic is required";
    if (!formData.checkIn) newErrors.checkIn = "Check-in date is required";
    if (!formData.checkOut) newErrors.checkOut = "Check-out date is required";
    if (!formData.bookingStatus)
      newErrors.bookingStatus = "bookingStatus is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await updateBooking(booking.id, formData);
      if (res.status === 200) {
        alert("Update Success");
      }
    } catch (err) {
      if (err.response) {
        console.error("Backend error:", err.response.data);
        console.error("Status:", err.response.status);
        console.error("Message:", err.response.data.message);
        alert(err.response.data.message);
      } else {
        console.error("Network/Unexpected error:", err);
        alert("Unexpected error occurred");
      }
    }

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="modal-overlay">
      <div className="booking-container">
        <div className="booking-form-wrapper">
          <button
            className="modal-close-btn"
            onClick={() => setShowUpdateBookingModal(false)}
          >
            X
          </button>

          <h2 className="booking-title">Update Booking</h2>

          {submitted && (
            <div className="success-message">Booking updated successfully!</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Customer Name *</label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                className="form-input"
                placeholder="Arosh Smith"
              />
              {errors.customerName && (
                <p className="form-error">{errors.customerName}</p>
              )}
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
                  placeholder="6589745862V"
                />
                {errors.customerNic && (
                  <p className="form-error">{errors.customerNic}</p>
                )}
              </div>
              <div className="form-group">
                <label className="form-label">Room ID</label>
                <input
                  type="number"
                  name="phone"
                  value={formData.roomId}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="1"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Check-in Date *</label>
                <input
                  type="datetime-local"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  className="form-input"
                />
                {errors.checkIn && (
                  <p className="form-error">{errors.checkIn}</p>
                )}
              </div>
              <div className="form-group">
                <label className="form-label">Check-out Date *</label>
                <input
                  type="datetime-local"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  className="form-input"
                />
                {errors.checkOut && (
                  <p className="form-error">{errors.checkOut}</p>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Booking Status *</label>
                <select
                  name="bookingStatus"
                  value={formData.bookingStatus}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Select Status</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="BOOKED">Booked</option>
                  <option value="CANCELED">Canceled</option>
                </select>
                {errors.bookingStatus && (
                  <p className="form-error">{errors.bookingStatus}</p>
                )}
              </div>
              <div className="form-group">
                <label className="form-label">Number of Guests *</label>
                <input
                  type="number"
                  name="occupancy"
                  value={formData.occupancy}
                  onChange={handleChange}
                  className="form-input"
                  min="1"
                  max="10"
                />
              </div>
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
