"use client";
import { useEffect, useState } from "react";

interface ContextSidebarProps {
  query: string;
}

interface HNThread {
  title: string;
  url: string;
  points: number;
  created_at: string;
  author: string;
}

export default function ContextSidebar({ query }: ContextSidebarProps) {
  const [threads, setThreads] = useState<HNThread[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setThreads([]);
      return;
    }

    setLoading(true);
    fetch(`/api/context/hn?query=${encodeURIComponent(query)}&limit=5`)
      .then(r => r.json())
      .then(j => {
        setThreads(j.threads || []);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching HN threads:", error);
        setThreads([]);
        setLoading(false);
      });
  }, [query]);

  return (
    <aside className="space-y-3">
      <h3 className="font-semibold text-lg">What people are saying</h3>
      
      {loading ? (
        <div className="flex items-center justify-center h-20">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
        </div>
      ) : threads.length > 0 ? (
        threads.map((t, index) => (
          <a 
            key={`${t.url}-${index}`} 
            href={t.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block p-3 border rounded hover:bg-gray-50 transition-colors"
          >
            <div className="text-sm font-medium line-clamp-2 mb-2">
              {t.title}
            </div>
            <div className="text-xs text-gray-500">
              {t.points} points · {new Date(t.created_at).toLocaleDateString()} · {t.author}
            </div>
          </a>
        ))
      ) : query ? (
        <p className="text-gray-500 text-sm">
          No discussions found for this topic
        </p>
      ) : (
        <p className="text-gray-500 text-sm">
          Select a paper to see related discussions
        </p>
      )}
    </aside>
  );
}
