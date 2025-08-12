import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try 
    {
        
    } catch (error) { 
       console.error("Error fetching feed:", error);
       return NextResponse.json({ error: "Failed to fetch feed" }, { status: 500 });
    }
}