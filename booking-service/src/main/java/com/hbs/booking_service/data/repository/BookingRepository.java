package com.hbs.booking_service.data.repository;

import com.hbs.booking_service.data.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking,Long> {
}
