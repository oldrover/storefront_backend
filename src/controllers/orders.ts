import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';

const store = new OrderStore();

const getCurrentOrderByUser = async (req: Request, res: Response) => {
    const order = await store.getCurrentOrderByUser(req.body.id);
    res.json(order);
}

const getCompletedOrdersByUser = async (req: Request, res: Response) => {
    const orders = await store.getCompletedOrdersByUser(req.body.id);
    res.json(orders);
}

const order_routes = (app: express.Application) => {
    app.get('/orders/active/:id', getCurrentOrderByUser);
    app.get('orders/complete/:id', getCompletedOrdersByUser);
}

export default order_routes;