package com.backend.Model;

import com.backend.Enum.TaskEnum;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "task")
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
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
