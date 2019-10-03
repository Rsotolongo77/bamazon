DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(255) NOT NULL,
  department_name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("laptop", "electronics", 1500, 12), 
("Ford Mustang", "Automotive", 43000, 2), 
("Diet pills", "Supplements", 7, 56), 
("Samsung 65inch TV", "Electronics", 850, 22), 
("BBS 19inch rims and tires", "Automotive", 425, 1), 
("Ginseng tablets", "Supplements", 3, 59),
("Colace laxaTive", "Supplements", 2.50, 35),
("Gold plated iPhone", "Electronics", 7000, 2),
("Michael Kors mens suit", "Fashion", 150, 4),
("Oakley sunglasses", "Fashion", 145, 10),
("NCL Alaskan cruise", "Travel", 2345, 13);


