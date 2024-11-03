package com.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.Model.User;

@Repository
public interface LoginRepository extends JpaRepository<User, Object> {
  User findByUsernameAndPassword(String username, String password);
}
