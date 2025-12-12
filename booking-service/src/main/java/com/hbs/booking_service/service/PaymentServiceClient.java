package com.hbs.booking_service.service;

import com.hbs.booking_service.data.dto.PaymentRequestDto;
import com.hbs.booking_service.exception.ContentNotFound;
import com.hbs.booking_service.exception.ServiceUnavailable;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Service
public class PaymentServiceClient {
    @Autowired
    private RestTemplate restTemplate;

    private static final String paymentService = "paymentService";

    /**
     * Add a payment from the payment service
     * @param dto contains the details of the payment
     */
    @CircuitBreaker(name = paymentService, fallbackMethod = "addPaymentFallback")
    public void addPayment(PaymentRequestDto dto){
        String url = "http://localhost:8083/payment-service/payments";
        try{
            restTemplate.postForObject(url,dto,Void.class);
        } catch (HttpClientErrorException ex){
            throw new ContentNotFound(ex.getResponseBodyAsString());
        } catch (Exception ex){
            System.out.println("Payment service failed: " + ex.getMessage());
            throw ex;
        }
    }

    public void addPaymentFallback(PaymentRequestDto dto, Throwable ex){
        throw new ServiceUnavailable("Payment service unavailable!");
    }

    /**
     * Fetch the remaining amount of a booking from payment service
     * @param bookingId ID of the booking
     * @return {@code double} value based on the result
     */
    @CircuitBreaker(name = paymentService, fallbackMethod = "getTotalAmountToBePaidFallback")
    public Double getTotalAmountToBePaid(long bookingId) {
        String url = "http://localhost:8083/payment-service/bookings/" + bookingId + "/balance";
        try{
            return restTemplate.getForObject(url,Double.class);
        } catch (HttpClientErrorException.NotFound ex){
            throw new ContentNotFound(ex.getMessage());
        }
    }

    public Double getTotalAmountToBePaidFallback(long bookingId, Throwable ex){
        throw new ServiceUnavailable("Payment service unavailable!");
    }
}
