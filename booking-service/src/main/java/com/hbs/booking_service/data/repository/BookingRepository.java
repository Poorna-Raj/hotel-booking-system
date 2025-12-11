package com.hbs.booking_service.data.repository;

import com.hbs.booking_service.data.model.Booking;
import com.hbs.booking_service.data.model.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;

public interface BookingRepository extends JpaRepository<Booking,Long> {
    @Query("""
    SELECT COUNT(b) > 0 FROM Booking b
    WHERE b.roomId = :roomId
      AND b.checkOut > :oldCheckoutThreshold
      AND b.checkIn < :newCheckout
""")
    boolean existsOverlappingBooking(
            @Param("roomId") Long roomId,
            @Param("oldCheckoutThreshold") LocalDateTime oldCheckoutThreshold,
            @Param("newCheckout") LocalDateTime newCheckout
    );

    @Query("""
    SELECT COUNT(b) > 0 FROM Booking b
    WHERE b.roomId = :roomId
      AND b.id <> :bookingId
      AND b.checkOut > :newCheckinMinus1Hour
      AND b.checkIn < :newCheckout
""")
    boolean existsOverlappingBookingExceptBookingId(
            @Param("roomId") Long roomId,
            @Param("newCheckinMinus1Hour") LocalDateTime newCheckinMinus1Hour,
            @Param("newCheckout") LocalDateTime newCheckout,
            @Param("bookingId") Long bookingId
    );

    @Query("""
    SELECT COUNT(b) FROM Booking b
    WHERE b.checkIn <= :today
    AND b.checkOut > :today
    AND b.bookingStatus = :booked
""")
    Long getActiveBookings(
            @Param("today") LocalDateTime today,
            @Param("booked") BookingStatus status
    );

    @Query("""
    SELECT COUNT(b) FROM Booking b
    WHERE b.checkIn >= :today
    AND b.checkIn <= :week
    AND b.bookingStatus = :booked
""")
    Long getUpcomingBookings(
            @Param("today") LocalDateTime today,
            @Param("week") LocalDateTime week,
            @Param("booked") BookingStatus status
    );

}
