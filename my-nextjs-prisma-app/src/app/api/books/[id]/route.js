import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export const GET = async (req, { params }) => {
    try {
        // Retrieve all books from the database
        const { id } = params;
        const foundBook = await prisma.book.findUnique({
            where: {
                id: +id
            }
        })

        if (!foundBook) {
            throw { name: "ErrorNotFound" }
        }

        return NextResponse.json(foundBook, { status: 200 })
    } catch (err) {
        if (err.name === "ErrorNotFound") {
            return NextResponse.json({ message: "Error Not Found" }, { status: 404 })
        } else {
            return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
        }
    }

}