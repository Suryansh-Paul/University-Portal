package com.evan.uni.controller;

import com.evan.uni.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class authcontroller {
    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    ResponseEntity<Authentication> login(@RequestBody User user) {




        Authentication AuthenticationToken = new UsernamePasswordAuthenticationToken(user.getUsername(),user.getPassword()) ;
    Authentication authentication =  authenticationManager.authenticate(AuthenticationToken);
          return new ResponseEntity<>(authentication, HttpStatus.OK);
    }


}
