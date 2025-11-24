package com.hbs.booking_service.data.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentRequestDto {
    private long bookingId;
    private long userId;
    private double amount;
    private String paymentType;
    private String paymentStatus;
    private String transactionId;
}
