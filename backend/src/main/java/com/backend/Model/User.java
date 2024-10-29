package com.backend.Model;

import com.backend.Enum.UserEnum;
import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user")
@Entity
@Getter
@Setter
public class User {
  @Id
  private int id;
  private String username;
  private String password;
  @Enumerated(EnumType.STRING)
  private UserEnum role;
}
