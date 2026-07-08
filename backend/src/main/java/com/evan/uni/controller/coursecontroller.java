package com.evan.uni.controller;


import com.evan.uni.model.course;
import com.evan.uni.service.course_service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class coursecontroller {
    @Autowired
    private course_service service;
     @GetMapping({"/course", "/courses"})
    public ResponseEntity<List<course>> getallcourse(){
        return new ResponseEntity<>(service.getallcourses(), HttpStatus.OK);
    }
    @GetMapping("/courses/{id}")
    public ResponseEntity< course> getcoursebyid(@PathVariable int id) {
        course courses = service.getcoursebyid(id);
        if (courses != null) {
            return new ResponseEntity<>(courses, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/courses")
    public ResponseEntity<?> addcourse( @RequestBody course courses){
       try{
           course course1= service.addcourses(courses);
           return new ResponseEntity<>(course1, HttpStatus.CREATED);
       } catch (Exception e) {
           return new ResponseEntity<>( e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
       }
    }
    @PutMapping("/courses/{id}")
    public ResponseEntity<String> updatecourse(@PathVariable int id, @RequestBody course courses){
         course course1= service.updatecourse(id,courses);
         if(course1!= null){
             return new ResponseEntity<>("updated bro", HttpStatus.OK);
         }
         else{
             return new ResponseEntity<>("failed to update bro ", HttpStatus.BAD_REQUEST);
         }
    }

    @DeleteMapping("/courses/{id}")
    public ResponseEntity<String> deletecourse(@PathVariable int id){
         course course1= service.getcoursebyid(id);
         if(course1!=null){
             service.deletecoursebyid(id);
             return new ResponseEntity<>("deleted successfully bro", HttpStatus.OK);
         }
         else{
             return new ResponseEntity<>("failed to delete bro", HttpStatus.NOT_FOUND);
         }
    }


























}
