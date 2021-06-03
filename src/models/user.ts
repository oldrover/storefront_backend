//@ts-ignore
import Client from '../database';
import bcrypt from 'bcrypt';

export type User = {
    id: Number;
    userName: string;
    firstName: string;
    lastName: string;
    password: string;
}

const saltRounds:string | undefined = process.env.SALT_ROUNDS;
const pepper: string | undefined = process.env.BCRYPT_PASSWORD;

export class StoreUser {
    async getAllUsers(): Promise<User[]> {
        try {
            //@ts-ignore
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);        
            conn.release();

            return result.rows;
        } catch(err) {
            throw new Error(`Unable to get users: ${err}`);
        }        
    }
    async getUserById(id: string): Promise<User> {
        try {
            //@ts-ignore
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);        
            conn.release();

            return result.rows[0];
        } catch(err) {
            throw new Error(`Could not find user with id:${id}. Error: ${err}`);
        }   
    }

    async createUser(user: User): Promise<User> {
        try {
            //@ts-ignore
            const conn = await Client.connect();
            const sql = 'INSERT INTO users (userName, firstName, lastName, password) VALUES($1, $2, $3, $4) RETURNING *';
            const hash = bcrypt.hashSync(user.password + pepper, parseInt(saltRounds || '10'));
            const result = await conn.query(sql, [user.userName, user.firstName, user.lastName ,hash]);        
            conn.release();

            return user;
        } catch(err) {
            throw new Error(`Could not add new user ${user.userName}. Error: ${err}`);
        }
    }

    async authenticate( userName: string, password: string): Promise<User | null> {
        //@ts-ignore
        const conn = await Client.connect();
        const sql = 'SELECT password from users WHERE userName=($1)';
        const result = await conn.query(sql, [userName]);
        conn.release();

        if(result.rows.length) {
            const user = result.rows[0];

            if(bcrypt.compareSync(password + pepper, user.password)) {
                return user;
            }
        }
        return null;

    }

}
