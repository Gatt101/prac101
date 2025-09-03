"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { FloatingNav } from "@/components/ui/floating-navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";


// Define TypeScript interface for nav items
interface NavItem {
  name: string;
  link: string;
  icon: string;
}

export default function HeroSection() {
  const navItems: NavItem[] = [
    {
      name: "Home",
      link: "/",
      icon: "/images/assets/home-icon.svg",
    },
    {
      name: "About",
      link: "/about",
      icon: "/images/assets/about-icon.svg",
    },
    {
      name: "Contact",
      link: "/contact",
      icon: "/images/assets/contact-icon.svg",
    },
  ];

  return (
    <section 
      className="relative w-full min-h-screen bg-black flex items-center justify-center overflow-hidden"
      aria-label="Hero Section"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FloatingNav navItems={navItems} />
        <div className="grid grid-cols-1 items-center gap-12 lg:gap-16 lg:grid-cols-2 py-12">
          {/* LEFT: Text Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Header text */}
            <div>
              <p className="text-xl font-medium uppercase tracking-wider text-white/60">
                Hi, Gaurav Here!
              </p>
            </div>

            {/* Main heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                <span className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4">
                  <span>Crafting</span>
                  <ContainerTextFlip
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
                    words={["scalable", "intelligent", "innovative", "impactful"]}
                    interval={2500}
                    animationDuration={800}
                  />
                </span>
                <span className="mt-2 block">Experiences</span>
              </h1>
              <h2 className="text-xl sm:text-2xl font-medium text-white/90 max-w-xl mx-auto lg:mx-0">
                Full-Stack Developer & AI Enthusiast
              </h2>
            </div>

            {/* Description */}
            <p className="text-lg text-white/70 max-w-xl mx-auto lg:mx-0">
              Creating seamless digital experiences with Next.js, Angular & AI-driven solutions.
            </p>

            {/* Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                className="bg-white text-black hover:bg-white/90 w-fit px-6 py-3"
                asChild
              >
                <Link href="/contact" aria-label="Contact Gaurav">
                  Contact Me
                </Link>
              </Button>
              <Button 
                className="bg-transparent text-white border border-white/20 hover:bg-white/10 w-fit px-6 py-3"
                asChild
              >
                <Link href="/resume" aria-label="View Gaurav's Resume">
                  View Resume
                </Link>
              </Button>
            </div>
          </div>

          {/* RIGHT: Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 blur-2xl"></div>
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/20">
                  <Image
                    src="/images/assets/minecraft_character.png"
                    alt="Gaurav's profile portrait"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 80vw, 384px"
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