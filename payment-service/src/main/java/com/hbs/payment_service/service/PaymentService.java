package com.hbs.payment_service.service;

import com.hbs.payment_service.data.dto.BookingStatusUpdateRequestDto;
import com.hbs.payment_service.data.dto.PaymentRequestDto;
import com.hbs.payment_service.data.dto.PaymentResponseDto;
import com.hbs.payment_service.data.model.Payment;
import com.hbs.payment_service.data.model.PaymentReason;
import com.hbs.payment_service.data.model.PaymentStatus;
import com.hbs.payment_service.data.model.PaymentType;
import com.hbs.payment_service.data.repository.PaymentRepository;
import com.hbs.payment_service.exception.BadRequest;
import com.hbs.payment_service.exception.ContentNotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository repository;

    @Autowired
    private PaymentUserClientService userClientService;

    @Autowired
    private PaymentBookingClientService bookingClientService;

    public PaymentResponseDto addPayment(PaymentRequestDto dto){
        Payment payment = new Payment();
        if(validatePaymentStatus(dto.getPaymentStatus())) {
            payment.setPaymentStatus(PaymentStatus.valueOf(dto.getPaymentStatus()));
        }
        if(validatePaymentType(dto.getPaymentType())){
            payment.setPaymentType(PaymentType.valueOf(dto.getPaymentType()));
        }
        if(validatePaymentReason(dto.getPaymentReason())){
            payment.setPaymentReason(PaymentReason.valueOf(dto.getPaymentReason()));
        }
        if(dto.getAmount() > 0){
            payment.setAmount(dto.getAmount());
        } else{
            throw new BadRequest("Invalid Amount!");
        }

        if(!bookingClientService.validateBookingExist(dto.getBookingId())){
            throw new BadRequest("Invalid booking for the given ID.");
        }
        payment.setBookingId(dto.getBookingId());

        payment.setCreatedAt(LocalDateTime.now());
        payment.setPayedAt(LocalDateTime.now());
        payment.setTransactionId(dto.getTransactionId());
        payment.setUpdatedAt(LocalDateTime.now());

        if(!userClientService.validateUser(dto.getUserId())) {
            throw new BadRequest("Invalid user!");
        }
        payment.setUserId(dto.getUserId());

        Payment savedPayment = repository.save(payment);

        processPaymentAndUpdateBookingService(savedPayment);

        return mapToDtoFromModel(savedPayment);
    }

    private void processPaymentAndUpdateBookingService(Payment savedPayment) {
        String newStatus;
        switch (savedPayment.getPaymentReason()){
            case ADVANCE -> newStatus = "PENDING_BALANCE";
            case BALANCE -> newStatus = "COMPLETED";
            case EXTRA -> {
                return;
            }
            default -> throw new BadRequest("Invalid Payment Reason");
        }

        BookingStatusUpdateRequestDto dto = new BookingStatusUpdateRequestDto(
                newStatus
        );

        bookingClientService.updatePaymentStatus(dto,savedPayment.getBookingId());
    }

    public PaymentResponseDto updatePayment(long id, PaymentRequestDto dto){
        Payment payment = repository.findById(id)
                .orElseThrow(() -> new ContentNotFound("Invalid Payment for given ID."));

        if(!userClientService.validateUser(dto.getUserId())) {
            throw new BadRequest("Invalid user!");
        }
        payment.setUserId(dto.getUserId());

        if(!bookingClientService.validateBookingExist(dto.getBookingId())){
            throw new BadRequest("Invalid booking for the given ID.");
        }
        payment.setBookingId(dto.getBookingId());

        if(dto.getAmount() > 0){
            payment.setAmount(dto.getAmount());
        } else{
            throw new BadRequest("Invalid Amount!");
        }

        if(validatePaymentReason(dto.getPaymentReason())){
            payment.setPaymentReason(PaymentReason.valueOf(dto.getPaymentReason()));
        }

        if(validatePaymentStatus(dto.getPaymentStatus())) {
            payment.setPaymentStatus(PaymentStatus.valueOf(dto.getPaymentStatus()));
        }
        if(validatePaymentType(dto.getPaymentType())){
            payment.setPaymentType(PaymentType.valueOf(dto.getPaymentType()));
        }

        payment.setTransactionId(dto.getTransactionId());

        return mapToDtoFromModel(repository.save(payment));
    }

    public PaymentResponseDto getPayment(long id){
        return mapToDtoFromModel(repository.findById(id)
                .orElseThrow(() -> new ContentNotFound("Invalid payment for given ID"))
        );
    }

    public List<PaymentResponseDto> getAllPayments(){
        return repository.findAll()
                .stream()
                .map(this::mapToDtoFromModel)
                .toList();
    }

    public boolean deletePayment(long id){
        Payment payment = repository.findById(id)
                .orElseThrow(() -> new ContentNotFound("Invalid Payment for given ID."));
        repository.delete(payment);
        return true;
    }

    private PaymentResponseDto mapToDtoFromModel(Payment save) {
        PaymentResponseDto dto = new PaymentResponseDto();
        dto.setAmount(save.getAmount());
        dto.setPaymentStatus(save.getPaymentStatus().toString());
        dto.setPaymentType(save.getPaymentType().toString());
        dto.setId(save.getId());
        dto.setCreatedAt(save.getCreatedAt());
        dto.setBookingId(save.getBookingId());
        dto.setPayedAt(save.getPayedAt());
        dto.setUserId(save.getUserId());
        dto.setTransactionId(save.getTransactionId());
        dto.setUpdatedAt(save.getUpdatedAt());
        dto.setPaymentReason(save.getPaymentReason().toString());

        return dto;
    }

    public boolean validatePaymentStatus(String status){
        try{
            PaymentStatus.valueOf(status);
            return true;
        } catch (IllegalArgumentException e) {
            throw new BadRequest("Invalid Payment Status");
        }
    }

    public boolean validatePaymentType(String type){
        try{
            PaymentType.valueOf(type);
            return true;
        } catch (IllegalArgumentException e) {
            throw new BadRequest("Invalid Payment Type");
        }
    }

    public boolean validatePaymentReason(String reason){
        try{
            PaymentReason.valueOf(reason);
            return true;
        } catch (IllegalArgumentException e) {
            throw new BadRequest("Invalid Payment Reason");
        }
    }
}
