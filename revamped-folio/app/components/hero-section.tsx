"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SparklesCore } from "@/components/ui/sparkles";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { CardContainer, CardBody } from "@/components/ui/3d-card";
import { useState } from "react";
import { cn } from "@/lib/utils";


// Enhanced Navbar Component
function EnhancedNavbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  
  // Tech Icons as React Components
  const TechIcons = {
    React: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-blue-400">
        <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89s-.84 1.89-1.87 1.89c-1.03 0-1.87-.84-1.87-1.89s.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9s-1.17 0-1.71.03c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03s1.17 0 1.71-.03c.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.37 1.95-1.47-.84-1.63-3.05-1.01-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1.01-5.63 1.46-.84 3.45.12 5.37 1.95 1.92-1.83 3.91-2.79 5.37-1.95z"/>
      </svg>
    ),
    NextJS: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-white">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm-.5 17.93c-.61-.35-1.16-.83-1.61-1.4L15.54 12H8.41l9.61 7.93c-.61.35-1.22.61-1.88.8l-4.64-3.8z"/>
      </svg>
    ),
    TypeScript: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-blue-500">
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
      </svg>
    ),
    Python: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-yellow-400">
        <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.26-.02.21-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25c-.2 0-.37.09-.37.21 0 .12.17.21.37.21.2 0 .37-.09.37-.21 0-.12-.17-.21-.37-.21z"/>
      </svg>
    ),
    Node: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-green-500">
        <path d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l7.44 4.3c.46.26 1.04.26 1.5 0l7.44-4.3c.48-.28.78-.8.78-1.36V7.71c0-.56-.3-1.08-.78-1.36l-7.44-4.3c-.23-.13-.51-.2-.78-.2zm-.24 15.28c-.31 0-.56-.25-.56-.56V9.42c0-.31.25-.56.56-.56s.56.25.56.56v7.15c0 .31-.25.56-.56.56z"/>
      </svg>
    ),
    TailwindCSS: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-cyan-400">
        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C7.666,17.818,9.027,19.2,12.001,19.2c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
      </svg>
    ),
    MongoDB: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-green-600">
        <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218z"/>
      </svg>
    ),
    Express: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-gray-400">
        <path d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957c-2.864 1.607-6.509.018-7.978-2.667a6.047 6.047 0 01-.784-3.81c0-.27.02-.54.059-.939z"/>
      </svg>
    )
  };
  
  return (
    <div className={cn("fixed top-10 inset-x-0 max-w-4xl mx-auto z-50 px-4", className)}>
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="About">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="#skills">Technical Skills</HoveredLink>
            <HoveredLink href="#experience">Experience</HoveredLink>
            <HoveredLink href="#education">Education</HoveredLink>
            <HoveredLink href="#achievements">Achievements</HoveredLink>
          </div>
        </MenuItem>
        
        <MenuItem setActive={setActive} active={active} item="Projects">
          <div className="text-sm grid grid-cols-1 md:grid-cols-2 gap-6 p-4 max-w-md md:max-w-2xl">
            <ProductItem
              title="AI-Powered Analytics"
              href="/projects/ai-analytics"
              src="/images/assets/image.png"
              description="ML dashboard with real-time data visualization."
              techIcons={[TechIcons.React, TechIcons.Python, TechIcons.TypeScript]}
            />
            <ProductItem
              title="E-Commerce Platform"
              href="/projects/ecommerce"
              src="/images/assets/image2.png"
              description="Full-stack e-commerce with modern payments."
              techIcons={[TechIcons.NextJS, TechIcons.Node, TechIcons.MongoDB]}
            />
            <ProductItem
              title="Task Management App"
              href="/projects/task-manager"
              src="/images/assets/image3.png"
              description="Collaborative project tool with real-time updates."
              techIcons={[TechIcons.React, TechIcons.Express, TechIcons.MongoDB]}
            />
            <ProductItem
              title="Portfolio Website"
              href="/projects/portfolio"
              src="/images/assets/image4.png"
              description="Responsive portfolio with modern animations."
              techIcons={[TechIcons.NextJS, TechIcons.TypeScript, TechIcons.TailwindCSS]}
            />
          </div>
        </MenuItem>
        
        <MenuItem setActive={setActive} active={active} item="Skills">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="#frontend">Frontend Development</HoveredLink>
            <HoveredLink href="#backend">Backend Development</HoveredLink>
            <HoveredLink href="#ai-ml">AI & Machine Learning</HoveredLink>
            <HoveredLink href="#devops">DevOps & Cloud</HoveredLink>
          </div>
        </MenuItem>
        
        <MenuItem setActive={setActive} active={active} item="Contact">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="mailto:your-email@example.com">Email</HoveredLink>
            <HoveredLink href="https://linkedin.com/in/yourprofile">LinkedIn</HoveredLink>
            <HoveredLink href="https://github.com/gatt101">GitHub</HoveredLink>
            <HoveredLink href="https://drive.google.com/file/d/1nLV77ii_7ZPnNQKc5R_fv-a4gX6uKpEi/view?usp=drive_link">Download Resume</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default function HeroSection() {
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
        <EnhancedNavbar />
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
                        src="/images/assets/profile.png"
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