"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, GitBranch } from "lucide-react";
import { cn } from "@/lib/utils";

type TabKey = "developer" | "stack" | "collab";

export function HeroCodeCard({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<TabKey>("developer");
  const [copied, setCopied] = useState(false);

  const tabs: { key: TabKey; label: string; icon: string }[] = [
    { key: "developer", label: "developer.ts", icon: "TS" },
    { key: "stack", label: "stack.json", icon: "{ }" },
    { key: "collab", label: "connect.sh", icon: ">_" },
  ];

  const codeSnippets: Record<TabKey, string> = {
    developer: `// Welcome to my portfolio
const developer = {
  name: "Gaurav Patil",
  role: "Agentic AI Engineer",
  focus: ["LLM AI Agents", "Agentic Systems", "RAG Pipelines", "Autonomous Workflows"],
  openFor: ["Full-time", "AI Engineering", "Consulting"],
  motto: "Architecting autonomous agents and resilient AI systems",
  available: true,
};

export default developer;`,
    stack: `{
  "agentic_ai": {
    "frameworks": ["LangGraph", "CrewAI", "LlamaIndex", "AutoGPT"],
    "rag_vector": ["ChromaDB", "Pinecone", "Qdrant", "Hybrid Search"],
    "tooling": ["Multi-Agent Graphs", "Function Calling", "Agent Evals"],
    "foundational": ["PyTorch", "Hugging Face", "FastAPI", "Next.js"]
  },
  "principles": ["Self-Correction", "Deterministic Routing", "Scalability"]
}`,
    collab: `#!/usr/bin/env bash
# Quick contact script

echo "Connecting with Gaurav Patil..."
EMAIL="gauravpatilk11@gmail.com"
GITHUB="https://github.com/gatt101"
LINKEDIN="https://linkedin.com/in/gaurav-patil-2724a8264"

echo "Status: Open for Agentic AI & LLM Systems."
open "mailto:\${EMAIL}"`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("relative w-full max-w-lg select-none", className)}>
      {/* Ambient background glow */}
      <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-blue-600/30 via-purple-600/25 to-cyan-500/30 blur-xl opacity-75 transition-opacity group-hover:opacity-100" />

      {/* Terminal Container */}
      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-neutral-950/85 shadow-2xl shadow-black/60 backdrop-blur-2xl">
        {/* Top Window Bar */}
        <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3">
          {/* Window dots */}
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ef4444]/90 shadow-sm" />
            <span className="h-3 w-3 rounded-full bg-[#f59e0b]/90 shadow-sm" />
            <span className="h-3 w-3 rounded-full bg-[#10b981]/90 shadow-sm" />
          </div>

          {/* File tabs */}
          <div className="flex items-center gap-1 rounded-lg bg-black/40 p-0.5 border border-white/5">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "cursor-pointer flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-[11px] transition-all",
                  activeTab === tab.key
                    ? "bg-white/15 text-white shadow-xs font-medium"
                    : "text-white/40 hover:text-white/80",
                )}
              >
                <span className="text-[10px] text-blue-300 font-semibold">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            title="Copy snippet"
            className="cursor-pointer rounded-lg border border-white/10 bg-white/[0.04] p-1.5 text-white/50 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white"
            aria-label="Copy code snippet"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-emerald-400" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        </div>

        {/* Code Content Area */}
        <div className="relative min-h-[260px] sm:min-h-[280px] p-4 sm:p-5 font-mono text-xs leading-relaxed overflow-x-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="flex"
            >
              {/* Line numbers */}
              <div className="mr-4 flex select-none flex-col text-right font-mono text-xs text-white/20">
                {codeSnippets[activeTab].split("\n").map((_, i) => (
                  <span key={i} className="leading-relaxed">
                    {i + 1}
                  </span>
                ))}
              </div>

              {/* Code text with syntax highlight colors */}
              <div className="flex-1 font-mono leading-relaxed">
                {activeTab === "developer" && (
                  <>
                    <p className="text-white/35 italic">{"// Welcome to my portfolio"}</p>
                    <p>
                      <span className="text-purple-400">const</span>{" "}
                      <span className="text-blue-300">developer</span> = &#123;
                    </p>
                    <p className="pl-4">
                      <span className="text-cyan-300">name</span>:{" "}
                      <span className="text-emerald-300">&quot;Gaurav Patil&quot;</span>,
                    </p>
                    <p className="pl-4">
                      <span className="text-cyan-300">role</span>:{" "}
                      <span className="text-emerald-300">&quot;Agentic AI Engineer&quot;</span>,
                    </p>
                    <p className="pl-4">
                      <span className="text-cyan-300">focus</span>: [
                      <span className="text-emerald-300">&quot;LLM AI Agents&quot;</span>,{" "}
                      <span className="text-emerald-300">&quot;Agentic Systems&quot;</span>,{" "}
                      <span className="text-emerald-300">&quot;RAG Pipelines&quot;</span>,{" "}
                      <span className="text-emerald-300">&quot;Autonomous Workflows&quot;</span>],
                    </p>
                    <p className="pl-4">
                      <span className="text-cyan-300">openFor</span>: [
                      <span className="text-emerald-300">&quot;Full-time&quot;</span>,{" "}
                      <span className="text-emerald-300">&quot;AI Engineering&quot;</span>,{" "}
                      <span className="text-emerald-300">&quot;Consulting&quot;</span>],
                    </p>
                    <p className="pl-4">
                      <span className="text-cyan-300">motto</span>:{" "}
                      <span className="text-emerald-300">
                        &quot;Architecting autonomous agents and resilient AI systems&quot;
                      </span>
                      ,
                    </p>
                    <p className="pl-4">
                      <span className="text-cyan-300">available</span>:{" "}
                      <span className="text-amber-300">true</span>,
                    </p>
                    <p>&#125;;</p>
                    <p className="mt-2">
                      <span className="text-purple-400">export default</span>{" "}
                      <span className="text-blue-300">developer</span>;
                    </p>
                  </>
                )}

                {activeTab === "stack" && (
                  <>
                    <p>&#123;</p>
                    <p className="pl-4">
                      <span className="text-purple-300">&quot;agentic_ai&quot;</span>: &#123;
                    </p>
                    <p className="pl-8">
                      <span className="text-cyan-300">&quot;frameworks&quot;</span>: [
                      <span className="text-emerald-300">&quot;LangGraph&quot;</span>,{" "}
                      <span className="text-emerald-300">&quot;CrewAI&quot;</span>,{" "}
                      <span className="text-emerald-300">&quot;LlamaIndex&quot;</span>,{" "}
                      <span className="text-emerald-300">&quot;AutoGPT&quot;</span>],
                    </p>
                    <p className="pl-8">
                      <span className="text-cyan-300">&quot;rag_vector&quot;</span>: [
                      <span className="text-emerald-300">&quot;ChromaDB&quot;</span>,{" "}
                      <span className="text-emerald-300">&quot;Pinecone&quot;</span>,{" "}
                      <span className="text-emerald-300">&quot;Qdrant&quot;</span>,{" "}
                      <span className="text-emerald-300">&quot;Hybrid Search&quot;</span>],
                    </p>
                    <p className="pl-8">
                      <span className="text-cyan-300">&quot;tooling&quot;</span>: [
                      <span className="text-emerald-300">&quot;Multi-Agent Graphs&quot;</span>,{" "}
                      <span className="text-emerald-300">&quot;Function Calling&quot;</span>,{" "}
                      <span className="text-emerald-300">&quot;Agent Evals&quot;</span>],
                    </p>
                    <p className="pl-8">
                      <span className="text-cyan-300">&quot;foundational&quot;</span>: [
                      <span className="text-emerald-300">&quot;PyTorch&quot;</span>,{" "}
                      <span className="text-emerald-300">&quot;Hugging Face&quot;</span>,{" "}
                      <span className="text-emerald-300">&quot;FastAPI&quot;</span>,{" "}
                      <span className="text-emerald-300">&quot;Next.js&quot;</span>]
                    </p>
                    <p className="pl-4">&#125;,</p>
                    <p className="pl-4">
                      <span className="text-purple-300">&quot;principles&quot;</span>: [
                      <span className="text-emerald-300">&quot;Self-Correction&quot;</span>,{" "}
                      <span className="text-emerald-300">&quot;Deterministic Routing&quot;</span>,{" "}
                      <span className="text-emerald-300">&quot;Scalability&quot;</span>]
                    </p>
                    <p>&#125;</p>
                  </>
                )}

                {activeTab === "collab" && (
                  <>
                    <p className="text-white/35 italic">{"#!/usr/bin/env bash"}</p>
                    <p className="text-white/35 italic">{"# Quick contact script"}</p>
                    <p className="mt-1">
                      <span className="text-purple-400">echo</span>{" "}
                      <span className="text-emerald-300">&quot;Connecting with Gaurav Patil...&quot;</span>
                    </p>
                    <p>
                      <span className="text-blue-300">EMAIL</span>=
                      <span className="text-emerald-300">&quot;gauravpatilk11@gmail.com&quot;</span>
                    </p>
                    <p>
                      <span className="text-blue-300">GITHUB</span>=
                      <span className="text-emerald-300">&quot;https://github.com/gatt101&quot;</span>
                    </p>
                    <p>
                      <span className="text-blue-300">LINKEDIN</span>=
                      <span className="text-emerald-300">&quot;https://linkedin.com/in/gaurav-patil-2724a8264&quot;</span>
                    </p>
                    <p className="mt-1">
                      <span className="text-purple-400">echo</span>{" "}
                      <span className="text-emerald-300">&quot;Status: Open for Agentic AI &amp; LLM Systems.&quot;</span>
                    </p>
                    <p className="mt-1">
                      <span className="text-cyan-400">open</span>{" "}
                      <span className="text-emerald-300">&quot;mailto:$&#123;EMAIL&#125;&quot;</span>
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Status Bar */}
        <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.02] px-4 py-2 font-mono text-[10px] text-white/45">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <GitBranch className="h-3 w-3 text-blue-300" />
              main
            </span>
            <span className="hidden sm:inline">TypeScript 5.x</span>
            <span className="hidden sm:inline">UTF-8</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-emerald-400 font-medium">Available to Build</span>
          </div>
        </div>
      </div>
    </div>
  );
}
