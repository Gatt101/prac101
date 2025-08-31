"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen bg-black flex items-center justify-center">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* LEFT: Text Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Header text */}
            <div className="space-y-2">
              <p className="text-sm font-medium uppercase tracking-wider text-white/60">
                Just so vibrant • Not a dead yet
              </p>
            </div>

            {/* Main heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-2">
                  <span>Building</span>
                  <ContainerTextFlip 
                    className="bg-transparent shadow-none p-0 m-0 text-4xl sm:text-5xl lg:text-6xl"
                    words={["functional", "creative", "scalable"]}
                  />
                </div>
                <div className="mt-2">websites</div>
              </h1>
              <h2 className="text-2xl sm:text-3xl font-medium text-white/90">
                using MERN stack
              </h2>
            </div>

            {/* Description */}
            <p className="text-lg text-white/70 max-w-xl mx-auto lg:mx-0">
              Full stack developer creating stunning web experiences with modern technologies.
            </p>

            {/* Tech stack pills */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {["React", "Node.js", "TypeScript", "MongoDB", "Next.js"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm rounded-full bg-white/10 text-white/80 border border-white/20"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>

            {/* Contact info */}
            <div className="pt-4">
              <p className="text-white/60 text-sm">Connect with me</p>
            </div>
          </div>

          {/* RIGHT: Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 blur-2xl"></div>
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/20">
                  <Image
                    src="/favicon.ico"
                    alt="Gaurav portrait"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
