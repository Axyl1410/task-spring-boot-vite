package com.backend.Model;

import com.backend.Enum.TaskEnum;
import jakarta.persistence.*;
import lombok.*;

@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "task")
@Entity
public class Task {
  @Id
  private int id;
  private String title;
  private String description;
  @Enumerated(EnumType.STRING)
  private TaskEnum status;
  private String usercreate;
  private String responsibility;
}
