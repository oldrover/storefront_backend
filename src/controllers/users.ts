import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import verifyAuthToken from '../security/JWTAuthentication';
import { User, UserStore } from '../models/user';

dotenv.config();

//@ts-ignore
const TOKEN_SECRET: string  = process.env.TOKEN_SECRET;

const store = new UserStore();

const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await store.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(400).json(err.message);
    }    
}

const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await store.getUserById(req.params.id);        
        res.json(user);  
    } catch(err) {
        res.status(400).json(err.message);
    }
}

const createUser = async (req: Request, res: Response) => {
    try {
        const user: User = {
            userName: req.body.userName,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        }
    
        const newUser = await store.createUser(user);
        const token = jwt.sign({user: newUser}, TOKEN_SECRET);
        res.json(token);

    } catch (err) {
        res.status(400).json(err.message);
    }     
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await store.deleteUser(req.params.id);
        res.json(user);
    } catch(err) {
        res.status(400).json(err.message)
    }

    
}

const user_routes = (app: express.Application) => {
    app.get('/users', verifyAuthToken, getAllUsers);
    app.get('/users/:id', verifyAuthToken, getUserById); 
    app.post('/users', createUser); 
    app.delete('/users/:id', verifyAuthToken, deleteUser);  
}


export default user_routes;