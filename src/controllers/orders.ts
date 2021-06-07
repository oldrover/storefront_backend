import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';

const store = new OrderStore();

const createOrder = async (req: Request, res: Response) => {
    try {
        const order: Order = {
            userId: req.body.userId,
            status: req.body.status
        }
        const newOrder = await store.createOrder(order);
        res.json(newOrder);

    } catch(err) {
        res.status(400);
        res.json(err);
    }    
}

const getCurrentOrderByUser = async (req: Request, res: Response) => {
    const order = await store.getCurrentOrderByUser(req.params.id);    
    res.json(order);
}

const getCompletedOrdersByUser = async (req: Request, res: Response) => {
    const orders = await store.getCompletedOrdersByUser(req.params.id);
    res.json(orders);
}

const addProduct = async (req: Request, res: Response) => {
    try {
        const addedProduct = await store.addProductToOrder(
            parseInt(req.body.quantity),
            req.params.orderId,
            req.body.productId);
        res.json(addedProduct);

    } catch(err) {
        res.status(400);
        res.json(err);
    }
}

const order_routes = (app: express.Application) => {
    app.post('/orders', createOrder);
    app.get('/orders/active/:id', getCurrentOrderByUser);
    app.get('/orders/complete/:id', getCompletedOrdersByUser);
    app.post('/orders/:orderId/products', addProduct);
}

export default order_routes;