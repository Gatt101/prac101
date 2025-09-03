"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

const projects = [
  {
    id: 1,
    title: "Briefly – AI-Powered arXiv Reader",
    description: "A lightweight arXiv reader rebuilt in Next.js for speed and DX. It fetches papers, summarizes them with on-device Xenova pipelines, supports multi-tone summaries (Beginner / Story / Buzz), and ships an infinite-scroll explore feed with filters, related papers, reading list, and quick PDF open. Auth is JWT from scratch (no NextAuth) with real-time email verification. ISR/SSR + image optimization for fast first paint.",
    image: "/images/assets/image7.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"]
  },
  {
    id: 2,
    title: "Radiographic X-Ray Bone Fracture Severity Detection",
    description: "End-to-end orthopedic assistant: YOLO-based fracture detection on X-rays + LLM-powered treatment guidance. React UI shows annotated images, generates a PDF report, and chats about findings. Backend (Flask) runs inference and orchestrates suggestions via a fine-tuned Qwen-2.5 model. Includes hospital-nearby lookup (planned/opt-in).",
    image: "/images/assets/image.png",
    tags: ["Flask", "Python", "React", "Tailwind", "Vercel"]
  },
  {
    id: 3,
    title: "E-Store Platform",
    description: "Full-stack e-commerce with secure auth, catalog, cart, orders, and admin controls. Clean Angular SPA talks to Spring Boot REST APIs with JWT. MySQL persistence and role-based access.",
    image: "/images/assets/image2.png",
    tags: ["Angular", "Spring Boot", "MongoDB", "TypeScript", "Docker"]
  },
  {
    id: 4,
    title: "Multilingual Sentiment Analysis",
    description: "Web app that classifies sentiment for texts across languages. Angular frontend with Flask backend using a multilingual Transformer model; simple REST integration and clean UI.",
    image: "/images/assets/image5.png",
    tags: ["Flask", "Angular", "Vercel"]
  },
  {
    id: 5,
    title: "AI Text Summarizer",
    description: "Minimal text-to-summary tool built on Transformers pipeline. Clean frontend + Flask API; useful as a building block for reading assistants.",
    image: "/images/assets/image9.png",
    tags: ["Flask", "Angular", "Python", "TypeScript"]
  },
  {
    id: 6,
    title: "Tree Enumeration – YOLOv11-based Counting",
    description: "Developed an aerial imagery analysis pipeline to detect and count trees using YOLOv11, achieving 92% precision on drone datasets. Deployed a Flask API to process uploads and return bounding box annotations with accurate per-area counts.",
    image: "/images/assets/image8.png",
    tags: ["Python", "Flask", "React"]
  },
  {
    id: 7,
    title: "Simulation of Malware Detection System",
    description: "Educational demo showing data protection flow and safe storage using symmetric cryptography. Includes AES-based encrypt/decrypt with a simple web UI.",
    image: "/images/assets/image4.png",
    tags: ["Flask", "Angular"]
  },
  {
    id: 8,
    title: "Blogging Website",
    description: "A simple blog platform with posts, auth, and CRUD. Built to practice Angular + Spring Boot with MongoDB.",
    image: "/images/assets/image3.png",
    tags: ["Spring Boot", "Angular", "MongoDB"]
  },
  {
    id: 9,
    title: "M-toolKit",
    description: "Desktop toolkit for students: calculators, unit converters, and handy formulas in one Java Swing app.",
    image: "/images/assets/image6.png",
    tags: ["Java"]
  }
];

export default function ProjectSection() {
  return (
    <section className="py-20 bg-black">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Projects 
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <CardContainer className="inter-var">
                <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
                  {/* Project Image */}
                  <CardItem
                    translateZ="100"
                    className="w-full mt-4"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      height={1000}
                      width={1000}
                      className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    />
                  </CardItem>

                  {/* Project Content */}
                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 dark:text-white mt-4"
                  >
                    {project.title}
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                  >
                    {project.description}
                  </CardItem>

                  {/* Tags */}
                  <CardItem
                    translateZ="40"
                    className="flex flex-wrap gap-2 mt-4"
                  >
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </CardItem>

                  {/* View Button */}
                  <div className="flex justify-between items-center mt-20">
                    <CardItem
                      translateZ={20}
                      as="a"
                      href="#"
                      target="__blank"
                      className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                    >
                      View Project →
                    </CardItem>
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