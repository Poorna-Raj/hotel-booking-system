package com.hbs.booking_service.data.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public class CheckoutPaymentRequestDto {
    @Positive(message = "User ID must be positive")
    private long userId;

    @NotBlank(message = "Payment type cannot be empty")
    private String paymentType;

    @NotBlank(message = "Transaction ID cannot be empty")
    @Size(max = 50, message = "Transaction ID must be at most 50 characters")
    private String transactionId;

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(String paymentType) {
        this.paymentType = paymentType;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }
}
