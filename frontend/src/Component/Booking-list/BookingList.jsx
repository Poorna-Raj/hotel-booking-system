import React, { useState } from 'react';
import AddBooking from "../CRUD-booking/Add-booking/AddBooking";
import UpdateBooking from '../CRUD-booking/Update-booking/UpdateBooking';
import ViewBooking from '../../page/ViewBooking/ViewBooking';
import DeleteBookingModal from '../CRUD-booking/Delete-booking/Delete-booking';
import './BookingList.css';

function BookingList() {
  const [bookings, setBookings] = useState([
    { 
      id: 1, 
      roomId: 101,
      createdBy: 1,
      customerName: 'Arosh Smith', 
      customerNic: '123456789V',
      checkIn: '2025-12-01T14:00:00', 
      checkOut: '2025-12-05T11:00:00',
      bookingStatus: 'Confirmed',
      paymentStatus: 'Paid',
      totalAmount: 450.00,
      occupancy: 2,
      createdAt: '2025-11-15T10:30:00',
      updatedAt: '2025-11-20T15:45:00'
    },
    { 
      id: 2, 
      roomId: 205,
      createdBy: 2,
      customerName: 'John Doe', 
      customerNic: '987654321V',
      checkIn: '2025-12-10T14:00:00', 
      checkOut: '2025-12-12T11:00:00',
      bookingStatus: 'Pending',
      paymentStatus: 'Pending',
      totalAmount: 300.00,
      occupancy: 1,
      createdAt: '2025-11-18T09:15:00',
      updatedAt: '2025-11-18T09:15:00'
    },
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

  // Format date for display in table
  const formatDate = (dateTime) => {
    if (!dateTime) return 'N/A';
    const date = new Date(dateTime);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
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
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.customerName}</td>
              <td>#{booking.roomId}</td>
              <td>{formatDate(booking.checkIn)}</td>
              <td>{formatDate(booking.checkOut)}</td>
              <td>
                <span className={`status-badge ${booking.bookingStatus.toLowerCase()}`}>
                  {booking.bookingStatus}
                </span>
              </td>
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