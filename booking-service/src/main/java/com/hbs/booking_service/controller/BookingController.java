package com.hbs.booking_service.controller;

import com.hbs.booking_service.data.dto.*;
import com.hbs.booking_service.service.BookingService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
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
    public ResponseEntity<BookingResponseDto> addBooking(@Valid @RequestBody BookingRequestDto dto){
        return new ResponseEntity<>(service.addBooking(dto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookingResponseDto> updateBookingById(
            @Valid @RequestBody BookingUpdateRequestDto dto,
            @Valid @PathVariable @Min(1) long id
    ){
        return new ResponseEntity<>(service.updateBooking(id,dto),HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteBookingById(@Valid @PathVariable @Min(1) long id){
        if(service.deleteBooking(id)){
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingResponseDto> getBookingById(@Valid @PathVariable @Min(1) long id){
        return new ResponseEntity<>(service.getBookingById(id),HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<BookingResponseDto>> getAllBookings(){
        return new ResponseEntity<>(service.getAllBookings(),HttpStatus.OK);
    }

    @GetMapping("/{id}/is-valid")
    public Boolean isBookingValidForPayments(@Valid @PathVariable @Min(1) long id){
        return service.isBookingValidForPayments(id);
    }

    @PutMapping("/{id}/payment-status")
    public ResponseEntity<HttpStatus> updateBookingPaymentStatusById(
            @Valid @PathVariable @Min(1) long id,
            @Valid @RequestBody BookingStatusUpdateDto dto
    ){
        if(service.updateBookingPaymentStatus(id,dto)){
            return new ResponseEntity<>(HttpStatus.OK);
        } else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}/balance")
    public ResponseEntity<Double> getBalanceById(@Valid @PathVariable @Min(1) long id){
        return new ResponseEntity<>(service.getBookingBalance(id),HttpStatus.OK);
    }

    @PostMapping("/{id}/checkout")
    public ResponseEntity<HttpStatus> setCheckoutByBookingId(@Valid @PathVariable @Min(1) long id, @Valid @RequestBody CheckoutPaymentRequestDto dto){
        service.setCheckoutById(dto,id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/active")
    public Long getActiveBookings(){
        return service.getActiveBookings();
    }

    @GetMapping("/upcoming")
    public Long getUpcomingBookings(){
        return service.getUpcomingBookings();
    }
}
