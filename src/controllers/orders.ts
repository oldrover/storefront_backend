import express, { Request, Response } from 'express';
import verifyAuthToken from '../security/JWTAuthentication';
import { CreateOrder, Order, OrderStore } from '../models/order';

const store = new OrderStore();

const createOrder = async (req: Request, res: Response) => {
    try {        
        if(!req.body.userId || !req.body.status) {
                throw new Error('Body is missing values!');
        } 

        const order: Order = {
            userId: req.body.userId,
            status: req.body.status
        }
        const newOrder = await store.createOrder(order);
        res.json(newOrder);

    } catch(err) {
        res.status(400).json(err.message);
    }    
}

const getCurrentOrderByUser = async (req: Request, res: Response) => {
    try {
        const order = await store.getCurrentOrderByUser(req.params.id);    
        res.json(order);
    } catch(err) {
        res.status(400).json(err.message);
    }     
}

const getCompletedOrdersByUser = async (req: Request, res: Response) => {
    try {
        const orders = await store.getCompletedOrdersByUser(req.params.id);
        res.json(orders);
    } catch(err) {
        res.status(400).json(err.message);
    }     
}

const addProduct = async (req: Request, res: Response) => {    
    try {
        const createOrder: CreateOrder = {
            quantity: req.body.quantity,
            orderId: req.params.orderId,
            productId: req.body.productId
        }

        const addedProduct = await store.addProductToOrder(createOrder);           
        res.json(addedProduct);

    } catch(err) {
        res.status(400).json(err.message);
    }
}

const order_routes = (app: express.Application) => {
    app.post('/orders', verifyAuthToken, createOrder);
    app.get('/orders/active/:id', verifyAuthToken, getCurrentOrderByUser);
    app.get('/orders/complete/:id', verifyAuthToken, getCompletedOrdersByUser);
    app.post('/orders/:orderId/products', verifyAuthToken ,addProduct);
}

export default order_routes;