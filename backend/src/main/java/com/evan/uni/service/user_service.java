package com.evan.uni.service;

import com.evan.uni.model.User;
import com.evan.uni.repo.User_repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class user_service {

    @Autowired
    private User_repo repo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<User> getAllUsers() {
        return repo.findAll();
    }

    public User getUserById(int id) {
        return repo.findById(id).orElse(null);
    }

    public User addUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return repo.save(user);
    }

    public User updateUser(int id, User user) {

        User existingUser = repo.findById(id).orElse(null);

        if (existingUser != null) {

            existingUser.setUsername(user.getUsername());

            if (user.getPassword() != null && !user.getPassword().isBlank()) {
                existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
            }

            existingUser.setRole(user.getRole());

            return repo.save(existingUser);
        }

        return null;
    }

    public void deleteUser(int id) {
        repo.deleteById(id);
    }
}