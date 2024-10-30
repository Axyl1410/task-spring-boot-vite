package com.backend.Auth;

import com.backend.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginRepository extends JpaRepository<User, Object> {
  User findByUsernameAndPassword(String username, String password);
}
