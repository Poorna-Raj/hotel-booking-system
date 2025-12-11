package com.hbs.booking_service.exception;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.sql.SQLIntegrityConstraintViolationException;
import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {
    private ApiError buildError(HttpStatus status, String message, HttpServletRequest request) {
        return new ApiError(
                LocalDateTime.now(),
                status.value(),
                status.getReasonPhrase(),
                message,
                request.getRequestURI()
        );
    }

    @ExceptionHandler(ContentNotFound.class)
    public ResponseEntity<ApiError> handleContentNotFound(ContentNotFound ex, HttpServletRequest req) {
        return new ResponseEntity<>(
                buildError(HttpStatus.NOT_FOUND, ex.getMessage(), req),
                HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler(BookingValidationError.class)
    public ResponseEntity<ApiError> handleBookingValidation(BookingValidationError ex, HttpServletRequest req){
        return new ResponseEntity<>(
                buildError(HttpStatus.CONFLICT, ex.getMessage(), req),
                HttpStatus.CONFLICT
        );
    }

    @ExceptionHandler(BadRequest.class)
    public ResponseEntity<ApiError> handleBadRequest(BadRequest ex, HttpServletRequest req) {
        return new ResponseEntity<>(
                buildError(HttpStatus.BAD_REQUEST, ex.getMessage(), req),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(ServiceUnavailable.class)
    public ResponseEntity<ApiError> handleServiceUnavailable(ServiceUnavailable ex, HttpServletRequest req) {
        return new ResponseEntity<>(
                buildError(HttpStatus.SERVICE_UNAVAILABLE, ex.getMessage(), req),
                HttpStatus.SERVICE_UNAVAILABLE
        );
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiError> handleIllegalArgument(IllegalArgumentException ex, HttpServletRequest req) {
        return new ResponseEntity<>(
                buildError(HttpStatus.BAD_REQUEST, ex.getMessage(), req),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(SQLIntegrityConstraintViolationException.class)
    public ResponseEntity<ApiError> handleSQLConstraint(SQLIntegrityConstraintViolationException ex, HttpServletRequest req) {
        return new ResponseEntity<>(
                buildError(HttpStatus.CONFLICT, "Database constraint violation: " + ex.getMessage(), req),
                HttpStatus.CONFLICT
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleGeneralException(Exception ex, HttpServletRequest req) {
        return new ResponseEntity<>(
                buildError(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), req),
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpServletRequest req){
        StringBuilder errorMessage = new StringBuilder();
        ex.getBindingResult().getFieldErrors().forEach(error -> {
            errorMessage
                    .append(error.getField())
                    .append(": ")
                    .append(error.getDefaultMessage())
                    .append("; ");
        });

        return new ResponseEntity<>(
                buildError(HttpStatus.BAD_REQUEST,errorMessage.toString().trim(),req),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ApiError> handleConstraintViolation(
            ConstraintViolationException ex,
            HttpServletRequest req
    ) {

        StringBuilder errorMessages = new StringBuilder();

        ex.getConstraintViolations().forEach(cv -> {
            errorMessages
                    .append(cv.getPropertyPath())
                    .append(": ")
                    .append(cv.getMessage())
                    .append("; ");
        });

        return new ResponseEntity<>(
                buildError(HttpStatus.BAD_REQUEST,errorMessages.toString().trim(),req),
                HttpStatus.BAD_REQUEST
        );
    }
}
