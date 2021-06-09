import { User, UserStore } from '../user';

const store = new UserStore();

const savedUser: User = {
    userName: 'tester',
    firstName: 'John',
    lastName: 'Doe',
    password: 'password123'
}

const expectedUser = {
    id: 1,
    userName: 'tester',
    firstName: 'John',
    lastName: 'Doe',

}

describe('User Model', () => {
    describe('Check for existing User methods', () => {
        it('should have a getAllUsers method', () => {
            expect(store.getAllUsers).toBeDefined();
        });    
    
        it('should have a createUser method', () => {
            expect(store.createUser).toBeDefined();
        });
        
        it('should have a getUserById method', () => {
            expect(store.getUserById).toBeDefined();
        });    
    
        it('should have a deleteUser method', () => {
            expect(store.deleteUser).toBeDefined();
        });
    });

    describe('Test the User methods', () => {
        it('createUser method should create a new user', async () => {
            expect(async () => {
                await store.createUser(savedUser);                
            }).not.toThrowError();
        });

        it('authenticate method should authenticate user', async () => {
            const auth = await store.authenticate(savedUser.userName, savedUser.password);
            expect(auth).not.toBeNull();

        });

        it('getAllUsers method should return a list of users', async () => {
            const result = await store.getAllUsers();
            expect(result).toEqual([expectedUser]);

        });

        it('getUserById method should return the correct user', async () => {
            const result = await store.getUserById('1');
            expect(result).toEqual(expectedUser);
        });



    });
    
    
    


});