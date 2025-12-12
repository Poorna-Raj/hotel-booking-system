import React, { startTransition, useEffect, useState } from "react";
import AddBooking from "../CRUD-booking/Add-booking/AddBooking";
import UpdateBooking from "../CRUD-booking/Update-booking/UpdateBooking";
import ViewBooking from "../../page/ViewBooking/ViewBooking";
import DeleteBookingModal from "../CRUD-booking/Delete-booking/Delete-booking";
import "./BookingList.css";
import { deleteBooking, getAllBookings } from "./api";

function BookingList() {
  const [bookingData, setBookingData] = useState([]);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showAddBookingModal, setShowAddBookingModal] = useState(false);
  const [showUpdateBookingModal, setShowUpdateBookingModal] = useState(false);
  const [showViewBookingModal, setShowViewBookingModal] = useState(false);
  const [showDeleteBookingModal, setShowDeleteBookingModal] = useState(false);

  const fetchBookings = async () => {
    try {
      const res = await getAllBookings();
      if (res.status === 200) {
        startTransition(() => {
          setBookingData(res.data);
        });
      }
    } catch (err) {
      console.error("Failed to fetch booking: ", err);
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Handle Add Booking
  const handleAddBooking = () => {
    setShowAddBookingModal(true);
    setShowUpdateBookingModal(false);
    setShowViewBookingModal(false);
    setShowDeleteBookingModal(false);
  };

  // Handle Edit Booking
  const handleEditBooking = (booking) => {
    setSelectedBooking(booking);
    setShowAddBookingModal(false);
    setShowUpdateBookingModal(true);
    setShowViewBookingModal(false);
    setShowDeleteBookingModal(false);
  };

  // Handle View Booking
  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setShowAddBookingModal(false);
    setShowUpdateBookingModal(false);
    setShowViewBookingModal(true);
    setShowDeleteBookingModal(false);
  };

  // Handle Delete Booking
  const handleDeleteBooking = (booking) => {
    setSelectedBooking(booking);
    setShowAddBookingModal(false);
    setShowUpdateBookingModal(false);
    setShowViewBookingModal(false);
    setShowDeleteBookingModal(true);
  };

  // Handle Delete Confirmation
  const handleConfirmDelete = async (id) => {
    try {
      const res = await deleteBooking(id);
      if (res.status === 200) {
        console.log("Delete Success");
        fetchBookings();
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
    setShowDeleteBookingModal(false);
  };

  // Format date for display in table
  const formatDate = (dateTime) => {
    if (!dateTime) return "N/A";
    const date = new Date(dateTime);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="booking-list-container">
      <h2>Booking List</h2>
      <button className="add-booking-btn" onClick={handleAddBooking}>
        Add New Booking
      </button>
      <table className="booking-table">
        <thead>
          <tr>
            <th>Guest Name</th>
            <th>Room ID</th>
            <th>Check-in Date</th>
            <th>Check-out Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookingData.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.customerName}</td>
              <td>#{booking.roomId}</td>
              <td>{formatDate(booking.checkIn)}</td>
              <td>{formatDate(booking.checkOut)}</td>
              <td>
                <span
                  className={`status-badge ${booking.bookingStatus.toLowerCase()}`}
                >
                  {booking.bookingStatus || "N/A"}
                </span>
              </td>
              <td>
                <button onClick={() => handleViewBooking(booking)}>View</button>
                <button onClick={() => handleEditBooking(booking)}>Edit</button>
                <button onClick={() => handleDeleteBooking(booking)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Booking Modal */}
      {showAddBookingModal && (
        <div className="modal-overlay">
          <AddBooking setShowAddBookingModal={setShowAddBookingModal} />
        </div>
      )}

      {/* Update Booking Modal */}
      {showUpdateBookingModal && (
        <div className="modal-overlay">
          <UpdateBooking
            booking={selectedBooking}
            setShowUpdateBookingModal={setShowUpdateBookingModal}
          />
        </div>
      )}

      {/* View Booking Modal */}
      {showViewBookingModal && (
        <div className="modal-overlay">
          <ViewBooking
            booking={selectedBooking}
            setShowViewBookingModal={setShowViewBookingModal}
          />
        </div>
      )}

      {/* Delete Booking Modal */}
      {showDeleteBookingModal && (
        <div className="modal-overlay">
          <DeleteBookingModal
            booking={selectedBooking}
            handleConfirmDelete={handleConfirmDelete}
            onClose={() => setShowDeleteBookingModal(false)}
          />
        </div>
      )}
    </div>
  );
}

export default BookingList;
