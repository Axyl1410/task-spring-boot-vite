package com.backend.Repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.Model.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Object> {
  List<Task> findByusercreate(String usercreate);

  List<Task> findByresponsibility(String responsibility);

  Page<Task> findAllByOrderByIdDesc(Pageable pageable);
}
