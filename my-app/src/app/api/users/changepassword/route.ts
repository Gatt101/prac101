import { getData } from "@/helpers/getdata";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    try {
        const reqBody = getData(req);
        const user =  await User.findOne({ _id: reqBody });
        // Send confirmation email
        await sendEmail({
            email: user.email,
            emailType: "RESET",
            userId: user._id.toString(),
        });

        return NextResponse.json({ message: "Password changed email sent successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error in change password route:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
        
    }
}