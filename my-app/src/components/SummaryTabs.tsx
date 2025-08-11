"use client";
import { useState, useEffect } from "react";

interface SummaryTabsProps {
  text: string;
}

type SummaryMode = "beginner" | "story" | "buzz";

export default function SummaryTabs({ text }: SummaryTabsProps) {
  const [mode, setMode] = useState<SummaryMode>("beginner");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!text) {
      setSummary("");
      return;
    }

    setLoading(true);
    fetch("/api/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, mode })
    })
      .then(r => r.json())
      .then(j => {
        setSummary(j.summary || "Summary not available");
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching summary:", error);
        setSummary("Error generating summary");
        setLoading(false);
      });
  }, [text, mode]);

  const modes: { key: SummaryMode; label: string; description: string }[] = [
    { key: "beginner", label: "Beginner", description: "Simple explanation" },
    { key: "story", label: "Story", description: "Narrative style" },
    { key: "buzz", label: "Buzz", description: "Quick highlights" }
  ];

  return (
    <div className="mt-4">
      <div className="flex gap-2 mb-4">
        {modes.map((m) => (
          <button 
            key={m.key} 
            onClick={() => setMode(m.key)}
            className={`px-3 py-2 rounded transition-colors ${
              mode === m.key 
                ? "bg-black text-white" 
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            title={m.description}
          >
            {m.label}
          </button>
        ))}
      </div>
      
      <div className="min-h-[100px] p-4 border rounded bg-gray-50">
        {loading ? (
          <div className="flex items-center justify-center h-20">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
          </div>
        ) : (
          <p className="whitespace-pre-wrap leading-7 text-gray-800">
            {summary || "Select a paper to see its summary"}
          </p>
        )}
      </div>
    </div>
  );
}
