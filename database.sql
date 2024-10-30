-- Create the user table
CREATE TABLE `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `job` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`, `username`),
  UNIQUE KEY `username_UNIQUE` (`username`)
);

-- Create the task table
CREATE TABLE `task` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `usercreate` VARCHAR(45) NOT NULL,
  `responsibility` VARCHAR(45) NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `usercreate_idx` (`usercreate` ASC),
  INDEX `responsibility_idx` (`responsibility` ASC),
  CONSTRAINT `fk_usercreate`
    FOREIGN KEY (`usercreate`)
    REFERENCES `user` (`username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_responsibility`
    FOREIGN KEY (`responsibility`)
    REFERENCES `user` (`username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);