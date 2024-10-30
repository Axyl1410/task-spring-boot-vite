package com.backend.Auth;

import com.backend.Model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {
  @Autowired
  private LoginRepository loginRepository;

  @Autowired
  private JWTUtility jwtUtility;

  public String login(String username, String password) {
    User user = loginRepository.findByUsernameAndPassword(username, password);
    if (user != null) {
      return JWTUtility.generateToken(username);
    }
    return null;
  }
}