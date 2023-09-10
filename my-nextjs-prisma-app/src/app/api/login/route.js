import { NextResponse } from "next/server"
import prisma from "@/app/lib/prisma";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

import { cookies } from "next/headers"


export const POST = async (req, { params }) => {

    try {

        const { email, password } = await req.json();

        const foundUser = await prisma.User.findUnique({
            where: {
                email
            }
        })

        if (!foundUser) {
            throw { name: "ErrorNotFound" }
        }

        const validPassword = bcrypt.compareSync(password, foundUser.password);

        if (validPassword) {

            const accessToken = jwt.sign({
                id: foundUser.id,
                email: foundUser.email
            }, process.env.JWT_SECRET_KEY);

            // 1 minggu
            cookies().set({
                name: "accessToken",
                value: accessToken,
                maxAge: 60 * 60 * 24 * 7
            })

            return NextResponse.json({
                id: foundUser.id,
                email: foundUser.email,
                accessToken
            }, { status: 200 })

        } else {
            throw { name: "InvalidCredentials" }
        }

    } catch (err) {

        if (err.name === "ErrorNotFound") {
            return NextResponse.json({ message: "User not Found" }, { status: 404 })
        } else if (err.name === "InvalidCredentials") {
            return NextResponse.json({ message: "Wrong email or Password" }, { status: 400 })
        } else {
            return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
        }
    }
}