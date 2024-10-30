package com.backend.Auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class LoginController {
  @Autowired
  private LoginService loginService;

  @PostMapping("/login")
  public Map<String, String> login(@RequestBody LoginRequest loginRequest) {
    String token = loginService.login(loginRequest.getUsername(), loginRequest.getPassword());
    Map<String, String> response = new HashMap<>();
    if (token != null) {
      response.put("token", token);
      response.put("role", JWTUtility.extractRole(token)); // Add role to response
    } else {
      response.put("error", "Invalid credentials");
    }
    return response;
  }
}