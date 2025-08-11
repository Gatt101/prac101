import { NextResponse } from "next/server";
import { tfidfVectors } from "@/lib/vectorize";
const kmeans = require("ml-kmeans");

export async function POST(req: Request) {
  try {
    const { documents, k = 3 } = await req.json();
    
    if (!documents?.length) {
      return NextResponse.json({ 
        error: "documents required" 
    }, {
         status: 400 
        });
    }

    const texts = documents.map((d: any) => d.text || "");
    
    // Handle case where we have fewer documents than clusters
    const numClusters = Math.min(k, documents.length);
    
    if (numClusters <= 1) {
      return NextResponse.json({
        clusters: [{
          label: "single-cluster",
          items: documents.map((d: any) => d.id)
        }]
      });
    }

    const { vectors, terms } = tfidfVectors(texts);
    
    // Ensure we have valid vectors
    if (vectors.length === 0 || vectors[0].length === 0) {
      return NextResponse.json({
        clusters: [{
          label: "no-features",
          items: documents.map((d: any) => d.id)
        }]
      });
    }

    const km = kmeans(vectors, numClusters);

    const clusters = Array.from({ length: numClusters }, () => ({ 
      label: "", 
      items: [] as string[] 
    }));
    
    km.clusters.forEach((cid: number, idx: number) => {
      if (cid < clusters.length) {
        clusters[cid].items.push(documents[idx].id);
      }
    });

    // Generate cluster labels from centroids
    clusters.forEach((c, i) => {
      if (km.centroids[i] && km.centroids[i].centroid) {
        const centroid = km.centroids[i].centroid as number[];
        const top = centroid
          .map((val, idx) => ({ term: terms[idx], val }))
          .sort((a, b) => b.val - a.val)
          .slice(0, 3)
          .map(t => t.term)
          .filter(Boolean)
          .join(", ");
        c.label = top || `cluster-${i + 1}`;
      } else {
        c.label = `cluster-${i + 1}`;
      }
    });

    return NextResponse.json({ clusters });
  } catch (error) {
    console.error("Error in clustering:", error);
    return NextResponse.json(
      { error: "Failed to cluster documents" },
      { status: 500 }
    );
  }
}
