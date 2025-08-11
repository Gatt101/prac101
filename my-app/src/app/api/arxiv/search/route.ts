import { NextResponse } from "next/server";
import { parseStringPromise } from "xml2js";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("query") || "machine learning";
  const max = Number(searchParams.get("max") || 10);

  try {
    const url = `https://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(q)}&start=0&max_results=${max}`;
    const res = await fetch(url, { next: { revalidate: 1800 } });
    
    if (!res.ok) {
      throw new Error(`arXiv API returned ${res.status}`);
    }
    
    const xml = await res.text();
    const feed = await parseStringPromise(xml);

    const entries = feed?.feed?.entry || [];
    const papers = entries.map((e: any) => {
      const linkPdf = (e.link || []).find((l: any) => l.$.title === "pdf")?.$.href || "";
      return {
        id: e.id?.[0] ?? "",
        title: e.title?.[0]?.trim() ?? "",
        authors: (e.author || []).map((a: any) => a.name?.[0]).filter(Boolean),
        summary: e.summary?.[0]?.trim() ?? "",
        published: e.published?.[0] ?? "",
        primaryCategory: e["arxiv:primary_category"]?.[0]?.$.term ?? "",
        linkPdf
      };
    });

    return NextResponse.json({ papers });
  } catch (error) {
    console.error("Error fetching from arXiv:", error);
    return NextResponse.json(
      { error: "Failed to fetch papers from arXiv" }, 
      { status: 500 }
    );
  }
}
