CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    "userName" VARCHAR(50) NOT NULL,
    "firstName" VARCHAR(100) NOT NULL,
    "lastName" VARCHAR(100) NOT NULL,
    password VARCHAR(256) NOT NULL 
);