import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';

const store = new UserStore();

const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await store.getAllUsers();
        return res.json(users);
    } catch (err) {
        return res.status(400).json(err.toString());
    }
    
}

const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await store.getUserById(req.params.id);
        return res.json(user);  
    } catch(err) {
        return res.status(400).json(err.toString());
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
        return res.json(newUser);

    } catch (err) {
        return res.status(400).json(err.toString());
    }     
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await store.deleteUser(req.params.id);
        return res.json(user);
    } catch(err) {
        return res.status(400).json(err.toString())
    }

    
}

const user_routes = (app: express.Application) => {
    app.get('/users', getAllUsers);
    app.get('/users/:id', getUserById); 
    app.post('/users', createUser); 
    app.delete('/users/:id', deleteUser);  
}


export default user_routes;