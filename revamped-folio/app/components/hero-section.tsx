"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
// import { TextGenerateEffect } from "@/components/ui/text-generate-effect"; // optional

export default function HeroSection() {
  const intro = `Hi, I’m Gaurav`;

  return (
    <section className="relative w-full min-h-screen bg-black flex items-center">
      <div className="mx-auto max-w-7xl px-6">
        {/* grid: text | image */}
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          {/* LEFT: copy */}
          <div className="space-y-8">
            <div className="flex items-center gap-2">
              <span>{" "}</span>
              <span className="text-base font-medium uppercase tracking-wider text-white/90">
              {intro}</span>
            </div>

            <div className="space-y-4">
                             <h1 className="text-5xl sm:text-6xl font-bold tracking-tight space-y-3">
                 <div className="flex items-center gap-2">
                   Building{" "}
                   <ContainerTextFlip 
                     className="bg-transparent shadow-none p-0 m-0"
                     words={["smart", "creative", "scalable"]}
                   />
                 </div>
                 <div>websites</div>
               </h1>
              <h2 className="text-3xl sm:text-4xl font-bold text-white/80">
                using MERN stack
              </h2>
            </div>

            <p className="text-lg text-white/60 max-w-xl">
              I blend Angular + Spring Boot microservices with Flask/LLM-powered
              intelligence to ship fast, robust, human-centric products.
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-4">
              <Button
                size="lg"
                className="bg-white hover:bg-white/90 text-black rounded-full px-8 py-6 text-base font-medium"
              >
                Show my work
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 hover:bg-white/10 rounded-full px-8 py-6 text-base font-medium"
              >
                Download CV
              </Button>
            </div>

            {/* Tech pills */}
            <div className="flex flex-wrap gap-3 mt-8">
              {["React", "Next.js", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS"].map(
                (tech) => (
                  <div
                    key={tech}
                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/70"
                  >
                    {tech}
                  </div>
                )
              )}
            </div>
          </div>

          {/* RIGHT: image */}
          <div className="flex justify-center md:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-full overflow-hidden border-8 border-white/10">
                <Image
                  src="/favicon.ico"
                  alt="Gaurav portrait"
                  width={400}
                  height={400}
                  className="rounded-full"
                  priority
                />
                <div className="absolute inset-0 rounded-full ring-1 ring-white/20" />
              </div>
              {/* Glow effect */}
              <div className="absolute -inset-4 -z-10">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 opacity-20 blur-3xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
