package com.evan.uni.service;

import com.evan.uni.model.User;
import com.evan.uni.repo.User_repo;
import com.evan.uni.security.MyUserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class MyUserDetail_service implements UserDetailsService {
    @Autowired
    private User_repo repo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       User user = repo.findByUsername(username).orElseThrow(()->new UsernameNotFoundException("user not found"));

       return new MyUserPrincipal(user);




    }
}
