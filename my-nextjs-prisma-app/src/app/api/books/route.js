import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export const GET = async (req, { params }) => {
    try {
        // Retrieve all books from the database
        const allBooks = await prisma.book.findMany();

        // Return the list of books as a JSON response
        return NextResponse.json(allBooks, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
};
