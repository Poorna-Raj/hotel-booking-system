import React, { useState } from "react";
import "./UpdateRoom.css";

const UpdateRoomForm = ({ room, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: room.name,
    roomType: room.roomType,
    bedType: room.bedType,
    bedCount: room.bedCount,
    roomStatus: room.roomStatus,
    basePrice: room.basePrice,
    imageNo1: room.imageNo1,
    imageNo2: room.imageNo2,
    imageNo3: room.imageNo3,
    imageNo4: room.imageNo4,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Room name is required";
    if (!formData.roomType) newErrors.roomType = "Room type is required";
    if (!formData.bedType) newErrors.bedType = "Bed type is required";
    if (!formData.bedCount || formData.bedCount < 1)
      newErrors.bedCount = "Bed count must be at least 1";
    if (!formData.roomStatus) newErrors.roomStatus = "Room status is required";
    if (!formData.basePrice || formData.basePrice <= 0)
      newErrors.basePrice = "Base price must be greater than 0";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
      console.log("Form updated:", formData);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <div className="form-header">
          <h2>Update Room</h2>
          <button className="close-button" onClick={handleCancel}>
            ×
          </button>
        </div>

        <div className="room-form">
          <div className="form-grid">
            {/* Name */}
            <div className="form-group">
              <label htmlFor="name">Room Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "error" : ""}
              />
              {errors.name && (
                <span className="error-message">{errors.name}</span>
              )}
            </div>

            {/* Room Type */}
            <div className="form-group">
              <label htmlFor="roomType">Room Type *</label>
              <select
                id="roomType"
                name="roomType"
                value={formData.roomType || ""}
                onChange={handleChange}
                className={errors.roomType ? "error" : ""}
              >
                <option value="">Select Type</option>
                <option value="STANDARD">Standard</option>
                <option value="DELUXE">Deluxe</option>
                <option value="FAMILY">Family</option>
                <option value="SUITE">Suite</option>
              </select>
              {errors.roomType && (
                <span className="error-message">{errors.roomType}</span>
              )}
            </div>

            {/* Bed Type */}
            <div className="form-group">
              <label htmlFor="bedType">Bed Type *</label>
              <select
                id="bedType"
                name="bedType"
                value={formData.bedType}
                onChange={handleChange}
                className={errors.bedType ? "error" : ""}
              >
                <option value="">Select Bed Type</option>
                <option value="SINGLE">Single</option>
                <option value="DOUBLE">Double</option>
                <option value="QUEEN">Queen</option>
                <option value="KING">King</option>
              </select>
              {errors.bedType && (
                <span className="error-message">{errors.bedType}</span>
              )}
            </div>

            {/* Bed Count */}
            <div className="form-group">
              <label htmlFor="bedCount">Bed Count *</label>
              <input
                type="number"
                id="bedCount"
                name="bedCount"
                min="1"
                value={formData.bedCount}
                onChange={handleChange}
                className={errors.bedCount ? "error" : ""}
              />
              {errors.bedCount && (
                <span className="error-message">{errors.bedCount}</span>
              )}
            </div>

            {/* Room Status */}
            <div className="form-group">
              <label htmlFor="roomStatus">Status *</label>
              <select
                id="roomStatus"
                name="roomStatus"
                value={formData.roomStatus}
                onChange={handleChange}
                className={errors.roomStatus ? "error" : ""}
              >
                <option value="">Select Status</option>
                <option value="AVAILABLE">Available</option>
                <option value="BOOKED">Booked</option>
                <option value="MAINTENANCE">Maintenance</option>
                <option value="UNAVAILABLE">Unavailable</option>
              </select>
              {errors.roomStatus && (
                <span className="error-message">{errors.roomStatus}</span>
              )}
            </div>

            {/* Base Price */}
            <div className="form-group">
              <label htmlFor="basePrice">Base Price (Rs.) *</label>
              <input
                type="number"
                id="basePrice"
                name="basePrice"
                min="0"
                step="0.01"
                value={formData.basePrice}
                onChange={handleChange}
                className={errors.basePrice ? "error" : ""}
              />
              {errors.basePrice && (
                <span className="error-message">{errors.basePrice}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="imageNo1">Image 1 URL</label>
            <input
              type="text"
              id="imageNo1"
              name="imageNo1"
              value={formData.imageNo1}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="imageNo2">Image 2 URL</label>
            <input
              type="text"
              id="imageNo2"
              name="imageNo2"
              value={formData.imageNo2}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="imageNo3">Image 3 URL</label>
            <input
              type="text"
              id="imageNo3"
              name="imageNo3"
              value={formData.imageNo3}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="imageNo4">Image 4 URL</label>
            <input
              type="text"
              id="imageNo4"
              name="imageNo4"
              value={formData.imageNo4}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
            <button className="submit-button" onClick={handleSubmit}>
              Update Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateRoomForm;
