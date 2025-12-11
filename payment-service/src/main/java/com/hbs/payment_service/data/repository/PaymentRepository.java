package com.hbs.payment_service.data.repository;

import com.hbs.payment_service.data.model.Payment;
import com.hbs.payment_service.data.model.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment,Long> {
    List<Payment> findByBookingId(long bookingId);

    @Query("""
    SELECT SUM(p.amount) FROM Payment p
    WHERE p.createdAt BETWEEN :start AND :end
    AND p.paymentStatus = :status
    """)
    Long getTimedRevenue(
            @Param("start") LocalDateTime startOfWeek,
            @Param("end") LocalDateTime endOfWeek,
            @Param("status") PaymentStatus status
    );
}
