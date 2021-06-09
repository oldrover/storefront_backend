import { Product, ProductStore } from '../product';

const store = new ProductStore();

const savedProduct: Product = {
    name: 'Bucket',
    price: '5.99',
    category: 'household'
}

const expectedProduct: Product = {
    id: 1,
    name: 'Bucket',
    price: '5.99',
    category: 'household'
}

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
            const result = await store.saveProduct(savedProduct);
            expect(result).toEqual(expectedProduct);        
        });

        it('getAllProducts method should return a list of products', async() => {
            const result = await store.getAllProducts();
            expect(result).toEqual([expectedProduct]);        
        });

        it('getProductById method should return the correct product', async() => {
            const result = await store.getProductById('1');
            expect(result).toEqual(expectedProduct);        
        });

        it('getProductByCategory method should return a list of correct products', async() => {
            const result = await store.getProductsByCategory('household');
            expect(result).toEqual([expectedProduct]);        
        });

        it('deleteProduct method should remove the product', async() => {
            await store.deleteProduct('1');
            const result = await store.getAllProducts();
            expect(result).toEqual([]);        
        });
    });
});