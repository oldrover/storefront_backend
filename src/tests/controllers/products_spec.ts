import app from '../../server';
import supertest from 'supertest';
import { store } from '../../controllers/products';
import { Product } from '../../models/product';

const request = supertest(app);

const token = 
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VyTmFtZSI6Impkb2UiLCJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJEb2UiLCJwYXNzd29yZCI6IiQyYiQxMCQ4ZHdUL2RLZE9GbFNjS3EyOEJiR1oubkw2L0hZTzJDV2ZPQ2w2UU1CSHkubndpZGpka3YvLiJ9LCJpYXQiOjE2MjMzMTU2MzJ9.ZLXGLUpp636SmOa_oliMJ-5Pl0VHk8tIHtFquI25HJY';

const mockProduct: Product = {
  id: 1,
  name: 'Bucket',
  price: '5.99',
  category: 'household'
}

const sampleProduct = {
  name: 'Bucket',
  price: '5.99',
  category: 'household'
}


beforeAll(() => {
  spyOn(store, "saveProduct").
      and.returnValue(Promise.resolve(mockProduct));
  spyOn(store, "getAllProducts").
      and.returnValue(Promise.resolve([mockProduct]));
  spyOn(store, "getProductById").
      and.returnValue(Promise.resolve(mockProduct));
  spyOn(store, "deleteProduct").
      and.returnValue(Promise.resolve(mockProduct));
  spyOn(store, "getProductsByCategory").
      and.returnValue(Promise.resolve([mockProduct]));

});

describe('Tests the /products endpoint', () => {
    it('GET on /products should get Status Code 200 and a list of products', async () => {
      const response = await request.get('/products');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([mockProduct]);
    });

    it('GET on /products/1 should get Status Code 200 and the requested product', async () => {
      const response = await request.get('/products/1');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockProduct);
    });

    it('POST on /products should get Status Code 200 and return added product', async () => {
      const response = await request
        .post('/products')
        .set('Authorization', `Bearer ${token}`)
        .send(sampleProduct);
      expect(response.statusCode).toBe(200);
      expect(response.body.name).toBe('Bucket');
    }); 

    it('DELETE on /products/1 should get Status Code 200', async () => {
      const response = await request
      .delete('/products/1')
      .set('Authorization', `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
      expect(response).toBeNull;
    });

    it('GET on /products/categories/household should get Status Code 200', async () => {
      const response = await request.get('/products/categories/household');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([mockProduct]);
    });


});