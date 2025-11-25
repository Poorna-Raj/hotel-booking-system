package com.hbs.booking_service.service;

import com.hbs.booking_service.data.dto.*;
import com.hbs.booking_service.data.model.Booking;
import com.hbs.booking_service.data.model.BookingPaymentStatus;
import com.hbs.booking_service.data.model.BookingStatus;
import com.hbs.booking_service.data.repository.BookingRepository;
import com.hbs.booking_service.exception.BadRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
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
        if(validator.isBookingValid(dto.getCheckIn(),dto.getCheckOut(), dto.getRoomId(),dto.getOccupancy())){
            Booking booking = new Booking();

            booking.setBookingStatus(BookingStatus.BOOKED);
            booking.setOccupancy(dto.getOccupancy());

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

    public BookingResponseDto updateBooking(long bookingId, BookingUpdateRequestDto dto){
        if(validator.isBookingValid(dto.getCheckIn(),dto.getCheckOut(), dto.getRoomId(), bookingId,dto.getOccupancy())){
            Booking oldBooking = repository.findById(bookingId)
                    .orElseThrow(() -> new BadRequest("Invalid Booking ID!"));

            if(!roomServiceClient.isRoomAvailable(dto.getRoomId())){
                throw new BadRequest("Room is not available!");
            }
            oldBooking.setRoomId(dto.getRoomId());

            oldBooking.setOccupancy(dto.getOccupancy());
            oldBooking.setCheckIn(dto.getCheckIn());
            oldBooking.setCheckOut(dto.getCheckOut());

            if(validator.isBookingStatusValid(dto.getBookingStatus())){
                oldBooking.setBookingStatus(BookingStatus.valueOf(dto.getBookingStatus()));
            }

            oldBooking.setCustomerName(dto.getCustomerName());
            oldBooking.setCustomerNic(dto.getCustomerNic());

            return mapToDtoFromModel(repository.save(oldBooking));
        } else{
            throw new BadRequest("Invalid Booking!");
        }
    }

    public boolean deleteBooking(long bookingId){
        Booking booking = repository.findById(bookingId)
                .orElseThrow(() -> new BadRequest("Invalid Booking ID!"));

        repository.delete(booking);
        return true;
    }

    public BookingResponseDto getBookingById(long bookingId){
        return mapToDtoFromModel(repository.findById(bookingId)
                .orElseThrow(() -> new BadRequest("Invalid Booking ID!")));
    }

    public List<BookingResponseDto> getAllBookings(){
        return repository.findAll()
                .stream()
                .map(this::mapToDtoFromModel)
                .toList();
    }

    public boolean updateBookingPaymentStatus(long bookingId, BookingStatusUpdateDto dto){
        Booking booking = repository.findById(bookingId)
                .orElseThrow(() -> new BadRequest("Invalid Booking ID!"));
        if(validator.isBookingPaymentStatusValid(dto.getStatus())) {
            booking.setPaymentStatus(BookingPaymentStatus.valueOf(dto.getStatus()));
            repository.save(booking);
            return true;
        }
        return false;
    }

    public Boolean isBookingValidForPayments(long bookingId){
        Booking booking = repository.findById(bookingId)
                .orElseThrow(() -> new BadRequest("Invalid Booking ID!"));

        return booking.getBookingStatus() == BookingStatus.BOOKED;
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
        dto.setOccupancy(booking.getOccupancy());

        return dto;
    }
}
