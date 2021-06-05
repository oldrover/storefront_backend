import express, { Request, Response } from 'express';
import { Product,ProductStore } from '../models/product';

const store = new ProductStore();

const getAllProducts = async (_req: Request, res: Response) => {
    const products = await store.getAllProducts();
    res.json(products);
}

const getProductById = async (req: Request, res: Response) => {
    const product = await store.getProductById(req.body.id);
    res.json(product);
}

const saveProduct = async (req: Request, res: Response) => {
    try {
        const product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        }

        const newProduct = await store.saveProduct(product);
        res.json(newProduct);

    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const deleteProduct = async (req: Request, res: Response) => {
    const product = await store.deleteProduct(req.body.id);
    res.json(product);
}

const getProductsByCategory = async (req: Request, res: Response) => {
    const products = await store.getProductsByCategory(req.body.category);
    res.json(products);
}

const product_routes = (app: express.Application) => {
    app.get('/products', getAllProducts);
    app.get('/products/:id', getProductById);
    app.post('/products', saveProduct);
    app.delete('/products/:id', deleteProduct);
    app.get('/products/:category', getProductsByCategory);
}

export default product_routes;


