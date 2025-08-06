import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getData = (req: NextRequest) => {
    try {
        const token = req.cookies.get("token")?.value || "";
        const decodedToken:any = jwt.verify(token ,process.env.TOKEN_SECRET!);
        return decodedToken.userId; // Assuming the token contains a userId field
    } catch (error) {
        console.error("Error in getData:", error);
        return null;
        
    }
}