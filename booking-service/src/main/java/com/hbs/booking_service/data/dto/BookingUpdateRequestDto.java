package com.hbs.booking_service.data.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
public class BookingUpdateRequestDto {
    private long roomId;
    private LocalDateTime checkIn;
    private LocalDateTime checkOut;
    private String bookingStatus;
    private String customerName;
    private String customerNic;
    private int occupancy;
}
