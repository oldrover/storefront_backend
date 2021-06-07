import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';

const store = new UserStore();

const getAllUsers = async (_req: Request, res: Response) => {
    const users = await store.getAllUsers();
    res.json(users);
}

const getUserById = async (req: Request, res: Response) => {
    const user = await store.getUserById(req.params.id);    
    res.json(user);
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
        res.json(newUser);

    } catch (err) {
        res.status(400);
        res.json(err);
    }     
}

const deleteUser = async (req: Request, res: Response) => {
    const user = await store.deleteUser(req.params.id);
    res.json(user);
}

const user_routes = (app: express.Application) => {
    app.get('/users', getAllUsers);
    app.get('/users/:id', getUserById); 
    app.post('/users', createUser); 
    app.delete('/users/:id', deleteUser);  
}


export default user_routes;