import { BrainCircuit, Code2, Layers3 } from "lucide-react";

export default function AboutMe() {
    const highlights = [
        { label: "Full-stack systems", icon: Code2 },
        { label: "AI/ML workflows", icon: BrainCircuit },
        { label: "Clean product UX", icon: Layers3 },
    ];

    return (
        <section className="about-me bg-black py-10 sm:py-14 lg:py-16">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
                <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-blue-950/20 backdrop-blur sm:p-8 lg:p-10">
                    <div className="grid items-center gap-7 lg:grid-cols-[0.9fr_1.1fr]">
                        <div className="text-center lg:text-left">
                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-blue-300/80">About</p>
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">Builder at the intersection of web and AI</h2>
                        </div>
                        <div className="space-y-5">
                            <p className="mx-auto max-w-2xl text-sm leading-7 text-white/70 sm:text-base lg:mx-0">
                                Hi, I&apos;m <span className="font-semibold text-white">Gaurav Patil</span>, a Full-Stack Developer and AI/ML enthusiast focused on turning ideas into fast, useful, and visually polished products with Angular, Next.js, Spring Boot, Flask, and ML.
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
