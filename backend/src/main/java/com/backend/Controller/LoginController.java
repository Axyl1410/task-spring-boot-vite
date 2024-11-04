package com.backend.Controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.Auth.JWTUtility;
import com.backend.Model.LoginRequest;
import com.backend.Service.LoginService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "http://localhost:5173") // Add your frontend URL here
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

  @GetMapping("/token")
  public Map<String, String> checkToken(HttpServletRequest request) {
    String authorizationHeader = request.getHeader("Authorization");
    Map<String, String> response = new HashMap<>();
    if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
      response.put("error", "Authorization header is missing or invalid.");
      return response;
    }
    String token = authorizationHeader.substring(7); // Remove "Bearer " prefix
    if (JWTUtility.validateToken(token, JWTUtility.extractUsername(token))) {
      response.put("message", "Token is valid.");
    } else {
      response.put("error", "Token is invalid.");
    }
    return response;
  }
}