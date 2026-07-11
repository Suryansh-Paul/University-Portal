package com.evan.uni.service;

import com.evan.uni.dtos.CreateStudentRequest;
import com.evan.uni.model.User;
import com.evan.uni.model.course;
import com.evan.uni.model.student;
import com.evan.uni.repo.User_repo;
import com.evan.uni.repo.course_repo;
import com.evan.uni.repo.student_repo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class student_service {
    @Autowired
    private User_repo userRepo;

    @Autowired
    private course_repo courseRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private student_repo repo;


    public List<student> getallstudents() {
        return repo.findAll();
    }

    public student getstudentbyid(int id) {
        return repo.findById(id).orElse(null);
    }


    public student addstudent(CreateStudentRequest request) {
        if (userRepo.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        course course = courseRepo.findById(request.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        User user = new User();

        user.setUsername(request.getUsername());

        user.setPassword(passwordEncoder.encode(request.getPassword()));

        user.setRole("STUDENT");

        user = userRepo.save(user);

        student stud = new student();

        stud.setName(request.getName());
        stud.setEmail(request.getEmail());
        stud.setRollNumber(request.getRollNumber());
        stud.setAge(request.getAge());

        stud.setCourses(course);
        stud.setUser(user);

        return repo.save(stud);
    }


    public student updatestudent(int id, CreateStudentRequest request) {
        student stud = repo.findById(id).orElse(null);

        if (stud == null) {
            return null;
        }
        if (!stud.getUser().getUsername().equals(request.getUsername())
                && userRepo.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }
        course course = courseRepo.findById(request.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));


        User user = stud.getUser();

        user.setUsername(request.getUsername());

        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepo.save(user);

        stud.setName(request.getName());

        stud.setEmail(request.getEmail());

        stud.setRollNumber(request.getRollNumber());

        stud.setAge(request.getAge());

        stud.setCourses(course);

        return repo.save(stud);
    }

    public void deletestudent(int id) {


            student stud = repo.findById(id).orElse(null);

            if (stud == null) {
                return;
            }

            User user = stud.getUser();

        repo.delete(stud);

        userRepo.delete(user);
    }


    public List<student> searchstudents(String keyword) {
        return repo.search(keyword);
    }
}
