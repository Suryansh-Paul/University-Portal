package com.evan.uni.security;

import com.evan.uni.service.MyUserDetail_service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {


     @Autowired
    private MyUserDetail_service myUserDetailService ;
     @Autowired
    private JwtFilter jwtfilter;



     @Bean
    public SecurityFilterChain securityFilterChain (HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(request-> request
                .requestMatchers("/login")
                .permitAll()
                .anyRequest().authenticated());
        http.csrf(csrf -> csrf.disable());
        http.addFilterBefore(jwtfilter , UsernamePasswordAuthenticationFilter.class);
           return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
     public DaoAuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider() ;
       provider.setUserDetailsService(myUserDetailService);
       provider.setPasswordEncoder(passwordEncoder());
                 return provider;
    }
    @Bean
   public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
           return config.getAuthenticationManager();
    }







}
