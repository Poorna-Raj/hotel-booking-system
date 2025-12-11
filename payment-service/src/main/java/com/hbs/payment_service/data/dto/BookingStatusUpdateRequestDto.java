package com.hbs.payment_service.data.dto;

import jakarta.validation.constraints.NotBlank;

public class BookingStatusUpdateRequestDto {
    @NotBlank(message = "Status cannot be empty")
    private String status;

    public BookingStatusUpdateRequestDto(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
