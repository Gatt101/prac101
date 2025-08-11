import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export interface AuthUser {
  userId: string;
  email?: string;
  username?: string;
  isAdmin?: boolean;
}

export function requireUser(req: NextRequest): AuthUser {
  const token = req.cookies.get("token")?.value || "";
  if (!token) {
    throw new Response("Unauthorized", { status: 401 });
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as AuthUser;
    return decoded;
  } catch {
    throw new Response("Invalid token", { status: 401 });
  }
}

export function unauthorizedJson(message = "Unauthorized") {
  return NextResponse.json({ error: message }, { status: 401 });
}


