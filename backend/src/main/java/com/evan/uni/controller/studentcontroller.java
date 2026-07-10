package com.evan.uni.controller;


import com.evan.uni.model.student;
import com.evan.uni.service.student_service;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class studentcontroller {
    @Autowired
    private student_service service;
    @PreAuthorize("hasAnyRole('ADMIN','STUDENT')")
    @GetMapping({"/students", "/student"})
    public ResponseEntity<List<student>> getallstudents(){
        return new ResponseEntity<>(service.getallstudents(), HttpStatus.OK);
    }
    @PreAuthorize("hasAnyRole('ADMIN','STUDENT')")
    @GetMapping("/students/{id}")
    public ResponseEntity<student> getstudbyid(@PathVariable int id){
        student stud1= service.getstudentbyid(id);
        if(stud1!= null ){
            return new ResponseEntity<>(stud1,HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/students")
    public ResponseEntity<?> addstudents(@Valid @RequestBody student stud){
        try{
            student stud1= service.addstudent(stud);
            return new ResponseEntity<>(stud1 ,HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/students/{id}")
    public ResponseEntity<String > updatestudents(@PathVariable int id, @Valid @RequestBody student students){
        student stud1= service.updatestudent(id,students);
        if(stud1!=null){
            return new ResponseEntity<>("updated bro", HttpStatus.OK);
        }else{
            return new ResponseEntity<>("failed to update bhaijaan", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PreAuthorize("hasRole('ADMIN')")
     @DeleteMapping("/students/{id}")
    public ResponseEntity<String> deletestudents(@PathVariable int id){
        student stud1= service.getstudentbyid(id);
        if(stud1!=null){
            service.deletestudent(id);
            return new ResponseEntity<>("deleted bro", HttpStatus.OK);
        }else{
            return new ResponseEntity<>("failed to delete bro", HttpStatus.INTERNAL_SERVER_ERROR);
        }
     }
    @PreAuthorize("hasAnyRole('ADMIN','STUDENT')")
     @GetMapping("/students/search")
     public ResponseEntity<List<student>> search( @RequestParam  String keyword ){
        List<student> students= service.searchstudents(keyword);
        return new ResponseEntity<>(students, HttpStatus.OK);
     }





}