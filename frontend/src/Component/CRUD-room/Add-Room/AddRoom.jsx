import React, { useState } from 'react';
import './AddRoom.css';

const AddRoomForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    roomNumber: '',
    type: '',
    bedSize: '',
    floor: '',
    capacity: '',
    view: '',
    price: '',
    status: 'Available',
    mainImage: null,
    additionalImages: []
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'mainImage') {
      setFormData({
        ...formData,
        mainImage: files[0]
      });
    } else if (name === 'additionalImages') {
      setFormData({
        ...formData,
        additionalImages: Array.from(files)
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Room name is required';
    if (!formData.roomNumber.trim()) newErrors.roomNumber = 'Room number is required';
    if (!formData.type) newErrors.type = 'Room type is required';
    if (!formData.bedSize) newErrors.bedSize = 'Bed size is required';
    if (!formData.floor.trim()) newErrors.floor = 'Floor is required';
    if (!formData.capacity.trim()) newErrors.capacity = 'Capacity is required';
    if (!formData.price.trim()) newErrors.price = 'Price is required';
    if (!formData.mainImage) newErrors.mainImage = 'Main image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      console.log('Form submitted:', formData);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <div className="form-header">
          <h2>Add New Room</h2>
          <button className="close-button" onClick={handleCancel}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="room-form">
          <div className="form-grid">
            {/* Room Name */}
            <div className="form-group">
              <label htmlFor="name">Room Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Deluxe Suite"
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            {/* Room Number */}
            <div className="form-group">
              <label htmlFor="roomNumber">Room Number *</label>
              <input
                type="text"
                id="roomNumber"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleChange}
                placeholder="e.g., 101"
                className={errors.roomNumber ? 'error' : ''}
              />
              {errors.roomNumber && <span className="error-message">{errors.roomNumber}</span>}
            </div>

            {/* Room Type */}
            <div className="form-group">
              <label htmlFor="type">Room Type *</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={errors.type ? 'error' : ''}
              >
                <option value="">Select Type</option>
                <option value="Standard">Standard</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Luxury">Luxury</option>
                <option value="Suite">Suite</option>
              </select>
              {errors.type && <span className="error-message">{errors.type}</span>}
            </div>

            {/* Bed Size */}
            <div className="form-group">
              <label htmlFor="bedSize">Bed Size *</label>
              <select
                id="bedSize"
                name="bedSize"
                value={formData.bedSize}
                onChange={handleChange}
                className={errors.bedSize ? 'error' : ''}
              >
                <option value="">Select Bed Size</option>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Queen Size">Queen Size</option>
                <option value="King Size">King Size</option>
              </select>
              {errors.bedSize && <span className="error-message">{errors.bedSize}</span>}
            </div>

            {/* Floor */}
            <div className="form-group">
              <label htmlFor="floor">Floor *</label>
              <input
                type="text"
                id="floor"
                name="floor"
                value={formData.floor}
                onChange={handleChange}
                placeholder="e.g., 1st Floor"
                className={errors.floor ? 'error' : ''}
              />
              {errors.floor && <span className="error-message">{errors.floor}</span>}
            </div>

            {/* Capacity */}
            <div className="form-group">
              <label htmlFor="capacity">Capacity *</label>
              <input
                type="text"
                id="capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="e.g., 2 Adults"
                className={errors.capacity ? 'error' : ''}
              />
              {errors.capacity && <span className="error-message">{errors.capacity}</span>}
            </div>

            {/* View */}
            <div className="form-group">
              <label htmlFor="view">View</label>
              <input
                type="text"
                id="view"
                name="view"
                value={formData.view}
                onChange={handleChange}
                placeholder="e.g., City View, Sea View"
              />
            </div>

            {/* Price */}
            <div className="form-group">
              <label htmlFor="price">Price (Rs.) *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g., 12500"
                className={errors.price ? 'error' : ''}
              />
              {errors.price && <span className="error-message">{errors.price}</span>}
            </div>

            {/* Status */}
            <div className="form-group">
              <label htmlFor="status">Status *</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Available">Available</option>
                <option value="Booked">Booked</option>
              </select>
            </div>
          </div>

          {/* Main Image */}
          <div className="form-group full-width">
            <label htmlFor="mainImage">Main Image *</label>
            <input
              type="file"
              id="mainImage"
              name="mainImage"
              accept="image/*"
              onChange={handleFileChange}
              className={errors.mainImage ? 'error' : ''}
            />
            {errors.mainImage && <span className="error-message">{errors.mainImage}</span>}
          </div>

          {/* Additional Images */}
          <div className="form-group full-width">
            <label htmlFor="additionalImages">Additional Images (Max 3)</label>
            <input
              type="file"
              id="additionalImages"
              name="additionalImages"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
            <span className="helper-text">You can select up to 3 images</span>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={handleCancel}>
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