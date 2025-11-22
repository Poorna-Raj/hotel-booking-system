package com.hbs.room_service.service;

import com.hbs.room_service.exception.ContentNotFound;
import com.hbs.room_service.exception.ServiceUnavailable;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Service
public class UserClientService {
    @Autowired
    private RestTemplate restTemplate;

    private static final String userService = "userService";

    @CircuitBreaker(name = userService, fallbackMethod = "validateUserIsAdminFeedback")
    public Boolean validateUserIsAdmin(long id){
        String url = "http://localhost:8080/user-service/users/" + id + "/is-admin";
        try {
            return restTemplate.getForObject(url, Boolean.class);
        } catch(HttpClientErrorException.NotFound ex){
            throw new ContentNotFound(ex.getMessage());
        }
    }

    public Boolean validateUserIsAdminFeedback(long id,Throwable ex){
        throw new ServiceUnavailable("User service unavailable!");
    }
}
