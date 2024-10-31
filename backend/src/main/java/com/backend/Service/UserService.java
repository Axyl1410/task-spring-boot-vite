package com.backend.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.Model.User;
import com.backend.Repository.UserRepository;

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
    Optional<User> user = userRepository.findById(id);
    if (user.isPresent()) {
      userRepository.delete(user.get());
      return user.get();
    }
    return null;
  }

  public User createUser(User user) {
    return userRepository.save(user);
  }

  public User updateUser(User user) {
    return userRepository.save(user);
  }

  public User findByUsername(String username) {
    return userRepository.findByusername(username);
  }

  public User deleteUserByUsername(String username) {
    User user = userRepository.findByusername(username);
    if (user != null) {
      userRepository.delete(user);
      return user;
    }
    return null;
  }
}
