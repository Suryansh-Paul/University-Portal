package com.evan.uni.dtos;




import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public class UpdateStudentRequest{

        @NotBlank(message = "Username cannot be blank")
        @Size(min = 3, max = 50)
        private String username;

        // Optional during update
        private String password;

        @NotBlank(message = "Name cannot be blank")
        @Size(min = 2, max = 50)
        private String name;

        @Email(message = "Please enter a valid email")
        @NotBlank(message = "Email cannot be blank")
        private String email;

        @Min(value = 101, message = "Roll number cannot be less than 101")
        private int rollNumber;

        @Min(value = 16, message = "Student must be older than 15")
        private int age;

        private int courseId;
    }

