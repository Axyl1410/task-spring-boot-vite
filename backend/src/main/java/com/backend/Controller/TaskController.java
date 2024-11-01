package com.backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.Model.Task;
import com.backend.Service.TaskService;

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
  public Task getTaskById(@PathVariable int id) {
    return taskService.getTaskById(id);
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
