package com.evan.uni.service;

import com.evan.uni.model.student;
import com.evan.uni.repo.student_repo;
import org.hibernate.query.sql.internal.ParameterRecognizerImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;

import java.util.List;

@Service
public class student_service {
    @Autowired
    private student_repo repo;


    public List<student> getallstudents() {
        return repo.findAll();
    }

    public student getstudentbyid(int id) {
        return repo.findById(id).orElse(null);
    }


    public student addstudent(student stud) {
        return repo.save(stud);
    }


    public student updatestudent(int id, student students) {
        return repo.save(students);
    }

    public void deletestudent(int id) {
         repo.deleteById(id);
    }


    public List<student> searchstudents(String keyword) {
        return repo.search(keyword);
    }
}
