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

    @CircuitBreaker(name = paymentService, fallbackMethod = "addPaymentFallback")
    public void addPayment(PaymentRequestDto dto){
        String url = "http://localhost:8080/payment-service/payments";
        try{
            restTemplate.postForObject(url,dto,Void.class);
        } catch (HttpClientErrorException.NotFound ex){
            throw new ContentNotFound(ex.getMessage());
        }
    }

    public void addPaymentFallback(PaymentRequestDto dto, Throwable ex){
        throw new ServiceUnavailable("Payment service unavailable!");
    }
}
