import app from '../../server';
import supertest from 'supertest';
import { store } from '../../controllers/users';
import { User, ReturnUser} from '../../models/user';

const request = supertest(app);

const token = 
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VyTmFtZSI6Impkb2UiLCJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJEb2UiLCJwYXNzd29yZCI6IiQyYiQxMCQ4ZHdUL2RLZE9GbFNjS3EyOEJiR1oubkw2L0hZTzJDV2ZPQ2w2UU1CSHkubndpZGpka3YvLiJ9LCJpYXQiOjE2MjMzMTU2MzJ9.ZLXGLUpp636SmOa_oliMJ-5Pl0VHk8tIHtFquI25HJY';

const mockReturnUser: ReturnUser = {
  id: 1,
  userName: 'tester',
  firstName: 'John',
  lastName: 'Doe',    
}

const mockUser: User = {
  id: 1,
  userName: 'tester',
  firstName: 'John',
  lastName: 'Doe', 
  password: 'something'   
}


beforeAll(() => {
  spyOn(store, 'getAllUsers').
      and.returnValue(Promise.resolve([mockReturnUser]));
  spyOn(store, 'getUserById').
      and.returnValue(Promise.resolve(mockReturnUser));
  spyOn(store, 'createUser').
      and.returnValue(Promise.resolve(mockUser));
  spyOn(store, 'deleteUser').
      and.returnValue(Promise.resolve(mockUser)); 
  spyOn(store, 'authenticate').
      and.returnValue(Promise.resolve(mockUser));  
});

describe('Tests the /users endpoint', () => {
    it('GET on /users should get Status Code 200 and return a list of users', async () => {
      const response = await request
        .get('/users')
        .set('Authorization', `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([mockReturnUser]);
    });

    it('GET on /users/1 should get Status Code 200 and return the user', async () => {
        const response = await request
        .get('/users/1')
        .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockReturnUser);
      });

    it('empty POST on /users should get Status Code 400', async () => {
        const response = await request.post('/users');
        expect(response.statusCode).toBe(400);
        expect(response.text).toEqual('"Body is missing values!"');
    });

    it('DELETE on /users/1 should get Status Code 401', async () => {
        const response = await request.delete('/users/1');
        expect(response.statusCode).toBe(401);
    });
});