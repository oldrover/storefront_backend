CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity INTEGER NOT NULL,
    "orderId" BIGINT REFERENCES orders(id),
    "productId" BIGINT REFERENCES products(id)
);