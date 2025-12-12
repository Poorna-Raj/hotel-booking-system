import React, { useState } from "react";
import "./AddRoom.css";
import { useNavigate } from "react-router-dom";

const AddRoomForm = ({ onClose, onSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    roomType: "",
    bedType: "",
    bedCount: 1,
    basePrice: 0,
    createdBy: 0,
    imageNo1: "",
    imageNo2: "",
    imageNo3: "",
    imageNo4: "",
  });

  const [errors, setErrors] = useState({});
  const userId = localStorage.getItem("userId");
  if (!userId) {
    navigate("/");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Room name is required";
    if (!formData.roomType.trim()) newErrors.roomType = "Room type is required";
    if (!formData.bedType.trim()) newErrors.bedType = "Bed type is required";
    if (!formData.bedCount) newErrors.bedCount = "Bed count is required";
    if (!formData.basePrice) newErrors.basePrice = "Base price is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      ...formData,
      bedCount: Number(formData.bedCount),
      basePrice: Number(formData.basePrice),
      createdBy: Number(formData.createdBy),
    };

    onSubmit(payload);
    console.log("Submitted Data ->", payload);
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <div className="form-header">
          <h2>Add New Room</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="room-form">
          <div className="form-grid">
            {/* Name */}
            <div className="form-group">
              <label>Room Name *</label>
              <input
                type="text"
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
              <label>Room Type *</label>
              <select
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
                className={errors.roomType ? "error" : ""}
              >
                <option value="">Select Room Type</option>
                <option value="STANDARD">Standard</option>
                <option value="DELUXE">Deluxe</option>
                <option value="LUXURY">Luxury</option>
                <option value="SUITE">Suite</option>
              </select>
              {errors.roomType && (
                <span className="error-message">{errors.roomType}</span>
              )}
            </div>

            {/* Bed Type */}
            <div className="form-group">
              <label>Bed Type *</label>
              <select
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
              <label>Bed Count *</label>
              <input
                type="number"
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

            {/* Base Price */}
            <div className="form-group">
              <label>Base Price *</label>
              <input
                type="number"
                name="basePrice"
                value={formData.basePrice}
                onChange={handleChange}
                className={errors.basePrice ? "error" : ""}
              />
              {errors.basePrice && (
                <span className="error-message">{errors.basePrice}</span>
              )}
            </div>

            {/* Created By */}
            <div className="form-group">
              <label>Created By (User ID)</label>
              <input
                type="number"
                name="createdBy"
                value={userId}
                onChange={handleChange}
              />
            </div>

            {/* Images */}
            {["imageNo1", "imageNo2", "imageNo3", "imageNo4"].map(
              (img, idx) => (
                <div className="form-group" key={idx}>
                  <label>{`Image ${idx + 1}`}</label>
                  <input
                    type="text"
                    name={img}
                    placeholder="Image URL or file name"
                    value={formData[img]}
                    onChange={handleChange}
                  />
                </div>
              )
            )}
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Add Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRoomForm;
