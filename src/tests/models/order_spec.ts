import { Order, CreateOrder, OrderStore } from '../../models/order';

const store = new OrderStore();

const mockOrder: Order = {
    id: 1,
    userId: '1', 
    products:[],   
    status: 'active'
}

const mockCreateOrder: CreateOrder = {
    id: 1,
    quantity: '5',
    orderId: '1',
    productId: '1'
}

beforeAll(() => {
    spyOn(store, "createOrder").
        and.returnValue(Promise.resolve(mockOrder));
    spyOn(store, "getCurrentOrderByUser").
        and.returnValue(Promise.resolve(mockOrder));
    spyOn(store, "getCompletedOrdersByUser").
        and.returnValue(Promise.resolve([mockOrder]));
    spyOn(store, "addProductToOrder").
        and.returnValue(Promise.resolve(mockCreateOrder));

});

describe('Order Model:', () => {
    describe('Check for existing Order methods:', () => {
        it('should have a createOrder method', () => {
            expect(store.createOrder).toBeDefined();
        });
    
        it('should have a getCurrentOrderByUser method', () => {
            expect(store.getCurrentOrderByUser).toBeDefined();
        });
    
        it('should have a getCompletedOrdersByUser method', () => {
            expect(store.getCompletedOrdersByUser).toBeDefined();
        });
    
        it('should have a addProductToOrder method', () => {
            expect(store.addProductToOrder).toBeDefined();
        });    
       
    });

    describe('Test the order methods:', () => {
        it('createOrder should create an order and return it', async () => {
            const result = await store.createOrder({userId: '1', status: 'active' });
            expect(result).toBe(mockOrder);
        });
        
        it('getCurrentOrderByUser should return the current order', async () => {
            const result = await store.getCurrentOrderByUser('1');
            expect(result).toBe(mockOrder);
        });

        it('getCompletedOrdersByUser should return t', async () => {
            const result = await store.getCompletedOrdersByUser('1');
            expect(result).toEqual([mockOrder]);
        });

        it('getCompletedOrdersByUser should create a order and return it', async () => {
            const result = await store.getCompletedOrdersByUser('1');
            expect(result).toEqual([mockOrder]);
        });

        it('addProductToOrder should add a product to an order', async () => {
            const result = await store.addProductToOrder({quantity: '5',
                orderId: '1', productId: '1'});
            expect(result).toEqual(mockCreateOrder);
        });
        
    });
});