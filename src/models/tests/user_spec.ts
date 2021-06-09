import { User, UserStore } from '../user';

const store = new UserStore();

const testUser: User = {    
    userName: "test",
    firstName: "John",
    lastName: "Doe",
    password: "test123"
}


describe('User Model', () => {
    it('should have a getAllUsers method', () => {
        expect(store.getAllUsers).toBeDefined();
    });
    it('getAllUsers method should return a list of users', async () => {
        const result = await store.getAllUsers();
        expect(result).toEqual([]);
    });

    it('should have a createUser method', () => {
        expect(store.createUser).toBeDefined();
    });
    it('createUser method should return the created user', async () => {
        const result = await store.createUser(testUser);
        expect(result).toEqual(testUser);
    });   

    it('should have a getUserById method', () => {
        expect(store.getUserById).toBeDefined();
    });
    it('getUserById method should return a one row', async () => {
        const result = await store.getUserById('1');
        expect(result).toEqual(testUser);
    });

    it('should have a deleteUser method', () => {
        expect(store.deleteUser).toBeDefined();
    });
    it('deleteUser method should return a list of users', async () => {
        const result = await store.deleteUser('1');
        expect(result).toBeUndefined();
    });

    


});