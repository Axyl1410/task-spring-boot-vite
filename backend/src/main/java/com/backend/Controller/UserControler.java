package com.backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

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
  @DeleteMapping("/delete/{username}")
  public ResponseEntity<?> deleteUserByUsername(@PathVariable String username) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String currentUsername = authentication.getName();
    User currentUser = userService.findByUsername(currentUsername);

    if (currentUser != null && currentUser.getUsername().equalsIgnoreCase(username)) {
      return ResponseEntity.notFound().build();
    }

    User deletedUser = userService.deleteUserByUsername(username);
    return ResponseEntity.ok(deletedUser);
  }

  @PreAuthorize("hasRole('admin')")
  @PostMapping("/create")
  public User createUser(@RequestBody User user) {
    return userService.createUser(user);
  }

  @PreAuthorize("hasRole('admin')")
  @PutMapping("/update/{id}")
  public User updateUser(@PathVariable int id, @RequestBody User user) {
    user.setId(id);
    return userService.updateUser(user);
  }
}
