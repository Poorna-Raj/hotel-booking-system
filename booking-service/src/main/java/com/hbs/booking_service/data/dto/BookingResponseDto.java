package com.hbs.booking_service.data.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
public class BookingResponseDto {
    private long id;
    private long roomId;
    private long createdBy;
    private LocalDateTime checkIn;
    private LocalDateTime checkOut;
    private String bookingStatus;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String customerName;
    private String customerNic;
    private double totalAmount;
    private String paymentStatus;
}
