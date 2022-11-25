package com.webserver.todolist.exceptions;

public class ITaskNotFoundException extends RuntimeException {
    public ITaskNotFoundException(String s) {
        super(s);
    }
}
