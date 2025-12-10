package com.hbs.booking_service.exception;

public class BookingValidationError extends RuntimeException {
    public BookingValidationError(String message) {
        super(message);
    }
}
