package com.example.demo.controller;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String msg){ super(msg); }
}
