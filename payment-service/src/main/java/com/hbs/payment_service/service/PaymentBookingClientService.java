package com.hbs.payment_service.service;

import com.hbs.payment_service.data.dto.BookingStatusUpdateRequestDto;
import com.hbs.payment_service.exception.ContentNotFound;
import com.hbs.payment_service.exception.ServiceUnavailable;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Service
public class PaymentBookingClientService {
    @Autowired
    private RestTemplate restTemplate;

    private static final String bookingService = "bookingService";

    /**
     * Validate a booking to check if it exist
     * @param id ID of the booking
     * @return {@code boolean} value based on the result
     */
    @CircuitBreaker(name = bookingService, fallbackMethod = "validateBookingExistFeedback")
    public Boolean validateBookingExist(long id){
        String url = "http://localhost:8082/booking-service/bookings/" + id + "/is-valid";
        try {
            return restTemplate.getForObject(url, Boolean.class);
        } catch(HttpClientErrorException.NotFound ex){
            throw new ContentNotFound(ex.getMessage());
        }
    }

    public Boolean validateBookingExistFeedback(long id, Throwable ex){
        throw new ServiceUnavailable("Booking service unavailable!");
    }

    /**
     * Helper method to update the booking status
     * @param dto contains the details of the booking status
     * @param id ID of the booking
     */
    @CircuitBreaker(name = bookingService, fallbackMethod = "updatePaymentStatusFallback")
    public void updatePaymentStatus(BookingStatusUpdateRequestDto dto, long id) {
        String url = "http://localhost:8082/booking-service/bookings/"+ id +"/payment-status";
        try{
            restTemplate.put(url,dto);
        } catch(HttpClientErrorException.NotFound ex){
            throw new ContentNotFound(ex.getMessage());
        }
    }

    public void updatePaymentStatusFallback(BookingStatusUpdateRequestDto dto, long id, Throwable ex){
        throw new ServiceUnavailable("Booking service unavailable!");
    }
}
