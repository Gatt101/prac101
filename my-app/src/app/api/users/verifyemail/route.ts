import { connect } from "@/dbConfig/dbConfig";
import {NextRequest , NextResponse} from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { token } = reqBody;

       const user = await User.findOne({
            verifyToken:token,
            verifyTokenExpiry : {$gt: Date.now()}
        })

        if(!user){
            return NextResponse.json({
                error:"Invalid token"
            },{
                status:400
            })
        }
        console.log(user);

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

        return NextResponse.json({
            message: "Email verified successfully"
        }, {
            status: 200
        })

    } catch (error) {
        console.error("Error in verify email route:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
        
    }
}