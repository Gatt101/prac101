import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse , NextRequest } from "next/server";
import bcrypt from "bcryptjs";

connect();

export async function POST(req: NextRequest) {
    try {
        const reqBody: { username: string; email: string; password: string } = await req.json();
        const { username, email, password } = reqBody;

        console.log(reqBody);

    // Check if user already exists
    const existingUser: typeof User | null = await User.findOne({ email });
    if (existingUser) {
        return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
        username,
        email,
        password: hashedPassword,
    });

    await user.save();

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });

    } catch (error) {
        console.error("Error in signup route:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
        
    }
}