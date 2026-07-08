package com.evan.uni.repo;

import com.evan.uni.model.course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface course_repo extends JpaRepository<course, Integer> {
}
