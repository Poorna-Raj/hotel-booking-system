package com.hbs.booking_service.service;

import com.hbs.booking_service.data.dto.BookingRequestDto;
import com.hbs.booking_service.data.dto.BookingResponseDto;
import com.hbs.booking_service.data.dto.PaymentRequestDto;
import com.hbs.booking_service.data.model.Booking;
import com.hbs.booking_service.data.model.BookingPaymentStatus;
import com.hbs.booking_service.data.model.BookingStatus;
import com.hbs.booking_service.data.repository.BookingRepository;
import com.hbs.booking_service.exception.BadRequest;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

public class BookingService {
    @Autowired
    private BookingRepository repository;

    @Autowired
    private BookingValidator validator;

    @Autowired
    private RoomServiceClient roomServiceClient;

    @Autowired
    private UserServiceClient userServiceClient;

    @Autowired
    private PaymentServiceClient paymentServiceClient;

    public BookingResponseDto addBooking(BookingRequestDto dto){
        if(validator.isBookingValid(dto.getCheckIn(),dto.getCheckOut(), dto.getRoomId())){
            Booking booking = new Booking();

            booking.setBookingStatus(BookingStatus.BOOKED);

            if(!userServiceClient.validateUser(dto.getCreatedBy())) {
                throw new BadRequest("Invalid User for the given ID!");
            }
            booking.setCreatedBy(dto.getCreatedBy());

            booking.setCustomerName(dto.getCustomerName());
            booking.setCustomerNic(dto.getCustomerNic());

            if(!roomServiceClient.isRoomAvailable(dto.getRoomId())){
                throw new BadRequest("Room is not available!");
            }
            booking.setRoomId(dto.getRoomId());

            booking.setUpdatedAt(LocalDateTime.now());
            booking.setTotalAmount(getTotalAmount(dto.getCheckIn(),dto.getCheckOut(),dto.getRoomId()));
            booking.setCreatedAt(LocalDateTime.now());
            booking.setCheckOut(dto.getCheckOut());
            booking.setCheckIn(dto.getCheckIn());
            booking.setPaymentStatus(BookingPaymentStatus.PENDING_ADVANCE);

            Booking savedBooking = repository.save(booking);

            sendAdvancePayment(savedBooking,dto);

            return mapToDtoFromModel(savedBooking);
        } else{
            throw new BadRequest("Invalid Booking!");
        }
    }

    private void sendAdvancePayment(Booking savedBooking, BookingRequestDto dto) {
        PaymentRequestDto requestDto = new PaymentRequestDto();
        requestDto.setBookingId(savedBooking.getId());
        requestDto.setPaymentStatus("SUCCESS");
        requestDto.setAmount(dto.getAdvancePayment());
        requestDto.setPaymentType(dto.getPaymentType());
        requestDto.setUserId(savedBooking.getCreatedBy());
        if(dto.getPaymentType().equals("CARD")){
            requestDto.setTransactionId(dto.getTransactionId());
        }
        requestDto.setPaymentReason("ADVANCE");

        paymentServiceClient.addPayment(requestDto);
    }

    private double getTotalAmount(LocalDateTime checkIn, LocalDateTime checkOut, long roomId) {
        double pricePerDay = roomServiceClient.getPrice(roomId);

        long nights = ChronoUnit.DAYS.between(checkIn.toLocalDate(), checkOut.toLocalDate());

        if (nights <= 0) {
            nights = 1;
        }

        return nights * pricePerDay;
    }

    public BookingResponseDto mapToDtoFromModel(Booking booking){
        BookingResponseDto dto = new BookingResponseDto();
        dto.setId(booking.getId());
        dto.setUpdatedAt(booking.getUpdatedAt());
        dto.setCustomerNic(booking.getCustomerNic());
        dto.setRoomId(booking.getRoomId());
        dto.setCheckIn(booking.getCheckIn());
        dto.setTotalAmount(booking.getTotalAmount());
        dto.setCheckOut(booking.getCheckOut());
        dto.setBookingStatus(booking.getBookingStatus().toString());
        dto.setCreatedBy(booking.getCreatedBy());
        dto.setCreatedAt(booking.getCreatedAt());
        dto.setCustomerName(booking.getCustomerName());

        return dto;
    }
}
