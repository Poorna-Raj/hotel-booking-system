package com.hbs.payment_service.data.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
public class PaymentResponseDto {
    private long id;
    private long bookingId;
    private long userId;
    private double amount;
    private String paymentType;
    private String paymentStatus;
    private String transactionId;
    private LocalDateTime payedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
