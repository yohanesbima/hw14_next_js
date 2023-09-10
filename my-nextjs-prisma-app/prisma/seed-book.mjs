// Import the Prisma Client
import { PrismaClient } from '@prisma/client';

// Create a Prisma Client instance
const prisma = new PrismaClient();

// Sample book data
const books = [
    {
        title: 'Book 1',
        author: 'Author 1',
        publisher: 'Publisher 1',
        year: 2022,
        pages: 300,
        image: 'image1.jpg',
    },
    {
        title: 'Book 2',
        author: 'Author 2',
        publisher: 'Publisher 2',
        year: 2020,
        pages: 250,
        image: 'image2.jpg',
    },
    // Add more books here...
];

// Function to seed books
async function seedBooks() {
    try {
        for (const book of books) {
            await prisma.book.create({
                data: book,
            });
        }
        console.log('Sample books inserted successfully.');
    } catch (error) {
        console.error('Error seeding books:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// Call the seedBooks function to insert data
seedBooks();
