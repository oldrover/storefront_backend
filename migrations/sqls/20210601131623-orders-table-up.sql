CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(64),
    userId BIGINT REFERENCES users(id) 
);