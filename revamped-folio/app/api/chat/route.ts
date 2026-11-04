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

  const key = process.env.GROQ_API_KEY;
  if (!key) return NextResponse.json({ reply: localAnswer(last.content), mode: "local" });

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL || "llama-3.1-8b-instant",
        max_tokens: 400,
        temperature: 0.3,
        messages: [{ role: "system", content: SYSTEM }, ...messages],
      }),
    });
    if (!res.ok) throw new Error(`upstream ${res.status}`);
    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content;
    if (!reply) throw new Error("empty");
    return NextResponse.json({ reply, mode: "llm" });
  } catch {
    return NextResponse.json({ reply: localAnswer(last.content), mode: "local" });
  }
}
