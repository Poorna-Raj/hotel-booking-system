import React, { useState } from 'react';
import AddBooking from "../CRUD-booking/Add-booking/AddBooking";

import UpdateBooking from '../CRUD-booking/Update-booking/UpdateBooking';
import ViewBooking from '../CRUD-booking/View-booking/ViewBooking';
import DeleteBookingModal from '../CRUD-booking/Delete-booking/Delete-booking';
import './BookingList.css'; // Add your custom CSS styles for the table and modals

function BookingList() {
  const [bookings, setBookings] = useState([
    { id: 1, guestName: 'Arosh Smith', roomType: 'Standard Room', checkIn: '2025-12-01', checkOut: '2025-12-05' },
    { id: 2, guestName: 'John Doe', roomType: 'Deluxe Room', checkIn: '2025-12-10', checkOut: '2025-12-12' },
  ]);
  
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showAddBookingModal, setShowAddBookingModal] = useState(false);
  const [showUpdateBookingModal, setShowUpdateBookingModal] = useState(false);
  const [showViewBookingModal, setShowViewBookingModal] = useState(false);
  const [showDeleteBookingModal, setShowDeleteBookingModal] = useState(false);

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
  const handleConfirmDelete = () => {
    setBookings(bookings.filter((booking) => booking.id !== selectedBooking.id));
    setShowDeleteBookingModal(false);
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
            <th>Room Type</th>
            <th>Check-in Date</th>
            <th>Check-out Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.guestName}</td>
              <td>{booking.roomType}</td>
              <td>{booking.checkIn}</td>
              <td>{booking.checkOut}</td>
              <td>
                <button onClick={() => handleViewBooking(booking)}>View</button>
                <button onClick={() => handleEditBooking(booking)}>Edit</button>
                <button onClick={() => handleDeleteBooking(booking)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Booking Modal */}
      {showAddBookingModal && (
        <div className="modal-overlay">
          <AddBooking setShowAddBookingModal={setShowAddBookingModal} setBookings={setBookings} />
        </div>
      )}

      {/* Update Booking Modal */}
      {showUpdateBookingModal && (
        <div className="modal-overlay">
          <UpdateBooking booking={selectedBooking} setShowUpdateBookingModal={setShowUpdateBookingModal} setBookings={setBookings} />
        </div>
      )}

      {/* View Booking Modal */}
      {showViewBookingModal && (
        <div className="modal-overlay">
          <ViewBooking booking={selectedBooking} setShowViewBookingModal={setShowViewBookingModal} />
        </div>
      )}

      {/* Delete Booking Modal */}
      {showDeleteBookingModal && (
        <div className="modal-overlay">
          <DeleteBookingModal
            booking={selectedBooking}
            handleConfirmDelete={handleConfirmDelete}
            setShowDeleteBookingModal={setShowDeleteBookingModal}
          />
        </div>
      )}
    </div>
  );
}

export default BookingList;
