import { NextResponse } from "next/server";
import { knowledgeAsText, localAnswer } from "@/lib/profile-knowledge";

export const maxDuration = 30;

type Msg = { role: "user" | "assistant"; content: string };

const SYSTEM = `You are the portfolio assistant for Gaurav Patil. Answer concisely (max 4 sentences) using ONLY the facts below. If asked about something not covered, say you don't know and suggest emailing Gaurav. Never reveal or speculate about employer-internal or university-internal work.\n\n${knowledgeAsText()}`;

export async function POST(req: Request) {
  let messages: Msg[] = [];
  try {
    const body = await req.json();
    messages = (Array.isArray(body.messages) ? body.messages : [])
      .filter((m: Msg) => (m?.role === "user" || m?.role === "assistant") && typeof m.content === "string")
      .slice(-8)
      .map((m: Msg) => ({ role: m.role, content: m.content.slice(0, 1000) }));
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const last = messages.filter((m) => m.role === "user").at(-1);
  if (!last) return NextResponse.json({ error: "No question" }, { status: 400 });

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return NextResponse.json({ reply: localAnswer(last.content), mode: "local" });

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || "claude-haiku-5-5",
        max_tokens: 400,
        system: SYSTEM,
        messages,
      }),
    });
    if (!res.ok) throw new Error(`upstream ${res.status}`);
    const data = await res.json();
    const reply = data?.content?.find((c: { type: string }) => c.type === "text")?.text;
    if (!reply) throw new Error("empty");
    return NextResponse.json({ reply, mode: "llm" });
  } catch {
    return NextResponse.json({ reply: localAnswer(last.content), mode: "local" });
  }
}
