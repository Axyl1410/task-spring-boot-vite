package com.task.taskmanager.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
  private int id;
  private String username;
  private String password;
  private UserEnum job;
}
