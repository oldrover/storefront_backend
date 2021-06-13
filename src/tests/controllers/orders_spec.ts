import app from '../../server';
import supertest from 'supertest';
import { store } from '../../controllers/orders';
import { Order, CreateOrder } from '../../models/order';

const request = supertest(app);

const token = 
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VyTmFtZSI6Impkb2UiLCJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJEb2UiLCJwYXNzd29yZCI6IiQyYiQxMCQ4ZHdUL2RLZE9GbFNjS3EyOEJiR1oubkw2L0hZTzJDV2ZPQ2w2UU1CSHkubndpZGpka3YvLiJ9LCJpYXQiOjE2MjMzMTU2MzJ9.ZLXGLUpp636SmOa_oliMJ-5Pl0VHk8tIHtFquI25HJY';

const mockOrder: Order = {
    id: 1,
    userId: '1', 
    products:[],   
    status: 'active'
}

const mockCreateOrder: CreateOrder = {
    id: 1,
    quantity: '5',
    orderId: '1',
    productId: '1'
}

beforeAll(() => {
    spyOn(store, "createOrder").
        and.returnValue(Promise.resolve(mockOrder));
    spyOn(store, "getCurrentOrderByUser").
        and.returnValue(Promise.resolve(mockOrder));
    spyOn(store, "getCompletedOrdersByUser").
        and.returnValue(Promise.resolve([mockOrder]));
    spyOn(store, "addProductToOrder").
        and.returnValue(Promise.resolve(mockCreateOrder));

});

describe('Tests the /orders endpoint', () => {
    it('POST on /orders should get Status Code 200 and return created order', async () => {
      const response = await request
        .post('/orders')
        .set('Authorization', `Bearer ${token}`)
        .send({userId: '1', status: 'active' });
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('active');
    });

    it('GET on /orders/active/1 should get Status Code 200 and active order', async () => {
        const response = await request
            .get('/orders/active/1')
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe('active');
    });

    it('GET on /orders/complete/1 should get Status Code 401', async () => {
        const response = await request.get('/orders/complete/1');
        expect(response.statusCode).toBe(401);
    });

    it('POST on /orders/1/products should get Status Code 200 and return added product', async () => {
        const response = await request
            .post('/orders/1/products')
            .set('Authorization', `Bearer ${token}`)            
            .send({productId: '1', quantity: '5'});
        expect(response.statusCode).toBe(200);
        expect(response.body.quantity).toBe('5');
    });


});