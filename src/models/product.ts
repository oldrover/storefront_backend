import Client from '../database';

export type Product = {
    id: Number;
    name: string;
    price: number;
    category: string;
}

export class StoreProduct {
    async getAllProducts(): Promise<Product[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);        
            conn.release();

            return result.rows;
        } catch(err) {
            throw new Error(`Cannot get products: ${err}`);
        }        
    }
    async getProductById(id: string): Promise<Product> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await conn.query(sql, [id]);        
            conn.release();

            return result.rows[0];
        } catch(err) {
            throw new Error(`Could not find product with id:${id}. Error: ${err}`);
        }   
    }

    async saveProduct(product: Product): Promise<Product> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3, $4)';
            const result = await conn.query(sql, [product.name, product.price ,product.category]);        
            conn.release();

            return product;
        } catch(err) {
            throw new Error(`Could not add new product ${product.name}. Error: ${err}`);
        }
    }
}
