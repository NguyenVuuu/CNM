CREATE DATABASE IF NOT EXISTS shopdb;
USE shopdb;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  quantity INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO users (username, email, password) VALUES
('admin', 'admin@example.com', '123456'),
('user1', 'user1@example.com', '123456');

INSERT INTO products (name, price, quantity) VALUES
('Laptop Dell XPS 13', 25000000, 10),
('iPhone 15 Pro', 30000000, 15),
('Samsung Galaxy S24', 22000000, 20),
('iPad Air', 15000000, 12),
('AirPods Pro', 6000000, 30);

