import db from './Config/Connection.js';
import collections from './Config/Collection.js';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

const seedData = async () => {
    try {
        await db.connect();

        // Add test users
        const users = [
            {
                _id: new ObjectId(),
                email: 'testuser1@example.com',
                password: await bcrypt.hash('password123', 10),
                name: 'Test User 1',
                number: '1234567890'
            },
            {
                _id: new ObjectId(),
                email: 'testuser2@example.com',
                password: await bcrypt.hash('password123', 10),
                name: 'Test User 2',
                number: '0987654321'
            }
        ];
        await db.get().collection(collections.USERS).insertMany(users);

        // Add test products
        const products = [
            {
                _id: new ObjectId(),
                name: 'Test Product 1',
                slug: 'test-product-1',
                price: 100,
                mrp: 120,
                available: 'true',
                category: 'Test Category',
                categorySlug: 'test-category',
                srtDescription: 'Short description of Test Product 1',
                description: 'Description of Test Product 1',
                seoDescription: 'SEO description of Test Product 1',
                seoKeyword: 'test, product, 1',
                seoTitle: 'Test Product 1',
                vendor: false,
                files: [],
                discount: 20,
                return: true,
                cancellation: true,
                pickup_location: 'Test Location',
                variant: [],
                variantDetails: [],
                currVariantSize: 'M'
            },
            {
                _id: new ObjectId(),
                name: 'Test Product 2',
                slug: 'test-product-2',
                price: 200,
                mrp: 220,
                available: 'true',
                category: 'Test Category',
                categorySlug: 'test-category',
                srtDescription: 'Short description of Test Product 2',
                description: 'Description of Test Product 2',
                seoDescription: 'SEO description of Test Product 2',
                seoKeyword: 'test, product, 2',
                seoTitle: 'Test Product 2',
                vendor: false,
                files: [],
                discount: 10,
                return: true,
                cancellation: true,
                pickup_location: 'Test Location',
                variant: [],
                variantDetails: [],
                currVariantSize: 'L'
            }
        ];
        await db.get().collection(collections.PRODUCTS).insertMany(products);

        console.log('Test data inserted successfully');
    } catch (error) {
        console.error('Error inserting test data:', error);
    } finally {
        process.exit();
    }
};

seedData();