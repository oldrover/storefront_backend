//@ts-ignore
import Client from '../database';

export type Product = {
    id?: number;
    name: string;
    price: string;
    category: string;
}

export class ProductStore {
    async getAllProducts(): Promise<Product[]> {
        try {
            //@ts-ignore
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
            //@ts-ignore
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
            //@ts-ignore
            const conn = await Client.connect();
            const sql = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [product.name, product.price ,product.category]);        
            conn.release();

            return result.rows[0];
        } catch(err) {
            throw new Error(`Could not add new product ${product.name}. Error: ${err}`);
        }
    }

    async deleteProduct(id: string): Promise<Product> {
        try {
            //@ts-ignore
            const conn = await Client.connect();
            const sql = 'DELETE FROM products WHERE id=($1)';
            const result = await conn.query(sql, [id]);

            return result.rows[0];
        } catch(err) {
            throw new Error(`Could not delete product with id ${id}`);
        }
    }

    async getProductsByCategory(category: string): Promise<Product[]> {
        try {
            //@ts-ignore
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products WHERE category=($1) ORDER BY name ASC';
            const result = await conn.query(sql, [category]);
            conn.release();

            return result.rows;
        } catch (err) {
            throw new Error(`Could not get products by category ${category}`);
        }
    }
}
