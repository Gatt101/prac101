"use client";
import { motion } from "framer-motion";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { HoveredLink, Menu, MenuItem, MobileMenu, MobileMenuItem, HamburgerButton } from "@/components/ui/navbar-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SparklesCore } from "@/components/ui/sparkles";
import { ArrowRight, Github, Mail } from "lucide-react";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { HeroCodeCard } from "@/components/ui/hero-code-card";
import { AnnotatedWord } from "@/components/ui/annotated-heading";


// Enhanced Navbar Component
function EnhancedNavbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <div className={cn("fixed top-3 sm:top-6 inset-x-0 max-w-3xl mx-auto z-50 px-3 sm:px-4", className)}>
        {/* Desktop Menu */}
        <div className="hidden md:block">
          <Menu setActive={setActive}>
            <MenuItem setActive={setActive} active={active} item="About">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="#about">About Me</HoveredLink>
                <HoveredLink href="#experience">Experience</HoveredLink>
                <HoveredLink href="#skills">Technical Skills</HoveredLink>
                <HoveredLink href="#projects">Projects</HoveredLink>
              </div>
            </MenuItem>

            <MenuItem setActive={setActive} active={active} item="Experience">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="#experience">Work Experience</HoveredLink>
                <HoveredLink href="#experience">Digital Health Associates</HoveredLink>
                <HoveredLink href="#experience">Agentic AI Engineer</HoveredLink>
              </div>
            </MenuItem>

            <MenuItem setActive={setActive} active={active} item="Skills">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="#skills">Tech Stack</HoveredLink>
                <HoveredLink href="#projects">Recent Work</HoveredLink>
                <HoveredLink href="https://github.com/gatt101">GitHub Profile</HoveredLink>
                <HoveredLink href="/projects">All Projects</HoveredLink>
              </div>
            </MenuItem>

            <MenuItem setActive={setActive} active={active} item="Contact">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="#contact">Get In Touch</HoveredLink>
                <HoveredLink href="https://linkedin.com/in/gaurav-patil-2724a8264">LinkedIn</HoveredLink>
                <HoveredLink href="https://github.com/gatt101">GitHub</HoveredLink>
              </div>
            </MenuItem>
          </Menu>
        </div>

        {/* Mobile Menu Bar */}
        <div className="md:hidden flex items-center justify-between bg-black/85 backdrop-blur-xl border border-white/15 rounded-full px-4 py-2.5 shadow-2xl">
          <span className="text-white font-semibold text-sm">Gaurav Patil</span>
          <HamburgerButton isOpen={mobileMenuOpen} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
        </div>
      </div>

      {/* Mobile Slide-out Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={closeMobileMenu}>
        <MobileMenuItem item="About" onClose={closeMobileMenu}>
          <HoveredLink href="#about">About Me</HoveredLink>
          <HoveredLink href="#experience">Experience</HoveredLink>
          <HoveredLink href="#skills">Technical Skills</HoveredLink>
          <HoveredLink href="#projects">Projects</HoveredLink>
        </MobileMenuItem>

        <MobileMenuItem item="Experience" onClose={closeMobileMenu}>
          <HoveredLink href="#experience">Work Experience</HoveredLink>
          <HoveredLink href="#experience">Digital Health Associates</HoveredLink>
        </MobileMenuItem>

        <MobileMenuItem item="Projects" onClose={closeMobileMenu}>
          <HoveredLink href="/projects">View All Projects</HoveredLink>
          <HoveredLink href="#projects">Featured Projects</HoveredLink>
        </MobileMenuItem>

        <MobileMenuItem item="Skills" onClose={closeMobileMenu}>
          <HoveredLink href="#skills">Tech Stack</HoveredLink>
          <HoveredLink href="#projects">Recent Work</HoveredLink>
          <HoveredLink href="https://github.com/gatt101">GitHub Profile</HoveredLink>
        </MobileMenuItem>

        <MobileMenuItem item="Contact" onClose={closeMobileMenu}>
          <HoveredLink href="#contact">Get In Touch</HoveredLink>
          <HoveredLink href="https://linkedin.com/in/gaurav-patil-2724a8264">LinkedIn</HoveredLink>
          <HoveredLink href="https://github.com/gatt101">GitHub</HoveredLink>
        </MobileMenuItem>

        {/* Quick Actions */}
        <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
          <Link
            href="https://github.com/gatt101"
            className="flex min-h-11 items-center gap-3 rounded-xl px-2 py-2 text-white/80 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            onClick={closeMobileMenu}
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            <span>GitHub</span>
          </Link>
        </div>
      </MobileMenu>
    </>
  );
}

export default function HeroSection() {
  return (
    <section
      className="relative flex min-h-[660px] w-full items-center justify-center overflow-hidden bg-black py-12 sm:min-h-[700px] lg:min-h-[760px] lg:py-8"
      aria-label="Hero Section"
    >
      {/* subtle sparkles/particles in the background */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <SparklesCore particleColor="#9f7aea" particleDensity={60} minSize={1} maxSize={3} />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.18),transparent_28%),radial-gradient(circle_at_80%_15%,rgba(168,85,247,0.16),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_35%)]" />
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <EnhancedNavbar />
        <div className="relative grid grid-cols-1 items-center gap-7 pt-16 sm:gap-10 sm:pt-20 lg:-translate-y-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pt-16 xl:-translate-y-8">
          {/* LEFT: Text Content */}
          <div className="space-y-5 text-center sm:space-y-6 lg:text-left">
            {/* Main heading */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="font-serif text-[2.75rem] font-normal leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-[5rem]">
                <div className="flex flex-col items-center lg:items-start">
                  <div className="flex flex-nowrap items-center justify-center gap-x-2.5 sm:gap-x-4 lg:justify-start">
                    <span>Crafting</span>
                    <ContainerTextFlip
                      className="bg-gradient-to-r from-blue-300 via-cyan-300 to-purple-400 bg-clip-text text-left text-transparent font-serif !font-normal italic !text-[2.75rem] sm:!text-6xl lg:!text-7xl xl:!text-[5rem] tracking-tight"
                      words={["intelligent", "scalable", "innovative", "impactful"]}
                      fixedWidthClassName="w-auto sm:w-[9ch]"
                      interval={2500}
                      animationDuration={800}
                    />
                  </div>
                  <AnnotatedWord variant="cyan-brush">
                    Experiences
                  </AnnotatedWord>
                </div>
              </h1>
              <h2 className="mx-auto max-w-xl text-base font-medium text-white/90 sm:text-lg lg:mx-0 lg:text-xl">
                Agentic AI Engineer · LLMs, Agents &amp; RAG
              </h2>
            </div>

            {/* Description */}
            <p className="mx-auto max-w-xl text-sm leading-6 text-white/68 sm:text-base lg:mx-0">
              Architecting autonomous AI agents, multi-agent workflows, and enterprise RAG systems with LangGraph, CrewAI, and modern LLM orchestration.
            </p>

            <div className="grid grid-cols-3 gap-2.5 text-left sm:mx-auto sm:max-w-lg lg:mx-0">
              {["Agentic AI", "LLMs & RAG", "Autonomous Systems"].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-3 text-center shadow-lg shadow-black/20 backdrop-blur">
                  <span className="block text-xs font-semibold text-white/85 sm:text-sm">{item}</span>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-row items-center justify-center gap-1.5 pt-2 xs:gap-3 sm:gap-4 lg:items-start lg:justify-start">
              <Button
                className="min-h-10 w-fit rounded-full bg-white px-3 py-2 text-[11px] font-semibold text-black shadow-lg shadow-white/10 transition-all duration-200 hover:bg-white/95 hover:shadow-blue-500/20 focus-visible:ring-2 focus-visible:ring-blue-400 xs:min-h-11 xs:px-5 xs:text-sm sm:px-6"
                asChild
                variant={undefined}
              >
                <Link href="https://github.com/gatt101" aria-label="View Gaurav's GitHub profile" className="inline-flex items-center justify-center gap-1.5 xs:gap-2">
                  <Github className="h-4 w-4" aria-hidden="true" />
                  <span>GitHub</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                className="min-h-10 w-fit rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-2 text-[11px] font-semibold text-blue-100 backdrop-blur transition-all duration-200 hover:bg-blue-500/20 focus-visible:ring-2 focus-visible:ring-blue-400 xs:min-h-11 xs:px-5 xs:text-sm sm:px-6"
                asChild
                variant={undefined}
              >
                <Link href="mailto:gauravpatilk11@gmail.com" aria-label="Email Gaurav" className="inline-flex items-center justify-center gap-1.5 xs:gap-2">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <span>Email Me</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* RIGHT: Hero Code Terminal */}
          <div className="order-first flex justify-center lg:order-last lg:justify-end">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full flex justify-center lg:justify-end"
            >
              <HeroCodeCard />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
