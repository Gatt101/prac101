"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
const projects = [
  {
    id: 1,
    title: 'Briefly – AI-Powered arXiv Reader',
    description:
      'A lightweight arXiv reader rebuilt in Next.js for speed and DX. It fetches papers, summarizes them with on-device Xenova pipelines, supports multi-tone summaries (Beginner / Story / Buzz), and ships an infinite-scroll explore feed with filters, related papers, reading list, and quick PDF open. Auth is JWT from scratch (no NextAuth) with real-time email verification. ISR/SSR + image optimization for fast first paint.',
    image: '/images/assets/image7.png',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    link: 'https://prac101-wtdw.vercel.app',
    github: 'https://github.com/Gatt101/prac101/tree/2e5a23d4fc3208c39a31d9db4887af5c198a4002/my-app'
  },

  {
    id: 2,
    title: 'Radiographic X-Ray Bone Fracture Severity Detection',
    description:
      'End-to-end orthopedic assistant: YOLO-based fracture detection on X-rays + LLM-powered treatment guidance. React UI shows annotated images, generates a PDF report, and chats about findings. Backend (Flask) runs inference and orchestrates suggestions via a fine-tuned Qwen-2.5 model. Includes hospital-nearby lookup (planned/opt-in).',
    image: '/images/assets/image.png',
    tags: ['Flask', 'Python', 'React', 'Tailwind', 'Vercel'],
    github: 'https://github.com/Gatt101/Bone_Fracture_Detection'
  },

  {
    id: 3,
    title: 'E-Store Platform',
    description:
      'Full-stack e-commerce with secure auth, catalog, cart, orders, and admin controls. Clean Angular SPA talks to Spring Boot REST APIs with JWT. MySQL persistence and role-based access.',
    image: '/images/assets/image2.png',
    tags: ['Angular', 'Spring Boot', 'MongoDB', 'TypeScript', 'Docker'],
    link: 'https://e-commerce-alpha-five-96.vercel.app',
    github: 'https://github.com/Gatt101/E-Commerce'
  },
  {
    id: 4,
    title: 'NextCV Coach – AI-powered Resume Coach',
    description:
      'SaaS platform that leverages AI to analyze, review, and enhance resumes with actionable, personalized feedback. Includes secure Clerk authentication, real-time editing with Aceternity UI, template previews, and PDF export. Backend powered by Next.js API routes and MongoDB with optimized SSR/ISR caching.',
    image: '/images/assets/image10.png',
    tags: ['Next.js', 'TypeScript', 'Inngest', 'MongoDB', 'Clerk'],
    link: 'https://resume-coach-nine.vercel.app/',
    github: 'https://github.com/Gatt101/Resume-Coach'
  },

  {
    id: 5,
    title: 'AI Text Summarizer',
    description:
      'Minimal text-to-summary tool built on Transformers pipeline. Clean frontend + Flask API; useful as a building block for reading assistants.',
    image: '/images/assets/image9.png',
    tags: ['Flask', 'Angular', 'Python', 'TypeScript'],
    link: '',
    github: 'https://github.com/Gatt101/AI-Text-Summarizer'
  },

  {
    id: 6,
    title: 'Tree Enumeration – YOLOv11-based Counting',
    description:
      'Developed an aerial imagery analysis pipeline to detect and count trees using YOLOv11, achieving 92% precision on drone datasets. Deployed a Flask API to process uploads and return bounding box annotations with accurate per-area counts.',
    image: '/images/assets/image8.png',
    tags: ['Python', 'Flask', 'React'],
    link: '',
    github: 'https://github.com/Gatt101/Tree_Enumeration'
  },

  {
    id: 7,
    title: 'Simulation of Malware Detection System',
    description:
      'Educational demo showing data protection flow and safe storage using symmetric cryptography. Includes AES-based encrypt/decrypt with a simple web UI.',
    image: '/images/assets/image4.png',
    tags: ['Flask', 'Angular'],
    link: 'https://css-psi-sand.vercel.app',
    github: 'https://github.com/Gatt101/CSS'
  },

  {
    id: 8,
    title: 'Blogging Website',
    description:
      'A simple blog platform with posts, auth, and CRUD. Built to practice Angular + Spring Boot with MongoDB.',
    image: '/images/assets/image3.png',
    tags: ['Spring Boot', 'Angular', 'MongoDB'],
    link: 'https://blog-app-frontend-flame.vercel.app',
    github: 'https://github.com/Gatt101/BlogApp_Frontend'
  },
  {
    id: 9,
    title: 'Multilingual Sentiment Analysis',
    description:
      'Web app that classifies sentiment for texts across languages. Angular frontend with Flask backend using a multilingual Transformer model; simple REST integration and clean UI.',
    image: '/images/assets/image5.png',
    tags: ['Flask', 'Angular', 'Vercel'],
    github: 'https://github.com/Gatt101/Sentimental_Analysis'
  },

  {
    id: 10,
    title: 'M-toolKit',
    description:
      'Desktop toolkit for students: calculators, unit converters, and handy formulas in one Java Swing app.',
    image: '/images/assets/image6.png',
    tags: ['Java'],
    link: '',
    github: 'https://github.com/Gatt101/Swing_pro'
  }
];

export default function ProjectSection() {
  return (
    <section className="bg-black py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-8 text-center sm:mb-10">
          {/* back btn */}
          <Link href="/" className="mb-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm text-white/80 transition-colors hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Home
          </Link>
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
            Project Archive
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-6 text-white/62 sm:text-base">
            A fuller list of web apps, AI tools, and backend-heavy builds.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group w-full"
            >
              <CardContainer className="inter-var w-full">
                <CardBody className="relative h-auto w-full rounded-2xl border border-white/10 bg-white/[0.045] p-3 shadow-xl shadow-black/20 transition-all duration-200 group-hover/card:border-blue-300/25 group-hover/card:bg-white/[0.065] sm:p-4">
                  {/* Project Image */}
                  <CardItem
                    translateZ="100"
                    className="w-full"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      height={1000}
                      width={1000}
                      className="h-40 w-full rounded-xl object-cover ring-1 ring-white/10 transition-transform duration-300 group-hover/card:scale-[1.015] group-hover/card:shadow-xl sm:h-48 lg:h-52"
                    />
                  </CardItem>

                  {/* Project Content */}
                  <CardItem
                    translateZ="50"
                    className="mt-3 text-lg font-bold leading-snug text-white sm:text-xl"
                  >
                    {project.title}
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="mt-2 max-w-full text-sm leading-6 text-white/62 line-clamp-3"
                  >
                    {project.description}
                  </CardItem>

                  {/* Tags */}
                  <CardItem
                    translateZ="40"
                    className="mt-3 flex flex-wrap gap-1.5 sm:gap-2"
                  >
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-black/30 px-2 py-1 text-[11px] font-medium text-white/75 sm:px-2.5 sm:text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </CardItem>

                  {/* View & GitHub Buttons */}
                  <div className="mt-5 flex flex-wrap items-center gap-2.5">
                    {project.link && (
                      <CardItem
                        translateZ={20}
                        as="a"
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-3.5 py-2 text-xs font-semibold text-black transition-all duration-200 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                      >
                        View Project
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      </CardItem>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3.5 py-2 text-xs font-semibold text-white/90 transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.11] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                        aria-label={`View ${project.title} on GitHub`}
                      >
                        <Github className="h-4 w-4" aria-hidden="true" />
                        GitHub
                      </a>
                    )}
                  </div>
                </CardBody>
              </CardContainer>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
