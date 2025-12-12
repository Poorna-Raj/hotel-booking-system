import { useState } from "react";
import "./Add-Booking.css";
import { useNavigate } from "react-router-dom";
import { addNewBooking } from "./api";

function AddBooking({ setShowAddBookingModal }) {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  if (!userId) {
    navigate("/");
  }
  const [formData, setFormData] = useState({
    roomId: 0,
    createdBy: Number(userId),
    checkIn: "",
    checkOut: "",
    bookingStatus: "",
    customerName: "",
    customerNic: "",
    advancePayment: 0,
    paymentType: "",
    transactionId: "",
    occupancy: 1,
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

    if (!formData.customerNic.trim()) newErrors.customerNic = "NIC is required";

    if (!formData.roomId || formData.roomId <= 0)
      newErrors.roomId = "Room ID is required";

    if (!formData.checkIn) newErrors.checkIn = "Check-in date is required";

    if (!formData.checkOut) newErrors.checkOut = "Check-out date is required";

    if (!formData.bookingStatus)
      newErrors.bookingStatus = "Booking status is required";

    if (!formData.paymentType)
      newErrors.paymentType = "Payment type is required";

    if (formData.occupancy <= 0)
      newErrors.occupancy = "Occupancy must be at least 1";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...formData,
      checkIn: formData.checkIn + ":00",
      checkOut: formData.checkOut + ":00",
    };

    try {
      const res = await addNewBooking(payload);
      console.log(res);
      if (res.status === 201 || res.status === 200) {
        console.log("new booking added!");
        setShowAddBookingModal(false);
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
            onClick={() => setShowAddBookingModal(false)}
          >
            X
          </button>

          <h2 className="booking-title">Add New Booking</h2>

          {submitted && (
            <div className="success-message">Booking added successfully!</div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Room ID */}
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

            {/* Customer Name */}
            <div className="form-group">
              <label className="form-label">Customer Name *</label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                className="form-input"
              />
              {errors.customerName && (
                <p className="form-error">{errors.customerName}</p>
              )}
            </div>

            {/* Customer NIC */}
            <div className="form-group">
              <label className="form-label">Customer NIC *</label>
              <input
                type="text"
                name="customerNic"
                value={formData.customerNic}
                onChange={handleChange}
                className="form-input"
              />
              {errors.customerNic && (
                <p className="form-error">{errors.customerNic}</p>
              )}
            </div>

            {/* Dates */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Check-In Date *</label>
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
                <label className="form-label">Check-Out Date *</label>
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

            {/* Booking Status */}
            <div className="form-group">
              <label className="form-label">Booking Status *</label>
              <select
                name="bookingStatus"
                value={formData.bookingStatus}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Select Status</option>
                <option value="BOOKED">Booked</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="COMPLETED">Completed</option>
              </select>
              {errors.bookingStatus && (
                <p className="form-error">{errors.bookingStatus}</p>
              )}
            </div>

            {/* Occupancy */}
            <div className="form-group">
              <label className="form-label">Occupancy *</label>
              <input
                type="number"
                name="occupancy"
                value={formData.occupancy}
                onChange={handleChange}
                className="form-input"
                min="1"
              />
              {errors.occupancy && (
                <p className="form-error">{errors.occupancy}</p>
              )}
            </div>

            {/* Advance Payment */}
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
            </div>

            {/* Payment Type */}
            <div className="form-group">
              <label className="form-label">Payment Type *</label>
              <select
                name="paymentType"
                value={formData.paymentType}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Select Payment Type</option>
                <option value="CASH">Cash</option>
                <option value="CARD">Card</option>
              </select>
              {errors.paymentType && (
                <p className="form-error">{errors.paymentType}</p>
              )}
            </div>

            {/* Transaction ID */}
            <div className="form-group">
              <label className="form-label">Transaction ID *</label>
              <input
                type="text"
                name="transactionId"
                value={formData.transactionId}
                onChange={handleChange}
                className="form-input"
              />
              {errors.transactionId && (
                <p className="form-error">{errors.transactionId}</p>
              )}
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
