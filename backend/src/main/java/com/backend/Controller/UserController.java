package com.backend.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.Auth.JWTUtility;
import com.backend.Model.User;
import com.backend.Service.UserService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
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
  public Map<String, String> deleteUser(@PathVariable String username, HttpServletRequest request) {
    String authorizationHeader = request.getHeader("Authorization");
    Map<String, String> response = new HashMap<>();

    if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
      response.put("error", "Authorization header is missing or invalid.");
      return response;
    }

    String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
    String loggedInUsername = JWTUtility.extractUsername(token);

    if (loggedInUsername.equals(username)) {
      response.put("error", "You cannot delete your own account.");
    } else {
      User isDeleted = userService.deleteUserByUsername(username);
      if (isDeleted != null) {
        response.put("success", "User deleted successfully.");
      } else {
        response.put("error", "User not found.");
      }
    }
    return response;
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
