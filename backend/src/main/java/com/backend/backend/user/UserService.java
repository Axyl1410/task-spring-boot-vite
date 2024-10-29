package com.backend.backend.user;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
  @Autowired
  private UserRepository userRepository;

  public List<User> getUsers() {
    return userRepository.findAll();
  }

  public Optional<User> getUserById(int id) {
    return userRepository.findById(id);
  }

  public User deleteUserById(int id) {
    User user = userRepository.findById(id).orElse(null);
    if (user != null) {
      userRepository.deleteById(id);
    }
    return user;
  }

  public User createUser(User user) {
    return userRepository.save(user);
  }
}
