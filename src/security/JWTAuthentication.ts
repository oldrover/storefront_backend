import { Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

//@ts-ignore
const TOKEN_SECRET: string  = process.env.TOKEN_SECRET;

const verifyAuthToken = (req: Request, res: Response, next: Function): void => {
    try {
        const authorizationHeader = req.headers.authorization; 
        //@ts-ignore       
        const token = authorizationHeader.split(' ')[1];
        const decoded = jwt.verify(token, TOKEN_SECRET);

        next()
    } catch (err) {
        res.status(401).json(err);
    }
}

export default verifyAuthToken;