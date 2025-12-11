package com.hbs.payment_service.data.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public class PaymentRequestDto {
    @Positive(message = "Booking ID must be positive")
    private long bookingId;

    @Positive(message = "User ID must be positive")
    private long userId;

    @Positive(message = "Amount must be positive")
    private double amount;

    @NotBlank(message = "Payment type cannot be empty")
    private String paymentType;

    @NotBlank(message = "Payment status cannot be empty")
    private String paymentStatus;

    @NotBlank(message = "Transaction ID cannot be empty")
    @Size(max = 50, message = "Transaction ID must be at most 50 characters")
    private String transactionId;

    @NotBlank(message = "Payment status cannot be empty")
    private String paymentReason;

    public long getBookingId() {
        return bookingId;
    }

    public void setBookingId(long bookingId) {
        this.bookingId = bookingId;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(String paymentType) {
        this.paymentType = paymentType;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public String getPaymentReason() {
        return paymentReason;
    }

    public void setPaymentReason(String paymentReason) {
        this.paymentReason = paymentReason;
    }
}
