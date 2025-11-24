package com.hbs.booking_service.data.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class BookingRequestDto {
    private long id;
    private long roomId;
    private long createdBy;
    private LocalDateTime checkIn;
    private LocalDateTime checkOut;
    private String bookingStatus;
    private String customerName;
    private String customerNic;
    private double advancePayment;
    private String paymentType;
    private String transactionId;
}
