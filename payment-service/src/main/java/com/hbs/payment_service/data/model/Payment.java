package com.hbs.payment_service.data.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "tbl_payments")
@Data
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "booking_id",nullable = false)
    private long bookingId;

    @Column(name = "user_id",nullable = false)
    private long userId;

    @Column(nullable = false)
    private double amount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentType paymentType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentStatus paymentStatus;

    private String transactionId;

    private LocalDateTime payedAt;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
