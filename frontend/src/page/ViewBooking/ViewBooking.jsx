import React, { useState } from 'react';
import './ViewBooking.css';

function ViewBooking({ booking, setShowViewBookingModal, setBookings }) {
  const [extraPayment, setExtraPayment] = useState(0);
  const [extraPaymentReason, setExtraPaymentReason] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [showAdditionalPaymentModal, setShowAdditionalPaymentModal] = useState(false);
  const [additionalPaymentForm, setAdditionalPaymentForm] = useState({
    amount: '',
    paymentType: '',
    paymentStatus: 'Pending',
    transactionId: '',
    paymentReason: ''
  });
  const [additionalPaymentSuccess, setAdditionalPaymentSuccess] = useState(false);

  // Check if booking is valid before proceeding
  if (!booking) {
    return <div>Loading...</div>;
  }

  const formatDateTime = (dateTime) => {
    if (!dateTime) return 'N/A';
    const date = new Date(dateTime);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadgeClass = (status) => {
    const statusLower = status?.toLowerCase();
    if (statusLower === 'confirmed' || statusLower === 'paid') return 'status-badge success';
    if (statusLower === 'pending') return 'status-badge warning';
    if (statusLower === 'cancelled') return 'status-badge danger';
    return 'status-badge';
  };

  const calculateTotalWithExtra = () => {
    return (parseFloat(booking.totalAmount) + parseFloat(extraPayment || 0)).toFixed(2);
  };

  const handleCheckoutClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmCheckout = () => {
    setBookings(prevBookings => 
      prevBookings.map(b => 
        b.id === booking.id 
          ? { 
              ...b, 
              bookingStatus: 'Checked Out',
              paymentStatus: 'Paid',
              totalAmount: parseFloat(calculateTotalWithExtra()),
              updatedAt: new Date().toISOString()
            }
          : b
      )
    );
    
    setShowConfirmModal(false);
    setCheckoutSuccess(true);
    
    setTimeout(() => {
      setShowViewBookingModal(false);
    }, 2000);
  };

  const handleCancelCheckout = () => {
    setShowConfirmModal(false);
  };

  const handleAdditionalPaymentClick = () => {
    // Pre-fill with example data for testing
    setAdditionalPaymentForm({
      amount: '150.50',
      paymentType: 'Credit Card',
      paymentStatus: 'Paid',
      transactionId: 'TXN123456789',
      paymentReason: 'Late checkout fee and mini bar charges'
    });
    setShowAdditionalPaymentModal(true);
  };

  const handleAdditionalPaymentChange = (field, value) => {
    setAdditionalPaymentForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitAdditionalPayment = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!additionalPaymentForm.amount || !additionalPaymentForm.paymentType || 
        !additionalPaymentForm.transactionId || !additionalPaymentForm.paymentReason) {
      alert('Please fill in all required fields');
      return;
    }

    // Create payment object
    const paymentData = {
      bookingId: booking.id,
      userId: booking.createdBy,
      amount: parseFloat(additionalPaymentForm.amount),
      paymentType: additionalPaymentForm.paymentType,
      paymentStatus: additionalPaymentForm.paymentStatus,
      transactionId: additionalPaymentForm.transactionId,
      paymentReason: additionalPaymentForm.paymentReason
    };

    console.log('Additional Payment Submitted:', paymentData);
    
    // TODO: Replace this with your actual API call
    // Example API call (commented out):
    /*
    try {
      const response = await fetch('YOUR_API_ENDPOINT_HERE', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      });
      
      if (!response.ok) {
        throw new Error('Payment submission failed');
      }
      
      const result = await response.json();
      console.log('Payment saved:', result);
    } catch (error) {
      console.error('Error submitting payment:', error);
      alert('Failed to submit payment. Please try again.');
      return;
    }
    */
    
    // For now, just simulate success (remove this when you add real API)
    // Show success message
    setAdditionalPaymentSuccess(true);
    
    // Reset form and close modal after 2 seconds
    setTimeout(() => {
      setAdditionalPaymentSuccess(false);
      setShowAdditionalPaymentModal(false);
      setAdditionalPaymentForm({
        amount: '',
        paymentType: '',
        paymentStatus: 'Pending',
        transactionId: '',
        paymentReason: ''
      });
    }, 2000);
  };

  const handleCancelAdditionalPayment = () => {
    setShowAdditionalPaymentModal(false);
    setAdditionalPaymentForm({
      amount: '',
      paymentType: '',
      paymentStatus: 'Pending',
      transactionId: '',
      paymentReason: ''
    });
  };

  return (
    <div className="view-booking-page">
      <div className="checkout-container">
        <button className="back-btn" onClick={() => setShowViewBookingModal(false)}>
          ← Back to List
        </button>

        <div className="checkout-header">
          <h1>Checkout Booking</h1>
          <p className="booking-id">Booking ID: #{booking?.id}</p>
          {booking.bookingStatus === 'Confirmed' && (
            <span className="status-badge-header success">Confirmed</span>
          )}
        </div>

        {checkoutSuccess && (
          <div className="success-banner">
            ✓ Checkout completed successfully! Payment confirmed.
          </div>
        )}

        <div className="checkout-content">
          {/* Left Side - Booking Details */}
          <div className="checkout-left">
            {/* Customer Information */}
            <div className="info-card">
              <h3 className="card-title">Customer Information</h3>
              <div className="info-row">
                <span className="info-label">Name:</span>
                <span className="info-value">{booking.customerName}</span>
              </div>
              <div className="info-row">
                <span className="info-label">NIC:</span>
                <span className="info-value">{booking.customerNic}</span>
              </div>
            </div>

            {/* Booking Information */}
            <div className="info-card">
              <h3 className="card-title">Booking Information</h3>
              <div className="info-row">
                <span className="info-label">Room ID:</span>
                <span className="info-value">#{booking.roomId}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Occupancy:</span>
                <span className="info-value">{booking.occupancy} {booking.occupancy === 1 ? 'Guest' : 'Guests'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Check-In:</span>
                <span className="info-value">{formatDateTime(booking.checkIn)}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Check-Out:</span>
                <span className="info-value">{formatDateTime(booking.checkOut)}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Status:</span>
                <span className={getStatusBadgeClass(booking.bookingStatus)}>
                  {booking.bookingStatus}
                </span>
              </div>
            </div>

            {/* System Information */}
            <div className="info-card">
              <h3 className="card-title">System Information</h3>
              <div className="info-row">
                <span className="info-label">Created By:</span>
                <span className="info-value">User ID: {booking.createdBy}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Created At:</span>
                <span className="info-value">{formatDateTime(booking.createdAt)}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Last Updated:</span>
                <span className="info-value">{formatDateTime(booking.updatedAt)}</span>
              </div>
            </div>
          </div>

          {/* Right Side - Payment Summary */}
          <div className="checkout-right">
            <div className="payment-card">
              <h3 className="card-title">Payment Summary</h3>
              
              <div className="payment-breakdown">
                <div className="payment-row">
                  <span>Base Amount:</span>
                  <span className="amount">${booking.totalAmount?.toFixed(2)}</span>
                </div>
                
                <div className="extra-payment-section">
                  <label className="extra-label">Add Extra Payment:</label>
                  <input
                    type="number"
                    className="extra-input"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    value={extraPayment}
                    onChange={(e) => setExtraPayment(e.target.value)}
                  />
                  <input
                    type="text"
                    className="extra-reason-input"
                    placeholder="Reason (e.g., Mini bar, Room service)"
                    value={extraPaymentReason}
                    onChange={(e) => setExtraPaymentReason(e.target.value)}
                  />
                </div>

                {extraPayment > 0 && (
                  <div className="payment-row extra">
                    <span>Extra Charges:</span>
                    <span className="amount">+${parseFloat(extraPayment).toFixed(2)}</span>
                  </div>
                )}

                <div className="payment-divider"></div>

                <div className="payment-row total">
                  <span>Total Amount:</span>
                  <span className="amount">${calculateTotalWithExtra()}</span>
                </div>

                <div className="payment-status-row">
                  <span>Payment Status:</span>
                  <span className={getStatusBadgeClass(booking.paymentStatus)}>
                    {booking.paymentStatus}
                  </span>
                </div>
              </div>

              <button 
                className="additional-payment-btn" 
                onClick={handleAdditionalPaymentClick}
              >
                💳 Add Additional Payment
              </button>

              <button 
                className="checkout-btn" 
                onClick={handleCheckoutClick}
                disabled={checkoutSuccess}
              >
                {checkoutSuccess ? 'Checked Out' : 'Proceed to Checkout'}
              </button>
            </div>

            {extraPayment > 0 && extraPaymentReason && (
              <div className="extra-note">
                <strong>Extra Charge Reason:</strong>
                <p>{extraPaymentReason}</p>
              </div>
            )}
          </div>
        </div>

        {/* Additional Payment Modal */}
        {showAdditionalPaymentModal && (
          <div className="confirm-overlay">
            <div className="additional-payment-modal">
              <div className="modal-header">
                <h2>💳 Additional Payment</h2>
                <button className="close-modal-btn" onClick={handleCancelAdditionalPayment}>
                  ✕
                </button>
              </div>

              {additionalPaymentSuccess && (
                <div className="success-banner-modal">
                  ✓ Additional payment recorded successfully!
                </div>
              )}

              <form onSubmit={handleSubmitAdditionalPayment} className="additional-payment-form">
                <div className="form-row">
                  <label className="form-label">Booking ID</label>
                  <input
                    type="text"
                    className="form-input"
                    value={booking.id}
                    disabled
                  />
                </div>

                <div className="form-row">
                  <label className="form-label">User ID</label>
                  <input
                    type="text"
                    className="form-input"
                    value={booking.createdBy}
                    disabled
                  />
                </div>

                <div className="form-row">
                  <label className="form-label">Amount <span className="required">*</span></label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="0.00"
                    min="0.1"
                    step="0.01"
                    value={additionalPaymentForm.amount}
                    onChange={(e) => handleAdditionalPaymentChange('amount', e.target.value)}
                    required
                  />
                </div>

                <div className="form-row">
                  <label className="form-label">Payment Type <span className="required">*</span></label>
                  <select
                    className="form-input"
                    value={additionalPaymentForm.paymentType}
                    onChange={(e) => handleAdditionalPaymentChange('paymentType', e.target.value)}
                    required
                  >
                    <option value="">Select payment type</option>
                    <option value="Cash">Cash</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Online Payment">Online Payment</option>
                  </select>
                </div>

                <div className="form-row">
                  <label className="form-label">Payment Status <span className="required">*</span></label>
                  <select
                    className="form-input"
                    value={additionalPaymentForm.paymentStatus}
                    onChange={(e) => handleAdditionalPaymentChange('paymentStatus', e.target.value)}
                    required
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Failed">Failed</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                </div>

                <div className="form-row">
                  <label className="form-label">Transaction ID <span className="required">*</span></label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter transaction ID"
                    value={additionalPaymentForm.transactionId}
                    onChange={(e) => handleAdditionalPaymentChange('transactionId', e.target.value)}
                    required
                  />
                </div>

                <div className="form-row">
                  <label className="form-label">Payment Reason <span className="required">*</span></label>
                  <textarea
                    className="form-textarea"
                    placeholder="Enter reason for additional payment (e.g., Late checkout fee, Damage charges, Extra services)"
                    rows="4"
                    value={additionalPaymentForm.paymentReason}
                    onChange={(e) => handleAdditionalPaymentChange('paymentReason', e.target.value)}
                    required
                  />
                </div>

                <div className="form-buttons">
                  <button 
                    type="button" 
                    className="btn-cancel-form" 
                    onClick={handleCancelAdditionalPayment}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn-submit-form"
                  >
                    Submit Payment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div className="confirm-overlay">
            <div className="confirm-modal">
              <div className="confirm-icon">⚠️</div>
              <h2>Confirm Payment & Checkout</h2>
              <div className="confirm-details">
                <p><strong>Customer:</strong> {booking.customerName}</p>
                <p><strong>Room:</strong> #{booking.roomId}</p>
                <p><strong>Base Amount:</strong> ${booking.totalAmount?.toFixed(2)}</p>
                {extraPayment > 0 && (
                  <>
                    <p><strong>Extra Charges:</strong> ${parseFloat(extraPayment).toFixed(2)}</p>
                    <p className="extra-reason-text"><strong>Reason:</strong> {extraPaymentReason}</p>
                  </>
                )}
                <p className="total-confirm"><strong>Total Payment:</strong> ${calculateTotalWithExtra()}</p>
              </div>
              <p className="confirm-message">
                Are you sure you want to complete the checkout and confirm the payment?
              </p>
              <div className="confirm-buttons">
                <button className="btn-cancel" onClick={handleCancelCheckout}>
                  Cancel
                </button>
                <button className="btn-confirm" onClick={handleConfirmCheckout}>
                  Confirm Payment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewBooking;