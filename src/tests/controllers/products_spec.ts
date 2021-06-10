import app from '../../server';
import supertest from 'supertest';

const request = supertest(app);

describe('Tests the /products endpoint', () => {
    it('GET on /products should get Status Code 200', async () => {
      const response = await request.get('/products');
      expect(response.statusCode).toBe(200);
    });

    it('GET on /products/1 should get Status Code 200', async () => {
      const response = await request.get('/products/1');
      expect(response.statusCode).toBe(200);
    });

    it('POST on /products should get Status Code 401', async () => {
      const response = await request.post('/products');
      expect(response.statusCode).toBe(401);
    }); 

    it('DELETE on /products/1 should get Status Code 401', async () => {
      const response = await request.delete('/products/1');
      expect(response.statusCode).toBe(401);
    });

    it('GET on /products/categories/household should get Status Code 200', async () => {
      const response = await request.get('/products/categories/household');
      expect(response.statusCode).toBe(200);
    });


});