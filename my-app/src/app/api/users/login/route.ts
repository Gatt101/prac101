import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextResponse , NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

connect();

export async function POST(req: NextRequest) {
    try {
        const reqBody: { email: string; password: string } = await req.json();
        const { email, password } = reqBody;

        // Check if user exists
        const user  = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }


        // Check if password matches
        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );
        if (!isPasswordValid) {
            return NextResponse.json({ message: "Invalid password" }, { status: 401 });
        }

        // create a token data 
        const tokenData = {
            userId: user._id,
            email: user.email,
            username: user.username,
            isAdmin: user.isAdmin,
        };

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: "1h" });

        // Set token in cookies
        const response = NextResponse.json(
            { message: "Login successful" }, { status: 200 });

        response.cookies.set(
            "token",
             token, 
            { httpOnly: true }
        );

        // Return success response
        return response;

    } catch (error) {
        console.error("Error in login route:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}