"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
// import { TextGenerateEffect } from "@/components/ui/text-generate-effect"; // optional

export default function HeroSection() {
  const intro = `Hi, I’m Gaurav — a full-stack developer & AI tinkerer`;

  return (
    <section className="relative w-full ">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        {/* grid: text | image */}
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          {/* LEFT: copy */}
          <div className="space-y-6">
            <span className="text-sm font-medium tracking-wide text-emerald-400">
              ● <span className="text-white/70  capitalize ">{intro}</span>
            </span>

            <h1 className="text-2xl font-extrabold leading-tight md:text-5xl font-sans ">
              Crafting{" "}
              <span className="inline-block bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
                <ContainerTextFlip 
                className="bg-transparent shadow-none p-0 m-0 "
                  words={["smart", "creative", "innovative", "scalable"]}
                />
              </span>
              <br />
              <span className="text-white/90">Solutions</span>
              <br />
            </h1>
            <h2 className="text-xl font-extrabold leading-tight md:text-2xl">
            <span className="text-white/60">from Web Apps to AI Agents</span>
            </h2>

            <p className="max-w-xl text-base text-white/70">
              I blend Angular + Spring Boot microservices with Flask/LLM-powered
              intelligence to ship fast, robust, human-centric products.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="rounded-2xl">
                ⚡ Show my work
              </Button>
              <Button size="lg" variant="secondary" className="rounded-2xl">
                📄 Download CV
              </Button>
            </div>

            {/* Tech pills */}
            <ul className="mt-4 flex flex-wrap gap-2">
              {["Angular", "Spring Boot", "Flask", "Next.js", "MongoDB", "TailwindCSS", "YOLO/ML"].map(
                (t) => (
                  <li
                    key={t}
                    className="rounded-full border border-white/10 px-3 py-1 text-sm text-white/70"
                  >
                    {t}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* RIGHT: image */}
          <div className="flex justify-center md:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="rounded-full ring-1 ring-white/10 p-2 bg-gradient-to-b from-white/5 to-transparent">
                <Image
                  src="/favicon.ico"
                  alt="Gaurav portrait"
                  width={280}
                  height={280}
                  className="rounded-full"
                  priority
                />
              </div>
              {/* soft glow */}
              <div className="pointer-events-none absolute inset-0 -z-10 rounded-full blur-3xl opacity-30 bg-emerald-500/20" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
