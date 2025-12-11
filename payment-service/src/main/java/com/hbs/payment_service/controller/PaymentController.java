package com.hbs.payment_service.controller;

import com.hbs.payment_service.data.dto.PaymentRequestDto;
import com.hbs.payment_service.data.dto.PaymentResponseDto;
import com.hbs.payment_service.service.PaymentService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PaymentController {
    @Autowired
    private PaymentService service;

    @PostMapping(path = "/payments")
    public ResponseEntity<PaymentResponseDto> addPayment(@Valid @RequestBody PaymentRequestDto dto){
        return new ResponseEntity<>(service.addPayment(dto), HttpStatus.CREATED);
    }

    @PutMapping(path = "/payments/{id}")
    public ResponseEntity<PaymentResponseDto> updatePayment(
            @Valid @RequestBody PaymentRequestDto dto,
            @Valid @PathVariable @Min(1) long id
    ){
        return new ResponseEntity<>(service.updatePayment(id,dto),HttpStatus.OK);
    }

    @DeleteMapping(path = "/payments/{id}")
    public ResponseEntity<HttpStatus> deletePayment(@Valid @PathVariable @Min(1) long id){
        if(service.deletePayment(id)){
            return new ResponseEntity<>(HttpStatus.OK);
        } else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(path = "/payments/{id}")
    public ResponseEntity<PaymentResponseDto> getPaymentById(@Valid @PathVariable @Min(1) long id){
        return new ResponseEntity<>(service.getPayment(id),HttpStatus.OK);
    }

    @GetMapping(path = "/payments")
    public ResponseEntity<List<PaymentResponseDto>> getAllPayments(){
        return new ResponseEntity<>(service.getAllPayments(),HttpStatus.OK);
    }

    @GetMapping(path = "bookings/{id}/balance")
    public Double getBalancePaymentAmount(@Valid @PathVariable @Min(1) long id){
        return service.getBookingBalance(id);
    }
}
