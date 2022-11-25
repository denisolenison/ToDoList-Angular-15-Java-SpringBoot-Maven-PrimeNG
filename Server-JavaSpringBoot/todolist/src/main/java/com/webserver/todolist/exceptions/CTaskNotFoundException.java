package com.webserver.todolist.exceptions;

public class CTaskNotFoundException extends RuntimeException {
    public CTaskNotFoundException(String s) {
        super(s);
    }
}
