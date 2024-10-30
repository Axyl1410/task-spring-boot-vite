package com.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.Model.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Object> {

}
