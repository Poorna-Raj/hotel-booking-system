package com.hbs.booking_service.service;

import com.hbs.booking_service.exception.ContentNotFound;
import com.hbs.booking_service.exception.ServiceUnavailable;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Service
public class RoomServiceClient {
    @Autowired
    private RestTemplate restTemplate;

    private static final String roomService = "roomService";

    @CircuitBreaker(name = roomService, fallbackMethod = "getPriceFallback")
    public Double getPrice(long roomId){
        String url = "http://localhost:8080/room-service/rooms/" + roomId + "/price";

        try{
            return restTemplate.getForObject(url,Double.class);
        } catch (HttpClientErrorException.NotFound ex){
            throw new ContentNotFound(ex.getMessage());
        }
    }

    public Double getPriceFallback(long roomId,Throwable ex){
        throw new ServiceUnavailable("User service unavailable!");
    }
}
