"use client";

import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { Briefcase, Building2, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { AnnotatedWord } from "@/components/ui/annotated-heading";

export default function ExperienceSection() {
  const data = [
    {
      title: "2026 · Present",
      content: (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-7 shadow-2xl shadow-black/40 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.045]">
          {/* Company & Role Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-xl font-bold text-white sm:text-2xl tracking-tight">
                  Agentic AI Engineer
                </h4>
                <span className="rounded-md border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-[11px] font-medium text-cyan-300">
                  Full-time
                </span>
                <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-300 inline-flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active Role
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/60 mt-1.5">
                <span className="flex items-center gap-1 font-semibold text-white/80">
                  <Building2 className="h-3.5 w-3.5 text-cyan-300" />
                  Digital Health Associates Pvt. Ltd
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-blue-300" />
                  Jun 2026 – Present (4 mos)
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-purple-300" />
                  Remote
                </span>
              </div>
            </div>
          </div>

          {/* Role Description */}
          <p className="text-sm leading-relaxed text-white/75 sm:text-[15px]">
            Leading the architectural design and deployment of autonomous agentic systems, multi-agent collaboration frameworks, and tool-augmented LLM orchestration pipelines.
          </p>

          {/* Key Contributions / Highlights */}
          <div className="mt-4 space-y-2.5">
            {[
              "Architected multi-agent collaborative graphs using LangGraph and CrewAI for autonomous planning, deterministic routing, and multi-step task execution.",
              "Engineered robust tool-calling and self-correcting agent execution loops with strict Pydantic schemas, validation filters, and automated fallback recovery.",
              "Optimized context-window utilization, dynamic token pruning, and persistent state management across distributed multi-turn agent sessions.",
            ].map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/70 leading-relaxed">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-400 mt-0.5" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>

          {/* Skills Chips */}
          <div className="mt-5 flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.06]">
            {[
              "Agentic AI",
              "Multi-Agent Systems",
              "LangGraph",
              "CrewAI",
              "Tool Calling",
              "Autonomous Workflows",
              "Structured Outputs",
              "Python",
            ].map((skill) => (
              <span
                key={skill}
                className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-white/75 transition-colors hover:border-cyan-400/30 hover:text-white"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "2025 – 2026",
      content: (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-7 shadow-2xl shadow-black/40 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.045]">
          {/* Company & Role Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-xl font-bold text-white sm:text-2xl tracking-tight">
                  AI Engineer
                </h4>
                <span className="rounded-md border border-purple-500/30 bg-purple-500/10 px-2 py-0.5 text-[11px] font-medium text-purple-300">
                  Internship
                </span>
                <span className="text-xs text-white/50 font-mono">
                  6 mos
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/60 mt-1.5">
                <span className="flex items-center gap-1 font-semibold text-white/80">
                  <Building2 className="h-3.5 w-3.5 text-cyan-300" />
                  Digital Health Associates Pvt. Ltd
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-blue-300" />
                  Dec 2025 – May 2026
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-purple-300" />
                  Remote
                </span>
              </div>
            </div>
          </div>

          {/* Role Description */}
          <p className="text-sm leading-relaxed text-white/75 sm:text-[15px]">
            Built and integrated machine learning and LLM-powered solutions into enterprise systems, collaborating with engineering teams to develop scalable backend services and intelligent agents.
          </p>

          {/* Key Contributions / Highlights */}
          <div className="mt-4 space-y-2.5">
            {[
              "Constructed high-accuracy Retrieval-Augmented Generation (RAG) pipelines leveraging hybrid search, vector embeddings, and cross-encoder re-ranking for contextual precision.",
              "Integrated vector databases (Qdrant, Chroma, Pinecone) with chunking strategies tailored for dense technical and healthcare document indexing.",
              "Engineered scalable FastAPI microservices and asynchronous inference pipelines to serve LLM agents with low latency and streaming outputs.",
            ].map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/70 leading-relaxed">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-purple-400 mt-0.5" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>

          {/* Skills Chips */}
          <div className="mt-5 flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.06]">
            {[
              "RAG Systems",
              "Vector Databases",
              "LLMs",
              "FastAPI",
              "Semantic Search",
              "Qdrant",
              "ChromaDB",
              "PyTorch",
            ].map((skill) => (
              <span
                key={skill}
                className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-white/75 transition-colors hover:border-purple-400/30 hover:text-white"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "2024 – 2025",
      content: (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-7 shadow-2xl shadow-black/40 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.045]">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-xl font-bold text-white sm:text-2xl tracking-tight">
                  Applied AI &amp; Open-Source Research
                </h4>
                <span className="rounded-md border border-blue-500/30 bg-blue-500/10 px-2 py-0.5 text-[11px] font-medium text-blue-300">
                  Projects &amp; Systems
                </span>
              </div>
              <p className="text-xs text-white/60 mt-1.5">
                Focus on Computer Vision, Deep Learning, and Transformer Pipelines
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed text-white/75 sm:text-[15px]">
            Designed and deployed end-to-end intelligent applications spanning aerial object detection, multimodal diagnostic assistants, and client-side neural summarization pipelines.
          </p>

          {/* Highlights */}
          <div className="mt-4 space-y-2.5">
            {[
              "Developed aerial imagery analysis models using YOLOv11 for tree enumeration, reaching 92% precision with custom dataset augmentation.",
              "Created multimodal orthopedic diagnostic system combining YOLO fracture bounding-box detection with fine-tuned Qwen-2.5 treatment suggestions.",
              "Implemented client-side on-device Xenova transformer pipelines in Briefly (arXiv reader) for instant zero-server research paper summarization.",
            ].map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/70 leading-relaxed">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-400 mt-0.5" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>

          {/* Skills Chips */}
          <div className="mt-5 flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.06]">
            {[
              "Computer Vision",
              "YOLOv11",
              "Deep Learning",
              "Transformers",
              "Qwen-2.5",
              "Xenova Pipelines",
              "Next.js",
              "Flask",
            ].map((skill) => (
              <span
                key={skill}
                className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-white/75 transition-colors hover:border-blue-400/30 hover:text-white"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="experience" className="relative w-full bg-black py-4 sm:py-8">
      <Timeline
        badge={
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-1.5 text-xs font-medium text-cyan-200 backdrop-blur-sm">
            <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
            Career Journey
          </div>
        }
        title={
          <h2 className="mb-3 font-serif text-3xl font-normal tracking-tight text-white sm:text-4xl lg:text-[2.85rem] leading-[1.15]">
            Work{" "}
            <AnnotatedWord variant="cyan-brush" badge="Active" badgeColor="green">
              Experience
            </AnnotatedWord>
          </h2>
        }
        description={
          <p className="max-w-2xl px-2 text-sm leading-6 text-white/60 sm:text-base mx-auto">
            A scroll-animated timeline of my journey architecting autonomous AI agents, enterprise RAG systems, and intelligent solutions.
          </p>
        }
        data={data}
      />
    </section>
  );
}
