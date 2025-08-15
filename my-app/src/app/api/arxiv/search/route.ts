import axios from "axios";
import { NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";

interface ArxivLink {
    title?: string;
    href: string;
}

interface ArxivAuthor {
    name: string;
}

interface ArxivEntry {
    id: string;
    title?: string;
    summary?: string;
    author?: ArxivAuthor | ArxivAuthor[];
    link?: ArxivLink | ArxivLink[];
    published?: string;
}

function parseArxivResponse(xmlData: string) {
  try {
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "",
      parseTagValue: true,
      removeNSPrefix: true,
      isArray: (name) => ["entry", "author", "link"].includes(name),
    });
    
    const jsonData = parser.parse(xmlData);
    console.log('XML data length:', xmlData.length);
    console.log('Parsed feed structure:', jsonData.feed ? 'exists' : 'missing');
    
    // Check if we have any entries
    if (!jsonData.feed) {
      console.log('No feed found in arXiv response');
      return [];
    }
    
    if (!jsonData.feed.entry) {
      console.log('No entries found in feed');
      return [];
    }

    // Handle single entry case
    const entries = Array.isArray(jsonData.feed.entry) ? jsonData.feed.entry : [jsonData.feed.entry].filter(Boolean);
    console.log('Processing', entries.length, 'entries');
    
    const papers = entries.map((entry: ArxivEntry, index: number) => {
      console.log(`Processing entry ${index}:`, {
        id: entry.id,
        title: entry.title?.substring(0, 50) + '...',
        hasAuthors: !!entry.author,
        hasLinks: !!entry.link
      });
      
      return {
        id: entry.id,
        title: entry.title?.trim() || "Untitled",
        summary: entry.summary?.trim() || "No summary available",
        authors: Array.isArray(entry.author) 
          ? (entry.author as ArxivAuthor[]).map(a => a.name).filter(Boolean)
          : entry.author?.name ? [entry.author.name] : ["Unknown Author"],
        pdfLink: Array.isArray(entry.link) 
          ? (entry.link as ArxivLink[]).find(l => l.title === "pdf")?.href || (entry.link as ArxivLink[])[0]?.href || ""
          : entry.link?.href || "",
        published: entry.published || new Date().toISOString(),
      };
    });

    console.log('Successfully parsed', papers.length, 'papers');
    return papers;
  } catch (error) {
    console.error('Error parsing arXiv response:', error);
    return [];
  }
}

async function searchArxiv(searchQuery: string, maxResults: number = 10) {
  console.log('arXiv API search for:', searchQuery);
  
  // Handle different search query formats
  let searchParam = searchQuery;
  
  // If it looks like an arXiv ID (e.g., "2311.06521v1" or "2311.06521"), use id_list instead
  if (searchQuery.match(/^\d{4}\.\d{4,5}(v\d+)?$/)) {
    console.log('Detected arXiv ID format, using id_list parameter');
    const url = `https://export.arxiv.org/api/query?id_list=${encodeURIComponent(searchQuery)}&max_results=${maxResults}`;
    console.log('arXiv API URL (id_list):', url);
    
    const res = await axios.get(url, { 
      headers: { "Content-Type": "application/xml" },
      timeout: 10000
    });
    
    return parseArxivResponse(res.data);
  }
  
  // For other queries, use search_query
  if (!searchQuery.startsWith('id:') && !searchQuery.startsWith('all:')) {
    searchParam = `all:${searchQuery}`;
  }
  
  const url = `https://export.arxiv.org/api/query?search_query=${encodeURIComponent(searchParam)}&start=0&max_results=${maxResults}`;
  console.log('arXiv API URL (search_query):', url);
  
  const res = await axios.get(url, { 
    headers: { "Content-Type": "application/xml" },
    timeout: 10000
  });

  return parseArxivResponse(res.data);
}

export async function POST(req: Request) {
  try {
    const reqBody = await req.json();
    const { searchItem } = reqBody;
    if (!searchItem || typeof searchItem !== "string") {
      return NextResponse.json({ error: "searchItem must be a string" }, { status: 400 });
    }

    const papers = await searchArxiv(searchItem, 10);
    return NextResponse.json({ papers });
  } catch (error) {
    console.error("Error fetching from arXiv:", error);
    return NextResponse.json({ error: "Failed to fetch arXiv data" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const max = Number(searchParams.get("max") || 10);
    
    if (!query) {
      return NextResponse.json({ error: "query parameter is required" }, { status: 400 });
    }

    const papers = await searchArxiv(query, max);
    return NextResponse.json({ papers });
  } catch (error) {
    console.error("Error fetching from arXiv:", error);
    return NextResponse.json({ error: "Failed to fetch arXiv data" }, { status: 500 });
  }
}


