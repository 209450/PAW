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
INSERT INTO trello.Users(name, password) VALUES ("Steve", "pass");
INSERT INTO trello.Users(name, password) VALUES ("John", "pass");

INSERT INTO trello.Boards(name, owner) VALUES ("Steve's first board", 2);
INSERT INTO trello.Boards(name, owner) VALUES ("John's first board", 3);
INSERT INTO trello.Boards(name, owner) VALUES ("John's second board", 3);

INSERT INTO trello.Tables(name, board_id) VALUES ("To Do", 1);
INSERT INTO trello.Tables(name, board_id) VALUES ("In Progress", 1);
INSERT INTO trello.Tables(name, board_id) VALUES ("Done", 1);

INSERT INTO trello.Tables(name, board_id) VALUES ("Table table", 2);

INSERT INTO trello.Tables(name, board_id) VALUES ("Table1", 3);
INSERT INTO trello.Tables(name, board_id) VALUES ("Table2", 3);
INSERT INTO trello.Tables(name, board_id) VALUES ("Table3", 3);

INSERT INTO trello.Tasks(name, table_id) VALUES ("Do something", 1);
INSERT INTO trello.Tasks(name, table_id) VALUES ("Do something else", 1);
INSERT INTO trello.Tasks(name, table_id) VALUES ("Doing someting", 2);
INSERT INTO trello.Tasks(name, table_id) VALUES ("Someting is done", 3);

INSERT INTO trello.Tasks(name, table_id) VALUES ("task task", 4);

INSERT INTO trello.Tasks(name, table_id) VALUES ("task1", 5);
INSERT INTO trello.Tasks(name, table_id) VALUES ("task2", 6);
INSERT INTO trello.Tasks(name, table_id) VALUES ("task3", 7);
INSERT INTO trello.Tasks(name, table_id) VALUES ("task4", 7);