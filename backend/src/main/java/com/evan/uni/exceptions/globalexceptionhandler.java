package com.evan.uni.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class globalexceptionhandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String,String>> handlevalidationexceptions(MethodArgumentNotValidException ex){
        Map<String,String> errors = new HashMap<>();

        for(FieldError error:
            ex.getBindingResult()
                    .getFieldErrors()){
            errors.put(error.getField(),
            error.getDefaultMessage());
        }

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);


    }@ExceptionHandler(BadCredentialsException.class)
   public ResponseEntity<Map<String,String >> handleauthenticationexceptions(BadCredentialsException exp) {
        Map<String, String> errors = new HashMap<>();
            errors.put(exp.getMessage(), "invalid username or password");

        return new ResponseEntity<>(errors, HttpStatus.UNAUTHORIZED);
    }
}
