package com.hbs.payment_service.data.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class BookingStatusUpdateRequestDto {
    private String status;
}
