import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json(
            {message : "Logout successful",
                success: true, status: 200
            },
        )
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0), // Set expiration to the past to clear the cookie
        });
        return response;
    } catch (err) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    
    }
}