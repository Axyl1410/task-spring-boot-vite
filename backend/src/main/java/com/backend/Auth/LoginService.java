package com.backend.Auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.Model.User;

@Service
public class LoginService {
  @Autowired
  private LoginRepository loginRepository;

  public String login(String username, String password) {
    User user = loginRepository.findByUsernameAndPassword(username, password);
    if (user != null) {
      return JWTUtility.generateToken(username, String.valueOf(user.getRole()));
    }
    return null;
  }
}