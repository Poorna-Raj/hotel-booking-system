package com.hbs.booking_service.data.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class BookingStatusUpdateDto {
    private String status;
}
