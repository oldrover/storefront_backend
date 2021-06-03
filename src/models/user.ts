import Client from '../database';

export type User = {
    id: Number;
    firstname: string;
    lastname: string;
    password: string;
}

export class StoreUser {
    async getAllUsers(): Promise<User[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);        
            conn.release();

            return result.rows;
        } catch(err) {
            throw new Error(`Cannot get users: ${err}`);
        }        
    }
    async getUserById(id: string): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);        
            conn.release();

            return result.rows[0];
        } catch(err) {
            throw new Error(`Could not find user with id:${id}. Error: ${err}`);
        }   
    }

    async saveProduct(user: User): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3, $4)';
            const result = await conn.query(sql, [user.firstname, user.lastname ,user.password]);        
            conn.release();

            return user;
        } catch(err) {
            throw new Error(`Could not add new user ${user.firstname} ${user.lastname}. Error: ${err}`);
        }
    }
}
