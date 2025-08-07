import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface DecodedToken {
    userId: string;
    email: string;
    username: string;
    isAdmin: boolean;
}

export const getData = (req: NextRequest) => {
    try {
        const token = req.cookies.get("token")?.value || "";
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as DecodedToken;
        return decodedToken.userId; // Assuming the token contains a userId field
    } catch (error) {
        console.error("Error in getData:", error);
        return null;
        
    }
}