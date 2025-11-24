package com.hbs.booking_service.controller;

import com.hbs.booking_service.data.dto.BookingRequestDto;
import com.hbs.booking_service.data.dto.BookingResponseDto;
import com.hbs.booking_service.data.dto.BookingUpdateRequestDto;
import com.hbs.booking_service.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
public class BookingController {
    @Autowired
    private BookingService service;

    @PostMapping
    public ResponseEntity<BookingResponseDto> addBooking(@RequestBody BookingRequestDto dto){
        return new ResponseEntity<>(service.addBooking(dto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookingResponseDto> updateBookingById(
            @RequestBody BookingUpdateRequestDto dto,
            @PathVariable long id
    ){
        return new ResponseEntity<>(service.updateBooking(id,dto),HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteBookingById(@PathVariable long id){
        if(service.deleteBooking(id)){
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingResponseDto> getBookingById(@PathVariable long id){
        return new ResponseEntity<>(service.getBookingById(id),HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<BookingResponseDto>> getAllBookings(){
        return new ResponseEntity<>(service.getAllBookings(),HttpStatus.OK);
    }

    @GetMapping("/{id}/is-valid")
    public Boolean isBookingValidForPayments(@PathVariable long id){
        return service.isBookingValidForPayments(id);
    }
}
