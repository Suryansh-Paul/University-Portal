package com.evan.uni.config;

import com.evan.uni.model.User;
import com.evan.uni.repo.User_repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {
    @Autowired
    private User_repo repo;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Bean
    public CommandLineRunner init(){
        return args -> {
            if(!repo.existsByRole("ADMIN")){
                User admin = new User();
                admin.setUsername("admin");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setRole("ADMIN");
                repo.save(admin);
            }
            if (repo.findByUsername("student1").isEmpty()) {
                User student = new User();
                student.setUsername("student1");
                student.setPassword(passwordEncoder.encode("student123"));
                student.setRole("STUDENT");

               repo.save(student);
            }
        };

    }


}
