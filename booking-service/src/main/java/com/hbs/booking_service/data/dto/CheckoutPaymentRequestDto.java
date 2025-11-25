package com.hbs.booking_service.data.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CheckoutPaymentRequestDto {
    private long userId;
    private String paymentType;
    private String transactionId;
}
