import { XMLParser } from "fast-xml-parser";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try 
    {
        
        const reqBody = await req.json();
        const {limit} : {limit : number} = reqBody;
        if(!limit || typeof limit !== "number"){
             return NextResponse.json({ error: "limit must be a number" }, { status: 400 });
        }
        const searchItem = "deep learning";
        const url = `https://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(searchItem)}&start=0&max_results=${limit}`
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`arXiv API returned ${res.status}`);
        }
        const parser = new XMLParser({
              ignoreAttributes: false,
              attributeNamePrefix: "",
              parseTagValue: true,
              removeNSPrefix: true,
              isArray: (name) => ["entry", "author", "link"].includes(name),
            });
        
        const jsonData = parser.parse(await res.text());
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
       console.error("Error fetching feed:", error);
       return NextResponse.json({ error: "Failed to fetch feed" }, { status: 500 });
    }
}