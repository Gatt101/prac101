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

    const threads = (j.hits || []).slice(0, limit).map((h: unknown) => {
      const hit = h as { title?: string; url?: string; objectID?: string; points?: number; created_at?: string; author?: string };
      return {
        title: hit.title || "Untitled",
        url: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
        points: hit.points || 0,
        created_at: hit.created_at || new Date().toISOString(),
        author: hit.author || "Anonymous"
      };
    });

    return NextResponse.json({ threads });
  } catch (error) {
    console.error("Error fetching from HN:", error);
    return NextResponse.json(
      { error: "Failed to fetch HN threads" },
      { status: 500 }
    );
  }
}
