-- CREATE DATABASE IF NOT EXISTS companydb;

-- USE companydb;

CREATE TABLE employee (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) DEFAULT NULL,
  salary INT(11) DEFAULT NULL, 
  PRIMARY KEY(id)
);

CREATE TABLE clients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  cognoms VARCHAR(150) NOT NULL,
  telefon VARCHAR(20),
  correu_electronic VARCHAR(100) UNIQUE NOT NULL,
  desti_viatge VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DESCRIBE employee;

INSERT INTO employee values 
  (1, 'Ryan Ray', 20000),
  (2, 'Joe McMillan', 40000),
  (3, 'John Carter', 50000);

SELECT * FROM employee;

INSERT INTO clients (nom, cognoms, telefon, correu_electronic, desti_viatge)
VALUES
  ('Anna', 'Serra Puig', '600123456', 'anna.serra@example.com', 'Roma'),
  ('Marc', 'Vila Soler', '600654321', 'marc.vila@example.com', 'París'),
  ('Laura', 'Ribas Font', '600987654', 'laura.ribas@example.com', 'Londres');
