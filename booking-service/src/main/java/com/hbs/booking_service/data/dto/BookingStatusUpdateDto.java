package com.hbs.booking_service.data.dto;

public class BookingStatusUpdateDto {
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
