import app from '../../server';
import supertest from 'supertest';

const request = supertest(app);

describe('Tests the /users endpoint', () => {
    it('GET on /users should get Status Code 401', async () => {
      const response = await request.get('/users');
      expect(response.statusCode).toBe(401);
    });

    it('GET on /users/1 should get Status Code 401', async () => {
        const response = await request.get('/users/1');
        expect(response.statusCode).toBe(401);
      });

    xit('POST on /users should get Status Code 200', async () => {
        const response = await request.post('/users');
        expect(response.statusCode).toBe(200);
    });

    it('DELETE on /users/1 should get Status Code 401', async () => {
        const response = await request.delete('/users/1');
        expect(response.statusCode).toBe(401);
    });
});