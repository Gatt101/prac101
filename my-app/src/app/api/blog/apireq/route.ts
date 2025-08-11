import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const maxResults = searchParams.get("id") ?? "10";

    const baseUrl = process.env.API_URL ?? "http://export.arxiv.org";
    const url = `${baseUrl}/api/query?search_query=all:electron&start=0&max_results=${encodeURIComponent(
      maxResults
    )}`;

    const response = await fetch(url, { next: { revalidate: 60 } });
    const xml = await response.text();

    const items = parseArxivXML(xml);
    return NextResponse.json(items);
  } catch (error) {
    console.error("Error in blog apireq route", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

function parseArxivXML(xml: string) {
  const entryRegex = /<entry[\s\S]*?<\/entry>/g;
  const entries = xml.match(entryRegex) ?? [];

  return entries.map((entry) => {
    const get = (tag: string) => {
      const match = entry.match(
        new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\/${tag}>`)
      );
      return match ? decodeHtml(stripTags(match[1]).trim()) : "";
    };

    const id = get("id");
    const title = get("title");
    const published = get("published");
    const summary = get("summary");

    return { id, title, published, summary };
  });
}

function stripTags(str: string) {
  return str
    .replace(/<!\[CDATA\[(.*?)\]\]>/g, "$1")
    .replace(/<[^>]*>/g, "");
}

function decodeHtml(str: string) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}


