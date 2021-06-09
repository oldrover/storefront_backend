CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    userName VARCHAR(50) NOT NULL,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    password VARCHAR(256) NOT NULL 
);