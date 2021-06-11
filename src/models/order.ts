//@ts-ignore
import Client from '../database';
import { Product } from './product';

type ProductAndQuantity = {
    product: Product,
    quantity: number
}

export type Order = {
    id?: number;
    products?: ProductAndQuantity[],
    userId: string;
    status: string;
}

export type CreateOrder = {
    id?: number,
    quantity: string,
    orderId: string,
    productId: string
}

export class OrderStore {

    async createOrder(order: Order): Promise<Order> {
        try {
            //@ts-ignore
            const conn = await Client.connect();            
            const sql = 'INSERT INTO orders (status, "userId") VALUES($1, $2)';
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
            const sql = `SELECT * FROM orders WHERE "userId"=($1) AND status='active'`;
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

    async getCompletedOrdersByUser(id: string): Promise<Order[]> {
        try {
            //@ts-ignore
            const conn = await Client.connect();
            const sql = `SELECT * FROM orders WHERE "userId"=($1) AND status='complete'`;
            const result = await conn.query(sql, [id]);
            conn.release();

            const getOrders = async(): Promise<Order[]> => {
                return Promise.all(result.rows.map( async (row: Order) => {                
                    const orderId = String(row.id);                
                    row.products = await this.getProductsForOrder(orderId);                   
                return (row);                
                }));
            };            
            const orders = getOrders().then(data => {
                return data;                
            });
            
            return orders;
        } catch (err) {
            throw new Error(`Could not get completed orders for user with id ${id}`);
        }
    }

    async addProductToOrder(createOrder: CreateOrder): Promise<CreateOrder> {
        try {
            console.log(createOrder)
            //@ts-ignore
            const conn = await Client.connect(); 
            const sql = 'INSERT INTO order_products (quantity, "orderId", "productId") VALUES($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [createOrder.quantity, createOrder.orderId, createOrder.productId]);            
            conn.release();

            return result.rows[0];

        } catch (err) {
            throw new Error(`Could not add product with id ${createOrder.productId} to order ${createOrder.orderId}. Error: ${err}`);
        }
    }

    private async getProductsForOrder(orderId: string): Promise<ProductAndQuantity[]> {
        try {
            //@ts-ignore
            const conn = await Client.connect(); 
            const sql = 'SELECT * FROM products p JOIN order_products op ON p.id = op."productId"  WHERE op."orderId"=($1)';
            const result = await conn.query(sql, [orderId]);
            conn.release();   
       
            const orderProducts = result.rows.map((row: { productId: number; name: string; price: string; category: string; quantity: number }) => {
                return{ product: {
                    id: row.productId,
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