import axios from "axios";
import { NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";

export async function POST(req: Request) {
  try {
    const reqBody = await req.json();
    const { searchItem } = reqBody;
    if (!searchItem || typeof searchItem !== "string") {
      return NextResponse.json({ error: "searchItem must be a string" }, { status: 400 });
    }

    const url = `https://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(searchItem)}&start=0&max_results=10`;
    const res = await axios.get(url, { headers: { "Content-Type": "application/xml" } });

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "",
      parseTagValue: true,
      removeNSPrefix: true,
      isArray: (name) => ["entry", "author", "link"].includes(name),
    });
    const jsonData = parser.parse(res.data);

    const papers = jsonData.feed.entry.map((entry: any) => ({
      id: entry.id,
      title: entry.title,
      summary: entry.summary,
      authors: entry.author.map((a: any) => a.name),
      pdfLink: entry.link.find((l: any) => l.title === "pdf")?.href,
      published: entry.published,
    }));

    return NextResponse.json({ papers });
  } catch (error) {
    console.error("Error fetching from arXiv:", error);
    return NextResponse.json({ error: "Failed to fetch arXiv data" }, { status: 500 });
  }
}


// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const q = searchParams.get("query") || "machine learning";
//   const max = Number(searchParams.get("max") || 10);

//   try {
//     const url = `https://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(q)}&start=0&max_results=${max}`;
//     const res = await fetch(url, { next: { revalidate: 1800 } });
    
//     // if (!res.ok) {
//     //   throw new Error(`arXiv API returned ${res.status}`);
//     // }
    
//     // const xml = await res.text();
//     // const feed = await parseStringPromise(xml);

//     // const entries = feed?.feed?.entry || [];
//     // const papers = entries.map((e: any) => {
//     //   const linkPdf = (e.link || []).find((l: any) => l.$.title === "pdf")?.$.href || "";
//     //   return {
//     //     id: e.id?.[0] ?? "",
//     //     title: e.title?.[0]?.trim() ?? "",
//     //     authors: (e.author || []).map((a: any) => a.name?.[0]).filter(Boolean),
//     //     summary: e.summary?.[0]?.trim() ?? "",
//     //     published: e.published?.[0] ?? "",
//     //     primaryCategory: e["arxiv:primary_category"]?.[0]?.$.term ?? "",
//     //     linkPdf
//     //   };
//     // });

//     // return NextResponse.json({ papers });
//   } catch (error) {
//     console.error("Error fetching from arXiv:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch papers from arXiv" }, 
//       { status: 500 }
//     );
//   }
// }
