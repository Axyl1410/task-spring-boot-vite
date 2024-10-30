package com.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.Model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Object> {
}
