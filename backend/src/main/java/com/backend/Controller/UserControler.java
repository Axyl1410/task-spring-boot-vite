package com.backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

  @GetMapping("/")
  public List<User> getUsers() {
    return userService.getUsers();
  }

  @GetMapping("/{id}")
  public User getUserById(@PathVariable int id) {
    return userService.getUserById(id).orElse(null);
  }

  @GetMapping("/delete/{id}")
  public User deleteUserById(@PathVariable int id) {
    return userService.deleteUserById(id);
  }

  @PostMapping("/create")
  public User createUser(@RequestBody User user) {
    return userService.createUser(user);
  }

  @PostMapping("/update/{id}")
  public User updateUser(@PathVariable int id, @RequestBody User user) {
    user.setId(id);
    return userService.updateUser(user);
  }
}
