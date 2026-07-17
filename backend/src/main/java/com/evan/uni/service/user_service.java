package com.evan.uni.service;

import com.evan.uni.model.User;
import com.evan.uni.repo.User_repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

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

        User user = repo.findById(id).orElse(null);

        if (user == null) {
            throw new RuntimeException("User not found.");
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedInUsername = authentication.getName();

        // Prevent an admin from deleting themselves
        if (user.getUsername().equals(loggedInUsername)) {
            throw new RuntimeException("You cannot delete your own account.");
        }

        // Prevent deleting the last remaining admin
        if ("ADMIN".equals(user.getRole()) && repo.countByRole("ADMIN") <= 1) {
            throw new RuntimeException("Cannot delete the last administrator.");
        }

        repo.delete(user);
    }
}