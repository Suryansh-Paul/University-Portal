package com.evan.uni.model;


import jakarta.persistence.*;
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
@Entity
public class student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotBlank(message = "name cannot be blank")
    @Size(min = 2, max = 50)
    private String name;
    @Email(message = "please enter a valid email")
    @NotBlank( message = "cant be blank ji")
    private String email;
    @Min(value = 101, message = "roll no. cannot be less 101")
    private int rollNumber;
    @Min(value = 16 ,message = "student must be older than 15")
    private int age;
    @ManyToOne
    private course courses;
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

}
