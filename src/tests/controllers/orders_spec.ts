import app from '../../server';
import supertest from 'supertest';

const request = supertest(app);

describe('Tests the /orders endpoint', () => {
    it('POST on /orders should get Status Code 401', async () => {
      const response = await request.post('/orders');
      expect(response.statusCode).toBe(401);
    });

    it('GET on /orders/active/1 should get Status Code 401', async () => {
        const response = await request.get('/orders/active/1');
        expect(response.statusCode).toBe(401);
    });

    it('GET on /orders/complete/1 should get Status Code 401', async () => {
        const response = await request.get('/orders/complete/1');
        expect(response.statusCode).toBe(401);
    });

    it('POST on /orders/1/products should get Status Code 401', async () => {
        const response = await request.post('/orders/1/products');
        expect(response.statusCode).toBe(401);
    });


});