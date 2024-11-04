-- Create the user table
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  PRIMARY KEY (`id`,`username`),
  UNIQUE KEY `username_UNIQUE` (`username`)
)

-- Create the task table
CREATE TABLE `task` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `usercreate` varchar(255) DEFAULT NULL,
  `responsibility` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `progress` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usercreate_idx` (`usercreate`),
  KEY `responsibility_idx` (`responsibility`),
  CONSTRAINT `fk_task_responsibility` FOREIGN KEY (`responsibility`) REFERENCES `user` (`username`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_task_usercreate` FOREIGN KEY (`usercreate`) REFERENCES `user` (`username`) ON DELETE SET NULL ON UPDATE CASCADE
);