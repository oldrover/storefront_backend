CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(64) NOT NULL,
    "userId" BIGINT REFERENCES users(id) 
);