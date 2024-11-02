package com.backend.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.Auth.JWTUtility;
import com.backend.Model.Task;
import com.backend.Service.TaskService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1/task")
public class TaskController {
  @Autowired
  private TaskService taskService;

  @GetMapping("/")
  public List<Task> getAllTasks() {
    return taskService.getTasks();
  }

  @GetMapping("/{id}")
  public Map<String, Object> getTaskById(@PathVariable int id, HttpServletRequest request) {
    Map<String, Object> response = new HashMap<>();
    String authorizationHeader = request.getHeader("Authorization");

    if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
      response.put("error", "Authorization header is missing or invalid.");
      return response;
    }

    String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
    String loggedInUsername = JWTUtility.extractUsername(token);

    Task task = taskService.getTaskById(id);
    if (task == null) {
      response.put("error", "Task not found.");
    } else if (!(task.getUsercreate().equalsIgnoreCase(loggedInUsername)
        || task.getResponsibility().equalsIgnoreCase(loggedInUsername))) {
      response.put("error", "You are not authorized to view this task.");
    } else {
      response.put("task", task);
    }
    return response;
  }

  @DeleteMapping("/delete/{id}")
  public Task deleteTaskById(@PathVariable int id) {
    return taskService.deleteTaskById(id);
  }

  @PostMapping("/create")
  public Task createTask(@RequestBody Task task) {
    return taskService.createTask(task);
  }

  @PutMapping("/update/{id}")
  public Task updateTask(@PathVariable int id, @RequestBody Task task) {
    task.setId(id);
    return taskService.updateTask(task);
  }

  @GetMapping("/usercreate/{usercreate}")
  public List<Task> getTasksByUserCreate(@PathVariable String usercreate) {
    return taskService.getTasksByUserCreate(usercreate);
  }

  @GetMapping("/responsibility/{responsibility}")
  public List<Task> getTasksByResponsibility(@PathVariable String responsibility) {
    return taskService.getTasksByResponsibility(responsibility);
  }
}
