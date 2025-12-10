package com.hbs.payment_service.data.dto;

public class BookingStatusUpdateRequestDto {
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
