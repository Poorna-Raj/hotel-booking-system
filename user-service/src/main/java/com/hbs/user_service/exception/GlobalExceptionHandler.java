package com.hbs.user_service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(BadRequest.class)
    public ResponseEntity<ApiError> handleBadRequest(BadRequest ex, WebRequest req){
        ApiError error = new ApiError(
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                ex.getMessage(),
                req.getDescription(false).replace("uri=","")
        );

        return new ResponseEntity<>(error,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ContentNotFound.class)
    public ResponseEntity<ApiError> handleQuestionNotFound(ContentNotFound ex, WebRequest req){
        ApiError error = new ApiError(
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.getReasonPhrase(),
                ex.getMessage(),
                req.getDescription(false).replace("uri=","")
        );

        return new ResponseEntity<>(error,HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ServiceUnavailable.class)
    public ResponseEntity<ApiError> handleServiceUnavailable(ServiceUnavailable ex, WebRequest req){
        ApiError error = new ApiError(
                HttpStatus.SERVICE_UNAVAILABLE.value(),
                HttpStatus.SERVICE_UNAVAILABLE.getReasonPhrase(),
                ex.getMessage(),
                req.getDescription(false).replace("uri=","")
        );

        return new ResponseEntity<>(error,HttpStatus.SERVICE_UNAVAILABLE);
    }
}
