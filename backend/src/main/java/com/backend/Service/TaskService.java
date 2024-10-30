package com.backend.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.Model.Task;
import com.backend.Repository.TaskRepository;

@Service
public class TaskService {
  @Autowired
  private TaskRepository taskRepository;

  public List<Task> getTasks() {
    return taskRepository.findAll();
  }

  public Task getTaskById(int id) {
    return taskRepository.findById(id).orElse(null);
  }

  public Task deleteTaskById(int id) {
    Task task = taskRepository.findById(id).orElse(null);
    if (task != null)
      taskRepository.deleteById(id);
    return task;
  }

  public Task createTask(Task task) {
    return taskRepository.save(task);
  }

  public Task updateTask(Task task) {
    return taskRepository.save(task);
  }
}