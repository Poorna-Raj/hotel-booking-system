package com.hbs.booking_service.data.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookingRequestDto {
    private long id;
    private long roomId;
    private long createdBy;
    private String checkIn;
    private String checkOut;
    private String bookingStatus;
    private String customerName;
    private String customerNic;
    private double advancePayment;
}
