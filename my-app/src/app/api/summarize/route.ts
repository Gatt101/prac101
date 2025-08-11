import { NextResponse } from "next/server";
import { summarizeBeginner, summarizeStory, summarizeBuzz } from "@/lib/summarizers";

export async function POST(req: Request) {
  try {
    const { text, mode } = await req.json();
    
    if (!text) {
      return NextResponse.json({ error: "text required" }, { status: 400 });
    }

    const m = (mode as string) || "beginner";
    
    let summary: string;
    switch (m) {
      case "story":
        summary = summarizeStory(text);
        break;
      case "buzz":
        summary = summarizeBuzz(text);
        break;
      default:
        summary = summarizeBeginner(text);
    }

    return NextResponse.json({ mode: m, summary });
  } catch (error) {
    console.error("Error in summarization:", error);
    return NextResponse.json(
      { error: "Failed to generate summary" },
      { status: 500 }
    );
  }
}
