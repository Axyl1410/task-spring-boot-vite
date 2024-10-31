package com.backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.Model.User;
import com.backend.Service.UserService;

@RestController
@RequestMapping("/api/v1/user")
public class UserControler {
  @Autowired
  private UserService userService;

  @PreAuthorize("hasRole('admin')")
  @GetMapping("/")
  public List<User> getUsers() {
    return userService.getUsers();
  }

  @PreAuthorize("hasRole('admin')")
  @GetMapping("/{id}")
  public User getUserById(@PathVariable int id) {
    return userService.getUserById(id).orElse(null);
  }

  @PreAuthorize("hasRole('admin')")
  @GetMapping("/delete/{id}")
  public User deleteUserById(@PathVariable int id) {
    return userService.deleteUserById(id);
  }

  @PreAuthorize("hasRole('admin')")
  @PostMapping("/create")
  public User createUser(@RequestBody User user) {
    return userService.createUser(user);
  }

  @PreAuthorize("hasRole('admin')")
  @PostMapping("/update/{id}")
  public User updateUser(@PathVariable int id, @RequestBody User user) {
    user.setId(id);
    return userService.updateUser(user);
  }
}
