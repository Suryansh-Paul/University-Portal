package com.evan.uni.controller;

import com.evan.uni.dtos.CurrentUserResponse;
import com.evan.uni.dtos.LoginResponse;
import com.evan.uni.model.User;
import com.evan.uni.repo.User_repo;
import com.evan.uni.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class authcontroller {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private User_repo userRepo;
    @Autowired
    private JwtService service;
    @PostMapping("/login")
    ResponseEntity<LoginResponse> login(@RequestBody User user) {




        Authentication AuthenticationToken = new UsernamePasswordAuthenticationToken(user.getUsername(),user.getPassword()) ;
        authenticationManager.authenticate(AuthenticationToken);
    String jwt = service.generateToken(user.getUsername());
          return  ResponseEntity.ok( new LoginResponse(jwt));
    }

    @GetMapping("/api/me")
    public ResponseEntity<CurrentUserResponse> getCurrentUser(Authentication authentication) {

        User user = userRepo.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        CurrentUserResponse response =
                new CurrentUserResponse(user.getUsername(), user.getRole());

        return ResponseEntity.ok(response);
    }

}
