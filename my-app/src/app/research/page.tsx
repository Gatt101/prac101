"use client";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import PaperList from "@/components/PaperList";
import SummaryTabs from "@/components/SummaryTabs";
import ContextSidebar from "@/components/ContextSidebar";

interface Paper {
  id: string;
  title: string;
  authors: string[];
  summary: string;
  published: string;
  primaryCategory: string;
  linkPdf: string;
}

export default function ResearchPage() {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [activePaper, setActivePaper] = useState<Paper | null>(null);
  const [loading, setLoading] = useState(false);
  const [clusters, setClusters] = useState<any[]>([]);

  const onSearch = async (q: string) => {
    if (!q.trim()) return;
    
    setLoading(true);
    try {
      const r = await fetch(`/api/arxiv/search?query=${encodeURIComponent(q)}&max=8`);
      const j = await r.json();
      const newPapers = j.papers || [];
      setPapers(newPapers);
      setActivePaper(newPapers[0] || null);
      setClusters([]); // Reset clusters when searching
    } catch (error) {
      console.error("Search error:", error);
      setPapers([]);
      setActivePaper(null);
    } finally {
      setLoading(false);
    }
  };

  const onCluster = async () => {
    if (papers.length === 0) return;

    try {
      // Build documents from current papers
      const docs = papers.map((p: Paper) => ({
        id: `paper:${p.id}`,
        text: `${p.title}. ${p.summary}`
      }));

      const resp = await fetch("/api/cluster", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documents: docs, k: 3 })
      });

      const { clusters: newClusters } = await resp.json();
      setClusters(newClusters || []);
    } catch (error) {
      console.error("Clustering error:", error);
    }
  };

  return (
    <main className="mx-auto max-w-7xl p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">AI Research Storyteller</h1>
        <p className="text-gray-600 text-lg">
          Discover AI papers with intelligent summaries and community discussions
        </p>
      </div>

      <div className="mb-6">
        <SearchBar onSearch={onSearch} />
      </div>

      {loading && (
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Papers {papers.length > 0 && `(${papers.length})`}
              </h2>
              {papers.length > 1 && (
                <button
                  onClick={onCluster}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                >
                  Cluster Papers
                </button>
              )}
            </div>

            {clusters.length > 0 && (
              <div className="mb-4">
                <h3 className="font-medium mb-2">Clusters:</h3>
                <div className="flex flex-wrap gap-2">
                  {clusters.map((cluster, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {cluster.label} ({cluster.items.length})
                    </span>
                  ))}
                </div>
              </div>
            )}

            <PaperList
              papers={papers}
              activePaper={activePaper}
              onPaperSelect={setActivePaper}
            />
          </div>

          <div className="lg:col-span-1 space-y-6">
            {activePaper && (
              <div className="p-4 border rounded bg-white">
                <h2 className="text-lg font-semibold mb-2 line-clamp-2">
                  {activePaper.title}
                </h2>
                <SummaryTabs text={activePaper.summary} />
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <ContextSidebar query={activePaper?.title || ""} />
          </div>
        </div>
      )}
    </main>
  );
}
