package com.evan.uni.repo;

import com.evan.uni.model.student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface student_repo extends JpaRepository<student, Integer> {


    @Query( """
            select s from student s  
            WHERE LOWER(s.name) 
            LIKE LOWER(CONCAT('%',:keyword ,'%' ))
            OR LOWER(s.email)
            LIKE LOWER(CONCAT('%', :keyword, '%'))
            OR LOWER(s.courses.title)
            LIKE LOWER(CONCAT('%', :keyword, '%'))
            OR LOWER(s.courses.department)
            LIKE LOWER(CONCAT('%', :keyword, '%'))
            """
    )
    List<student> search(@Param("keyword") String keyword);



}
