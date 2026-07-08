package com.evan.uni.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.autoconfigure.web.WebProperties;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String title;
    private String department;
    private int credits;
    private double price;
    private int duration;
    private String description;
    @OneToMany(mappedBy = "courses")
    @JsonIgnore
    private List<student> students;

}
