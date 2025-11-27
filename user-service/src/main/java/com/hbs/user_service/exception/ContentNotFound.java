package com.hbs.user_service.exception;

public class ContentNotFound extends RuntimeException {
    public ContentNotFound(String message) {
        super(message);
    }
}
