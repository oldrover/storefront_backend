//@ts-ignore
import Client from '../database';
import { Product } from './product';

export type Order = {
    id?: number;
    products: Product[];
    user_id: number;
    completed: boolean;
}

export class OrderStore {
    async getCurrentOrderByUser(id: string): Promise<Order> {
        try {
            //@ts-ignore
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=($1) AND completed=false';
            const result = conn.query(sql,[id]);

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not get order for user with id ${id}`);
        }

    } 

    async getCompletedOrdersByUser(id: string): Promise<Order> {
        try {
            //@ts-ignore
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=($1) AND completed=true';
            const result = conn.query(sql, [id]);

            return result.rows;
        } catch (err) {
            throw new Error(`Could not get completed orders for user with id ${id}`);
        }
            

    }
}