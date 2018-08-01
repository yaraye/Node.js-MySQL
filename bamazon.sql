Drop DATABASE bamazonDB;
CREATE DATABASE bamazonDB;

use bamazonDB;

CREATE TABLE products(

id INT NOT NULL AUTO_INCREMENT, 

product_name VARCHAR(70) NOT NULL,

department_name VARCHAR(70),

price DECIMAL(10,2) NOT NULL,

stock_quantity INTEGER (50) NOT NULL,

PRIMARY KEY (id)

);


INSERT INTO bamazonDB.products (product_name, department_name, price, stock_quantity)
VALUE ("soda", "beverage", 1.35, 10), ("water", "beverage", 1.00, 50),("bread", "bakery", 2.05, 40),("cake", "bakery", 4.99, 10),
	("ice-cream", "dessert", 3.00, 40), ("wine", "alcohol", 15.00, 100), ("beer", "alcohol", 15.90, 70),("apple", "fruit", 3.99, 100),
    ("pear", "fruit", 5.99, 200),  ("banana", "fruit", 6.99, 150);


SELECT * FROM bamazonDB.products;


