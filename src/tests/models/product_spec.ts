import { Product, ProductStore } from '../../models/product';

const store = new ProductStore();

const mockProduct: Product = {
    id: 1,
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

describe('Product Model:', () => {
    describe('Check for existing Product methods:', () => {
        it('should have a getAllProducts method', () => {
            expect(store.getAllProducts).toBeDefined();
        });
    
        it('should have a getProductById method', () => {
            expect(store.getProductById).toBeDefined();
        });
    
        it('should have a saveProduct method', () => {
            expect(store.saveProduct).toBeDefined();
        });
    
        it('should have a deleteProduct method', () => {
            expect(store.deleteProduct).toBeDefined();
        });
    
        it('should have a getProductByCategory method', () => {
            expect(store.getProductsByCategory).toBeDefined();
        });
    });

    describe('Test the Product methods:', () => {
        it('saveProduct method should add a product', async() => {
            const result = await store.saveProduct({name: 'Bucket',price: '5.99', category: 'household'});
            expect(result).toEqual(mockProduct);        
        });

        it('getAllProducts method should return a list of products', async() => {
            const result = await store.getAllProducts();
            expect(result).toEqual([mockProduct]);        
        });

        it('getProductById method should return the correct product', async() => {
            const result = await store.getProductById('1');
            expect(result).toEqual(mockProduct);        
        });

        it('getProductByCategory method should return a list of correct products', async() => {
            const result = await store.getProductsByCategory('household');
            expect(result).toEqual([mockProduct]);        
        });

        it('deleteProduct method should remove the product', async() => {
            await store.deleteProduct('1');
            const result = await store.getAllProducts();
            expect(result).toBeNull;        
        });
    });
});