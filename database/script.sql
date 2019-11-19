DROP SCHEMA IF EXISTS trello;
CREATE SCHEMA trello;
USE trello;

CREATE TABLE `Users` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL UNIQUE,
	`password` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

USE trello;
CREATE TABLE `Tables` (
	`id` int NOT NULL AUTO_INCREMENT,
	`board_id` int NOT NULL,
	`name` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

USE trello;
CREATE TABLE `Tasks` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	`table_id` int(255) NOT NULL,
	PRIMARY KEY (`id`)
);

USE trello;
CREATE TABLE `Boards` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	`owner` int(255) NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `Tables` ADD CONSTRAINT `Tables_fk0` FOREIGN KEY (`board_id`) REFERENCES `Boards`(`id`);

ALTER TABLE `Tasks` ADD CONSTRAINT `Tasks_fk0` FOREIGN KEY (`table_id`) REFERENCES `Tables`(`id`);

ALTER TABLE `Boards` ADD CONSTRAINT `Boards_fk0` FOREIGN KEY (`owner`) REFERENCES `Users`(`id`);

INSERT INTO trello.Users(name, password) VALUES ("test1", "haslo");