import app from '../../server';
import supertest from 'supertest';

const request = supertest(app);

describe('Tests the /products endpoint', () => {
    it('should get Status Code 200', async () => {
      const response = await request.get('/products');
      expect(response.statusCode).toBe(200);
    });

});