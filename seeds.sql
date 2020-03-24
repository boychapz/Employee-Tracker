-- Drops the blogger if it exists currently --
DROP DATABASE IF EXISTS Management_db;
-- Creates the "blogger" database --
CREATE DATABASE Management_db;

USE Management_db;

CREATE TABLE department
(
        id INTEGER NOT NULL
        AUTO_INCREMENT PRIMARY KEY,
name VARCHAR
        (30) not null,
PRIMARY KEY
        (id)
);

        Create table roles
        (
                id Int not null
                AUTO_INCREMENT,
title varchar
                (30) not null,
salary decimal
                (8,2) not null,
department_id int not null,
primary key
                (id),
CONSTRAINT fk_department_id FOREIGN KEY
                (department_id)
        REFERENCES department
                (id)
);

                create table employee
                (
                        id int not null
                        auto_increment,
first_name varchar
                        (30) not null,
last_name varchar
                        (30) not null,
role_id int not null,
primary key
                        (id),
manager_id int,
constraint fk_role_id foreign key
                        (role_id) references roles
                        (id),
constraint fk_manager_id foreign key
                        (manager_id) references employee
                        (id)
);

                        INSERT INTO department
                                (name)
                        VALUES
                                ("Sales"),
                                ("legal"),
                                ("Accountant"),
                                ("IT");

                        INSERT INTO roles
                                (title, salary, department_id)
                        VALUES
                                ("Sales Representative", 50000, 1),
                                ("Sales Lead", 80000, 1),
                                ("Lawyer", 70000, 2),
                                ("Head Attorney", 110000, 2),
                                ("Junior Engineer", 75000, 3),
                                ("Senior Engineer", 135000, 3),
                                ("Junior Engineer", 75000, 3),
                                ("Junior Accountant", 60000, 4),
                                ("Senior Accountant", 100000, 4);

                        Insert into employee
                                (first_name, last_name, role_id)
                        values("James", "White", 1),
                                ("Martha", "Glendale", 1),
                                ("Tyler", "Johnson", 3),
                                ("Marie", "Loius", 2),
                                ("Greg", "Dawson", 2),
                                ("Brandon", "Eric", 2),
                                ("Beatrice", "Suthers", 4),
                                ("Teddy", "Njie", 4),
                                ("Yolanda", "Beasley", 4),
                                ("Melanie", "Batton", 3);
