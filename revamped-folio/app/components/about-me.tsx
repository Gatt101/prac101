import { BrainCircuit, Code2, Layers3 } from "lucide-react";
import { AnnotatedWord } from "@/components/ui/annotated-heading";

export default function AboutMe() {
    const highlights = [
        { label: "Agentic AI Systems", icon: BrainCircuit },
        { label: "LLM & RAG Solutions", icon: Layers3 },
        { label: "Autonomous Workflows", icon: Code2 },
    ];

    return (
        <section className="about-me bg-black py-10 sm:py-14 lg:py-16">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
                <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-blue-950/20 backdrop-blur sm:p-8 lg:p-10">
                    <div className="grid items-center gap-7 lg:grid-cols-[0.9fr_1.1fr]">
                        <div className="text-center lg:text-left">
                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-blue-300/80">About</p>
                            <h2 className="font-serif text-3xl font-normal tracking-tight text-white sm:text-4xl lg:text-[2.85rem] leading-[1.15]">
                                Engineering next-gen{" "}
                                <AnnotatedWord variant="cyan-brush" badge="Focus" badgeColor="green">
                                    Agentic AI
                                </AnnotatedWord>
                            </h2>
                        </div>
                        <div className="space-y-5">
                            <p className="mx-auto max-w-2xl text-sm leading-7 text-white/70 sm:text-base lg:mx-0">
                                Hi, I&apos;m <span className="font-semibold text-white">Gaurav Patil</span>, an Agentic AI Engineer specializing in architecting autonomous LLM agents, multi-agent systems, and production RAG pipelines. I build intelligent solutions that reason, execute tools, and solve complex problems at scale.
                            </p>
                            <div className="grid gap-3 sm:grid-cols-3">
                                {highlights.map(({ label, icon: Icon }) => (
                                    <div key={label} className="flex min-h-20 items-center gap-3 rounded-2xl border border-white/10 bg-black/35 p-3 text-left">
                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-200">
                                            <Icon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                        <span className="text-sm font-medium text-white/82">{label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
