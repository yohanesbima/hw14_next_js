// Import the Prisma Client
import { PrismaClient } from '@prisma/client';

// Create a Prisma Client instance
const prisma = new PrismaClient();

// Sample book data
const users = [
    {
        name: 'Admin',
        email: 'admin@mail.com',
        password: 'admin1',
    },
    {
        name: 'Admin 2',
        email: 'admin2@mail.com',
        password: 'admin2',
    },
    // Add more users here...
];

// Function to seed users
async function seedUsers() {
    try {
        for (const user of users) {
            await prisma.user.create({
                data: user,
            });
        }
        console.log('Sample users inserted successfully.');
    } catch (error) {
        console.error('Error seeding users:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// Call the seedUsers function to insert data
seedUsers();
