package com.evan.uni.service;


import com.evan.uni.model.course;
import com.evan.uni.repo.course_repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class course_service {
    @Autowired
    private course_repo repo;


    public List<course> getallcourses() {
        return repo.findAll();
    }

    public course getcoursebyid(int id) {
        return repo.findById(id).orElse(null);
    }


    public course addcourses(course courses) {
        return repo.save(courses);
    }


    public course updatecourse(int id, course courses) {
        return repo.save(courses);
    }


    public void deletecoursebyid(int id) {
         repo.deleteById(id);
    }
}
