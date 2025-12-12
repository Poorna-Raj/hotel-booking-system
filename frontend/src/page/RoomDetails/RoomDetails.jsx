import React, { startTransition, useEffect, useState } from "react";
import "./RoomDetails.css";
import UpdateRoomForm from "../../Component/CRUD-room/Update-Room/UpdateRoom";
import DeleteRoomModal from "../../Component/CRUD-room/Delete-Room/DeleteRoom";
import { useNavigate, useParams } from "react-router-dom";
import { deleteRoomById, getRoomById, updateRoomById } from "./api";

const RoomDetails = () => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { id } = useParams();
  const [roomData, setRoomData] = useState(null);
  const navigate = useNavigate();

  const fetchRoom = async () => {
    try {
      const res = await getRoomById(id);
      if (res.status === 200) {
        startTransition(() => {
          setRoomData(res.data);
        });
      }
    } catch (err) {
      console.error(err.message);
      alert(err.error);
    }
  };

  useEffect(() => {
    fetchRoom();
  }, [id]);

  const handleUpdate = () => {
    setShowUpdateForm(true);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleBack = () => {
    navigate("/RoomList");
  };

  const handleCloseUpdateForm = () => {
    setShowUpdateForm(false);
  };

  const handleUpdateSubmit = async (formData) => {
    try {
      const userId = localStorage.getItem("userId");
      const res = await updateRoomById(id, formData, userId);
      if (res.status === 200) {
        alert("Successfully updated!");
        fetchRoom();
      }
    } catch (err) {
      console.error("Failed to update room: ", err);
      alert(err.message);
    }
    setShowUpdateForm(false);

    // You might want to refresh the room data or navigate back
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteConfirm = async (roomId) => {
    try {
      const userId = localStorage.getItem("userId");
      const res = await deleteRoomById(roomId, userId);
      if (res.status === 200) {
        alert("Successfully deleted!");
        fetchRoom();
      }
    } catch (err) {
      console.error("Failed to delete room: ", err);
      alert(err.message);
    }
    setShowDeleteModal(false);
    navigate("/RoomList");
  };

  if (!roomData) return <p>Loading room details...</p>;

  const additionalImages = [
    roomData.imageNo2,
    roomData.imageNo3,
    roomData.imageNo4,
  ].filter(Boolean);

  return (
    <div className="room-details-container">
      <div className="details-header">
        <button onClick={handleBack} className="back-button">
          ← Back to Rooms
        </button>
        <div className="header-actions">
          <button onClick={handleUpdate} className="update-button">
            Update Room
          </button>
          <button onClick={handleDelete} className="delete-button">
            Delete Room
          </button>
        </div>
      </div>

      <div className="details-content">
        {/* Main Image Section */}
        <div className="main-image-section">
          <img
            src={roomData.imageNo1}
            alt={roomData.name}
            className="main-image"
          />
          <span className={`status-badge ${roomData.roomStatus.toLowerCase()}`}>
            {roomData.roomStatus}
          </span>
        </div>

        {/* Additional Images */}
        <div className="additional-images">
          {additionalImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Room view ${index + 1}`}
              className="thumbnail-image"
            />
          ))}
        </div>

        {/* Room Information */}
        <div className="info-section">
          <div className="info-header">
            <h1 className="room-title">{roomData.name}</h1>
            <div className="room-price-large">
              USD {roomData.basePrice.toLocaleString()}
            </div>
          </div>

          {/* Details Grid */}
          <div className="details-grid">
            <div className="detail-card">
              <div className="detail-icon">🏷️</div>
              <div className="detail-info">
                <span className="detail-label">Room Type</span>
                <span className="detail-value">{roomData.roomType}</span>
              </div>
            </div>

            <div className="detail-card">
              <div className="detail-icon">🛏️</div>
              <div className="detail-info">
                <span className="detail-label">Bed Type</span>
                <span className="detail-value">{roomData.bedType}</span>
              </div>
            </div>

            <div className="detail-card">
              <div className="detail-icon">🔢</div>
              <div className="detail-info">
                <span className="detail-label">Bed Count</span>
                <span className="detail-value">{roomData.bedCount}</span>
              </div>
            </div>

            <div className="detail-card">
              <div className="detail-icon">📅</div>
              <div className="detail-info">
                <span className="detail-label">Created By</span>
                <span className="detail-value">{roomData.createdBy}</span>
              </div>
            </div>

            <div className="detail-card">
              <div className="detail-icon">🕒</div>
              <div className="detail-info">
                <span className="detail-label">Created At</span>
                <span className="detail-value">
                  {new Date(roomData.createdAt).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="detail-card">
              <div className="detail-icon">🕒</div>
              <div className="detail-info">
                <span className="detail-label">Update At</span>
                <span className="detail-value">
                  {new Date(roomData.updatedAt).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Update Room Form Popup */}
      {showUpdateForm && (
        <UpdateRoomForm
          room={roomData}
          onClose={handleCloseUpdateForm}
          onSubmit={handleUpdateSubmit}
        />
      )}

      {/* Delete Room Modal */}
      {showDeleteModal && (
        <DeleteRoomModal
          room={roomData}
          onClose={handleCloseDeleteModal}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
};

export default RoomDetails;
