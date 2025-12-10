package com.hbs.booking_service.service;

import com.hbs.booking_service.data.model.BookingPaymentStatus;
import com.hbs.booking_service.data.model.BookingStatus;
import com.hbs.booking_service.data.repository.BookingRepository;
import com.hbs.booking_service.exception.BookingValidationError;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class BookingValidator {
    @Autowired
    private BookingRepository repository;

    @Autowired
    private RoomServiceClient roomServiceClient;

    /**
     * Overloaded method to check if booking is valid
     * @param checkingTime Checking time of the booking
     * @param checkoutTime Checkout time of the booking
     * @param roomId ID of the room
     * @param occupancy Number of peoples
     * @return {@code boolean} value based on the result
     */
    public boolean isBookingValid(LocalDateTime checkingTime, LocalDateTime checkoutTime, long roomId, int occupancy){
        if(isCheckingValid(checkingTime)){
            throw new BookingValidationError("Invalid checking time");
        }

        if(isCheckoutValid(checkoutTime, checkingTime)){
            throw new BookingValidationError("Invalid checkout time");
        }

        if(isBookingOverlapped(checkingTime,checkoutTime,roomId)){
            throw new BookingValidationError("Invalid Booking");
        }

        if(isRoomValidOccupancy(roomId,occupancy)){
            throw new BookingValidationError("Invalid room for the occupancy.");
        }

        return true;
    }

    /**
     * Overloaded method check if a booking is valid to update
     * @param checkingTime New checking time for booking
     * @param checkoutTime New checkout time for booking
     * @param roomId ID of the room
     * @param bookingId ID of the existing booking
     * @param occupancy Number of peoples
     * @return {@code boolean} value based on the result
     */
    public boolean isBookingValid(LocalDateTime checkingTime,LocalDateTime checkoutTime,long roomId,long bookingId, int occupancy){
        if(isCheckingValid(checkingTime)){
            throw new BookingValidationError("Invalid checking time");
        }

        if(isCheckoutValid(checkoutTime, checkingTime)){
            throw new BookingValidationError("Invalid checkout time");
        }

        if(isBookingOverlapped(checkingTime,checkoutTime,roomId,bookingId)){
            throw new BookingValidationError("Invalid Booking");
        }

        if(isRoomValidOccupancy(roomId,occupancy)){
            throw new BookingValidationError("Invalid room for the occupancy.");
        }

        return true;
    }

    /**
     * Validate the booking status
     * @param status Given status
     * @return {@code boolean} value based on the result
     */
    public boolean isBookingStatusValid(String status){
        try{
            BookingStatus.valueOf(status);
            return true;
        } catch (IllegalArgumentException ex){
            throw new BookingValidationError("Invalid Booking Status!");
        }
    }

    /**
     * Validate the payment status
     * @param status Given status
     * @return {@code boolean} value based on the result
     */
    public boolean isBookingPaymentStatusValid(String status){
        try{
            BookingPaymentStatus.valueOf(status);
            return true;
        } catch (IllegalArgumentException ex){
            throw new BookingValidationError("Invalid Booking Payment Status!");
        }
    }

    /**
     * Validate the checking time
     * @param checking Given checking time
     * @return {@code boolean} value based on the result
     */
    public boolean isCheckingValid(LocalDateTime checking) {
        return !LocalDateTime.now().isBefore(checking);
    }

    /**
     * Validate the checkout time
     * @param checkout Given checkout time
     * @param checking Given checking time
     * @return {@code boolean} value based on the result
     */
    public boolean isCheckoutValid(LocalDateTime checkout, LocalDateTime checking){
        return !LocalDateTime.now().isBefore(checkout) || !checking.isBefore(checkout);
    }

    /**
     * Validate if booking is conflicted
     * @param checking Given checking time
     * @param checkout Given checkout time
     * @param roomId ID of the room
     * @return {@code boolean} value based on the result
     */
    public boolean isBookingOverlapped(LocalDateTime checking, LocalDateTime checkout, long roomId){
        return repository.existsOverlappingBooking(roomId,checking.minusHours(1),checkout);
    }

    /**
     * Validate if a booking is overlapped except the existing booking
     * @param checking Given checking time
     * @param checkout Given checkout time
     * @param roomId ID of the room
     * @param bookingId ID of the booking
     * @return {@code boolean} value based on the result
     */
    public boolean isBookingOverlapped(LocalDateTime checking, LocalDateTime checkout, long roomId, long bookingId){
        return repository.existsOverlappingBookingExceptBookingId(roomId,checking.minusHours(1),checkout,bookingId);
    }

    /**
     * Check if room capacity meets the requested occupancy
     * @param roomId ID of the room
     * @param occupancy Given occupancy
     * @return {@code boolean} value based on the result
     */
    public boolean isRoomValidOccupancy(long roomId,int occupancy){
        return occupancy >= roomServiceClient.getRoomCapacityById(roomId);
    }
}

