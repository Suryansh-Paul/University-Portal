package com.evan.uni.security;

import com.evan.uni.service.MyUserDetail_service;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
@Component
public class JwtFilter extends OncePerRequestFilter{
    @Autowired
    private JwtService service;
    @Autowired
    private MyUserDetail_service userDetailService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        if(authHeader== null|| !authHeader.startsWith("Bearer ")){
            filterChain.doFilter(request,response);
            return;
        }
        String jwtToken = authHeader.substring(7);
        String username = service.extractUsername(jwtToken);
        UserDetails userDetails = userDetailService.loadUserByUsername(username);
        if(service.isTokenvalid(jwtToken , userDetails)){

        }
        filterChain.doFilter(request, response);
    }
}