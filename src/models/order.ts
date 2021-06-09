//@ts-ignore
import Client from '../database';
import { Product } from './product';

type ProductAndQuantity = {
    product: Product,
    quantity: number
}

export type Order = {
    id?: string;
    products?: ProductAndQuantity[],
    userId: string;
    status: string;
}

export class OrderStore {

    async createOrder(order: Order): Promise<Order> {
        try {
            //@ts-ignore
            const conn = await Client.connect();            
            const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2)';
            const result = await conn.query(sql, [order.status, order.userId]);
            conn.release();

            return order;
        } catch (err) {
            throw new Error(`Could not create order for user ${order.userId}. Error: ${err}`);
        }
    }

    async getCurrentOrderByUser(id: string): Promise<Order> {
        try {            
            //@ts-ignore
            const conn = await Client.connect();
            const sql = "SELECT * FROM orders WHERE userId=($1) AND status='active'";
            const result = await conn.query(sql,[id]);            
            const orderId = result.rows[0].id;
            conn.release();

            const currentOrder = result.rows[0];
            currentOrder.products = await this.getProductsForOrder(orderId);            
            
            return currentOrder;

        } catch (err) {
            throw new Error(`Could not get order for user with id ${id}. Error: ${err}`);
        }
    } 

    async getCompletedOrdersByUser(id: string): Promise<Order> {
        try {
            //@ts-ignore
            const conn = await Client.connect();
            const sql = "SELECT * FROM orders WHERE userId=($1) AND status='complete'";
            const result = await conn.query(sql, [id]);
            conn.release();

            return result.rows;
        } catch (err) {
            throw new Error(`Could not get completed orders for user with id ${id}`);
        }
    }

    async addProductToOrder(quantity: number, orderId: string, productId: string): Promise<Order> {
        try {
            //@ts-ignore
            const conn = await Client.connect();
            const sql = 'INSERT INTO order_products (quantity, orderId, productId) VALUES($1, $2, $3)';
            const result = conn.query(sql, [quantity, orderId, productId]);            
            conn.release();

            const order = result.rows[0];

            return order;
        } catch (err) {
            throw new Error(`Could not add product with id ${productId} to order ${orderId}. Error: ${err}`);
        }
    }

    private async getProductsForOrder(orderId: number): Promise<ProductAndQuantity[]> {
        try {
            //@ts-ignore
            const conn = await Client.connect(); 
            const sql = 'SELECT * FROM products p JOIN order_products op ON p.id = op.productId  WHERE op.orderId=($1)';
            const result = await conn.query(sql, [orderId]);
            conn.release();
       
            const orderProducts = result.rows.map((row: { product_id: number; name: string; price: string; category: string; quantity: number }) => {
                return{ product: {
                    id: row.product_id,
                    name: row.name,
                    price: row.price,
                    category: row.category
                }, quantity: row.quantity }; 
            }); 

            return orderProducts;
        } catch (err) {
            throw new Error(`Could not get products for order ${orderId}`);

        }

    }
}