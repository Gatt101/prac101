"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, MessageSquare, ArrowUpRight, Sparkles } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { ContactProfileCard } from "@/components/ui/contact-profile-card";
import { AnnotatedWord } from "@/components/ui/annotated-heading";

export default function ContactSection() {
  const [variant, setVariant] = useState<"dark" | "placard">("dark");

  return (
    <section id="contact" className="bg-black py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-blue-900/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto mb-10 max-w-2xl text-center sm:mb-12"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-1.5 text-xs font-medium text-purple-200 backdrop-blur-sm">
            <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
            Let&apos;s collaborate
          </div>
          <h2 className="mb-3 font-serif text-3xl font-normal tracking-tight text-white sm:text-4xl lg:text-[2.85rem] leading-[1.15]">
            Get In{" "}
            <AnnotatedWord variant="cyan-brush" badge="Open" badgeColor="green">
              Touch
            </AnnotatedWord>
          </h2>
          <p className="mx-auto max-w-2xl px-2 text-sm leading-6 text-white/60 sm:text-base">
            Have a project in mind, want to build something impactful, or chat about tech?
            Feel free to connect directly.
          </p>

          {/* Theme switcher for ContactProfileCard */}
          <div className="mt-5 inline-flex items-center rounded-lg border border-white/10 bg-white/[0.03] p-1 text-xs">
            <button
              type="button"
              onClick={() => setVariant("dark")}
              className={`cursor-pointer rounded-md px-3 py-1 font-medium transition-all ${
                variant === "dark"
                  ? "bg-white/15 text-white shadow-xs"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Dark Theme
            </button>
            <button
              type="button"
              onClick={() => setVariant("placard")}
              className={`cursor-pointer rounded-md px-3 py-1 font-medium transition-all ${
                variant === "placard"
                  ? "bg-white/15 text-white shadow-xs"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Placard Style
            </button>
          </div>
        </motion.div>

        {/* Content Layout */}
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          {/* Left Column: Direct Outreach & Links */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col gap-5"
          >
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-xl shadow-black/20 backdrop-blur-xl">
              <div className="flex items-center gap-2 text-blue-300">
                <Sparkles className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em]">Direct Outreach</span>
              </div>
              
              <h3 className="mt-3 text-xl font-semibold text-white">
                Let&apos;s build something together
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                I&apos;m open to new opportunities, collaborations, freelance product builds, and discussing ideas.
                Skip the form and reach out directly to my inbox.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href="mailto:gauravpatilk11@gmail.com"
                  className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-white/10 transition-all duration-200 hover:bg-white/90 hover:shadow-white/20"
                >
                  <Mail className="h-4 w-4" />
                  Send an Email
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
                Connect on Socials
              </p>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  {
                    href: "https://github.com/gatt101",
                    label: "GitHub",
                    handle: "@gatt101",
                    icon: FaGithub,
                  },
                  {
                    href: "https://www.linkedin.com/in/gaurav-patil-2724a8264",
                    label: "LinkedIn",
                    handle: "Gaurav Patil",
                    icon: FaLinkedin,
                  },
                  {
                    href: "https://x.com/Gaurav72256287",
                    label: "X",
                    handle: "@Gaurav",
                    icon: FaXTwitter,
                  },
                ].map(({ href, label, handle, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-black/25 p-3 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.06] hover:text-white group"
                  >
                    <Icon className="h-5 w-5 text-white/70 group-hover:text-white transition-colors" />
                    <span className="mt-2 text-xs font-medium text-white/80">{label}</span>
                    <span className="text-[10px] text-white/40 truncate max-w-full">{handle}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Opensource UI ContactProfileCard */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center lg:justify-end"
          >
            <ContactProfileCard
              variant={variant}
              name="Gaurav Patil"
              title="Agentic AI Engineer & LLM Specialist"
              email="gauravpatilk11@gmail.com"
              location="India · Remote-friendly"
              website="github.com/gatt101"
              websiteHref="https://github.com/gatt101"
              catalogRef="DIR · CONTACT / 2026"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
