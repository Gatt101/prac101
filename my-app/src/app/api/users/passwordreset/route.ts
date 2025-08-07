import { connect } from "@/dbConfig/dbConfig";
import {NextRequest , NextResponse} from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

connect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { token, newPassword } = reqBody;
        const user = await User.findOne({
            forgotPasswordToken: token
        });

        if (!user) {
            console.log("User not found with the provided token");
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        }

        // Update user's password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();

        return NextResponse.json({ message: "Password reset successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error in password reset route:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
        
    }
}