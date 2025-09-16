"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { FloatingNav } from "@/components/ui/floating-navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SparklesCore } from "@/components/ui/sparkles";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { CardContainer, CardBody } from "@/components/ui/3d-card";


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
      name: "Projects",
      link: "/projects",
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

     
      {/* subtle sparkles/particles in the background */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <SparklesCore particleColor="#9f7aea" particleDensity={60} minSize={1} maxSize={3} />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FloatingNav navItems={navItems} />
        <div className="grid grid-cols-1 items-center gap-12 lg:gap-16 lg:grid-cols-2 py-12">
          {/* LEFT: Text Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Header text */}
            <div className="ml-2">
              <p className="text-sm sm:text-base font-medium uppercase tracking-wider text-white/60">
                Hi, Gaurav Here!
              </p>
            </div>

            {/* Main heading */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-extrabold text-white leading-tight tracking-tight">
                <div className="flex flex-col sm:flex-row items-start gap-3">
                  <span className="block">Crafting</span>
                  <ContainerTextFlip
                    className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 font-extrabold"
                    words={["intelligent", "scalable", "innovative", "impactful"]}
                    interval={2500}
                    animationDuration={800}
                  />
                </div>
                <span className="block">Experiences</span>
              </h1>
              <h2 className="text-xl sm:text-2xl font-medium text-white/90 max-w-xl mx-auto lg:mx-0">
                Full-Stack Developer & AI Enthusiast
              </h2>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto lg:mx-0">
              Creating seamless digital experiences with Next.js, Angular & AI-driven solutions.
            </p>

            {/* Buttons */}
            <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                className="bg-white text-black hover:bg-white/95 px-6 py-3 rounded-full shadow-md"
                asChild
                variant={undefined}
              >
                <Link href="https://github.com/gatt101" aria-label="Contact Gaurav">
                 Github
                </Link>
              </Button>
              <Button
                className="bg-transparent text-white border border-white/20 hover:bg-white/5 px-6 py-3 rounded-full"
                asChild
                variant={undefined}
              >
                <Link href="https://drive.google.com/file/d/1nLV77ii_7ZPnNQKc5R_fv-a4gX6uKpEi/view?usp=drive_link" aria-label="View Gaurav's Resume">
                  View Resume
                </Link>
              </Button>
            </div>
          </div>

          {/* RIGHT: Profile Image inside an interactive 3D card */}
          <div className="flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              <CardContainer containerClassName="w-80 h-80 sm:w-96 sm:h-96 lg:w-[28rem] lg:h-[28rem]">
                <CardBody className="rounded-2xl shadow-2xl bg-gradient-to-br from-white/5 via-white/2 to-transparent border border-white/5 p-6">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-pink-500/10 blur-3xl -z-10"></div>
                    <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-white/10">
                      <Image
                        src="/images/assets/minecraft_character.png"
                        alt="Gaurav's profile portrait"
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 80vw, 384px"
                      />
                    </div>
                    {/* subtle label */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-1 text-sm text-white/80 backdrop-blur">
                      Gaurav — Full-Stack
                    </div>
                  </div>
                </CardBody>
              </CardContainer>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}