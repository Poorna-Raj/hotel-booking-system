package com.hbs.payment_service.service;

import com.hbs.payment_service.exception.ContentNotFound;
import com.hbs.payment_service.exception.ServiceUnavailable;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Service
public class PaymentUserClientService {
    @Autowired
    private RestTemplate restTemplate;

    private static final String userService = "userService";

    /**
     * Validator method to validate if a user is valid
     * @param id ID of the user
     * @return {@code boolean} value based on the result
     */
    @CircuitBreaker(name = userService, fallbackMethod = "validateUserFeedback")
    public Boolean validateUser(long id){
        String url = "http://localhost:8080/user-service/users/" + id + "/is-valid";
        try{
            return restTemplate.getForObject(url,Boolean.class);
        } catch (HttpClientErrorException.NotFound ex){
            throw new ContentNotFound(ex.getMessage());
        }
    }

    public Boolean validateUserFeedback(long id,Throwable ex){
        throw new ServiceUnavailable("User service unavailable!");
    }
}
