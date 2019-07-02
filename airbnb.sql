CREATE DATABASE airbnb_db;

USE airbnb_db;

DROP TABLE airbnb;
DROP TABLE demographic;

CREATE TABLE airbnb (
id INT AUTO_INCREMENT PRIMARY KEY,
neighborhood VARCHAR(100),
neighborhood_overview VARCHAR(65000),
latitude FLOAT,
longitude FLOAT,
property_type VARCHAR(100),
bathrooms FLOAT,
room_type VARCHAR(100),
accommodates FLOAT,
bedrooms FLOAT,
beds FLOAT,
price FLOAT,
number_of_reviews FLOAT,
rating FLOAT);

CREATE TABLE airbnb_sqrft (
id INT AUTO_INCREMENT PRIMARY KEY,
neighborhood VARCHAR(100),
neighborhood_overview VARCHAR(65000),
latitude FLOAT,
longitude FLOAT,
property_type VARCHAR(100),
bathrooms FLOAT,
room_type VARCHAR(100),
accommodates FLOAT,
bedrooms FLOAT,
beds FLOAT,
square_feet FLOAT,
price FLOAT,
number_of_reviews FLOAT,
rating FLOAT);

DROP TABLE airbnb;
DROP TABLE airbnb_sqrft;

SELECT * FROM airbnb;
SELECT * FROM airbnb_sqrft;

