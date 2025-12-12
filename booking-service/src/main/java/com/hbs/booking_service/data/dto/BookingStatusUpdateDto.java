package com.hbs.booking_service.data.dto;

import jakarta.validation.constraints.NotBlank;

public class BookingStatusUpdateDto {
    @NotBlank(message = "Booking status cannot be empty")
    private String status;

    public BookingStatusUpdateDto(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
