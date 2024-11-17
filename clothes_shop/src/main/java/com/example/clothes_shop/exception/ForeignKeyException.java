package com.example.clothes_shop.exception;

public class ForeignKeyException extends RuntimeException {
    public ForeignKeyException(String message) {
        super(message);
    }
}
