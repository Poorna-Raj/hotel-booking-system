package com.hbs.booking_service.service;

import com.hbs.booking_service.data.repository.BookingRepository;
import com.hbs.booking_service.exception.BookingValidationError;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class BookingValidator {
    @Autowired
    private BookingRepository repository;

    public boolean isBookingValid(LocalDateTime checkingTime, LocalDateTime checkoutTime, long roomId){
        if(!isCheckingValid(checkingTime)){
            throw new BookingValidationError("Invalid checking time");
        }

        if(!isCheckoutValid(checkoutTime,checkingTime)){
            throw new BookingValidationError("Invalid checkout time");
        }

        if(isBookingOverlapped(checkingTime,checkoutTime,roomId)){
            throw new BookingValidationError("Invalid Booking");
        }

        return true;
    }

    public boolean isBookingValid(LocalDateTime checkingTime,LocalDateTime checkoutTime,long roomId,long bookingId){
        if(!isCheckingValid(checkingTime)){
            throw new BookingValidationError("Invalid checking time");
        }

        if(!isCheckoutValid(checkoutTime,checkingTime)){
            throw new BookingValidationError("Invalid checkout time");
        }

        if(isBookingOverlapped(checkingTime,checkoutTime,roomId,bookingId)){
            throw new BookingValidationError("Invalid Booking");
        }

        return true;
    }

    private boolean isCheckingValid(LocalDateTime checking) {
        return LocalDateTime.now().isBefore(checking);
    }

    private boolean isCheckoutValid(LocalDateTime checkout, LocalDateTime checking){
        return LocalDateTime.now().isBefore(checkout) && checking.isBefore(checkout);
    }

    private boolean isBookingOverlapped(LocalDateTime checking, LocalDateTime checkout, long roomId){
        return repository.existsOverlappingBooking(roomId,checking.minusHours(1),checkout);
    }

    private boolean isBookingOverlapped(LocalDateTime checking, LocalDateTime checkout, long roomId, long bookingId){
        return repository.existsOverlappingBookingExceptBookingId(roomId,checking.minusHours(1),checkout,bookingId);
    }
}

