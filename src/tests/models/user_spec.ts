import { User, ReturnUser, UserStore } from '../../models/user';

const store = new UserStore();

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
            const result = await store.createUser({userName: 'tester',
                                        firstName: 'John',
                                        lastName: 'Doe',
                                        password: 'something'});
            expect(result).toEqual(mockUser);
        });

        it('authenticate method should authenticate user', async () => {
            const auth = await store.authenticate(mockUser.userName, mockUser.password);
            expect(auth).toBe(mockUser);

        });

        it('getAllUsers method should return a list of users', async () => {
            const result = await store.getAllUsers();
            expect(result).toEqual([mockReturnUser]);

        });

        it('getUserById method should return the correct user', async () => {
            const result = await store.getUserById('1');
            expect(result).toEqual(mockReturnUser);
        });

        it('deleteUser method should return nothing', async () => {
            const result = await store.getUserById('1');
            expect(result).toBeNull;
        });



    });
    
    
    


});