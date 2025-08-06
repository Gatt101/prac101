import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { getData } from "@/helpers/getdata";
import User from "@/models/userModel";
import { use } from "react";

connect();
export async function GET(req: NextRequest){
    try {
        const userId = await getData(req);
        const user = await User.findOne({ _id: userId }).select("-password -__v");
        return NextResponse.json(
            {
                message: "User fetched successfully",
                data: user
            }
        );
    } catch (error) { 
        console.error("Error fetching user:", error);
        return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
    }
}