import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("query") || "";
  const limit = Number(searchParams.get("limit") || 5);

  try {
    if (!q.trim()) {
      return NextResponse.json({ threads: [] });
    }

    const url = `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(q)}&tags=story`;
    const r = await fetch(url, { next: { revalidate: 600 } });
    
    if (!r.ok) {
      throw new Error(`HN API returned ${r.status}`);
    }
    
    const j = await r.json();

    const threads = (j.hits || []).slice(0, limit).map((h: any) => ({
      title: h.title || "Untitled",
      url: h.url || `https://news.ycombinator.com/item?id=${h.objectID}`,
      points: h.points || 0,
      created_at: h.created_at || new Date().toISOString(),
      author: h.author || "Anonymous"
    }));

    return NextResponse.json({ threads });
  } catch (error) {
    console.error("Error fetching from HN:", error);
    return NextResponse.json(
      { error: "Failed to fetch HN threads" },
      { status: 500 }
    );
  }
}
