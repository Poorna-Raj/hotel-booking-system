package com.hbs.booking_service.data.dto;

import jakarta.validation.constraints.*;

import java.time.LocalDateTime;

public class BookingUpdateRequestDto {
    @Positive(message = "Room ID must be positive")
    private long roomId;

    @NotNull(message = "Check-in date cannot be null")
    @FutureOrPresent(message = "Check-in date cannot be in the past")
    private LocalDateTime checkIn;

    @NotNull(message = "Check-out date cannot be null")
    @FutureOrPresent(message = "Check-out date cannot be in the past")
    private LocalDateTime checkOut;

    @NotBlank(message = "Booking status cannot be empty")
    private String bookingStatus;

    @NotBlank(message = "Customer name cannot be empty")
    @Size(max = 50, message = "Customer name must be at most 50 characters")
    private String customerName;

    @NotBlank(message = "Customer NIC cannot be empty")
    @Size(max = 20, message = "Customer NIC must be at most 20 characters")
    private String customerNic;

    @Positive(message = "Occupancy must be positive")
    private int occupancy;

    public long getRoomId() {
        return roomId;
    }

    public void setRoomId(long roomId) {
        this.roomId = roomId;
    }

    public LocalDateTime getCheckIn() {
        return checkIn;
    }

    public void setCheckIn(LocalDateTime checkIn) {
        this.checkIn = checkIn;
    }

    public LocalDateTime getCheckOut() {
        return checkOut;
    }

    public void setCheckOut(LocalDateTime checkOut) {
        this.checkOut = checkOut;
    }

    public String getBookingStatus() {
        return bookingStatus;
    }

    public void setBookingStatus(String bookingStatus) {
        this.bookingStatus = bookingStatus;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerNic() {
        return customerNic;
    }

    public void setCustomerNic(String customerNic) {
        this.customerNic = customerNic;
    }

    public int getOccupancy() {
        return occupancy;
    }

    public void setOccupancy(int occupancy) {
        this.occupancy = occupancy;
    }
}
