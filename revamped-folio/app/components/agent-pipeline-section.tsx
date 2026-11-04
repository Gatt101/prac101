"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Brain, CheckCircle2, Database, Search, Wrench } from "lucide-react";

const steps = [
  { icon: Brain, name: "Planner", log: "Break the goal into sub-tasks and pick tools" },
  { icon: Search, name: "Retriever", log: "Fetch grounded context from vector + keyword search" },
  { icon: Wrench, name: "Tool Executor", log: "Call APIs, run code, update state" },
  { icon: Database, name: "Memory", log: "Persist context, traces and intermediate results" },
  { icon: CheckCircle2, name: "Critic", log: "Verify output, retry on failure, then respond" },
];

export default function AgentPipelineSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => setActive((a) => (a + 1) % steps.length), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="bg-black py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-blue-300/80">How agents work</p>
          <h2 className="font-serif text-3xl font-normal tracking-tight text-white sm:text-4xl leading-[1.15]">
            A typical agentic loop I design
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/62 sm:text-base">
            Plan, retrieve, act, remember, verify — with every step traceable.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-5">
          {steps.map(({ icon: Icon, name }, i) => {
            const on = i === active;
            return (
              <motion.button
                key={name}
                type="button"
                onClick={() => setActive(i)}
                animate={{ scale: on ? 1.04 : 1 }}
                className={`flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${on ? "border-blue-400/50 bg-blue-500/15" : "border-white/10 bg-white/[0.035]"}`}
                aria-pressed={on}
              >
                <Icon className={`h-6 w-6 ${on ? "text-blue-200" : "text-white/50"}`} aria-hidden="true" />
                <span className={`text-sm font-medium ${on ? "text-white" : "text-white/65"}`}>{name}</span>
              </motion.button>
            );
          })}
        </div>

        <div className="mx-auto mt-5 max-w-2xl rounded-xl border border-white/10 bg-neutral-950 p-4 font-mono text-xs text-white/75 sm:text-sm" aria-live="polite">
          <span className="text-blue-300">[{steps[active].name.toLowerCase()}]</span> {steps[active].log}
          <span className="ml-1 inline-block h-3.5 w-1.5 animate-pulse bg-blue-300 align-middle" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
