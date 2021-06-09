import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

describe('Tests the / endpoint', () => {
    it('should get Status Code 200', async () => {
      const response = await request.get('/');
      expect(response.statusCode).toBe(200);
    });
});
