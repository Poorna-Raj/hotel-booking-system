package com.hbs.payment_service.data.repository;

import com.hbs.payment_service.data.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment,Long> {
}
