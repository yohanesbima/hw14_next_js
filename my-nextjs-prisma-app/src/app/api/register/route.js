import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const POST = async (req, { params }) => {
    try {
        const { name, email, password } = await req.json();

        // Check if the user with the same email already exists
        const existingUser = await prisma.User.findUnique({
            where: {
                email,
            },
        });

        if (existingUser) {
            throw { name: "UserExists" };
        }

        // Hash the user's password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user in the database
        const newUser = await prisma.User.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        // Generate an access token for the newly registered user
        const accessToken = jwt.sign(
            {
                id: newUser.id,
                email: newUser.email,
            },
            process.env.JWT_SECRET_KEY
        );

        return NextResponse.json(
            {
                id: newUser.id,
                email: newUser.email,
                accessToken,
            },
            { status: 200 }
        );
    } catch (err) {
        console.error(err); // Log the error message to the console
        if (err.name === "UserExists") {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        } else {
            return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
        }
    }
};