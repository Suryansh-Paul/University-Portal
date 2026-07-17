package com.evan.uni.repo;

import com.evan.uni.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface User_repo extends JpaRepository<User, Integer> {


    Optional<User> findByUsername(String username);
    boolean existsByRole(String role);
    long countByRole(String role);
}
