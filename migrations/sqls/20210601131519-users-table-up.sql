CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    userName VARCHAR(50),
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    password VARCHAR(256) 
);