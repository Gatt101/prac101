"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "Briefly – AI-Powered arXiv Reader",
    description: "A lightweight arXiv reader rebuilt in Next.js for speed and DX. It fetches papers, summarizes them with on-device Xenova pipelines, supports multi-tone summaries (Beginner / Story / Buzz), and ships an infinite-scroll explore feed with filters, related papers, reading list, and quick PDF open.",
    image: "/images/assets/image7.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"]
  },
  {
    id: 2,
    title: "Orthopedic Assistant",
    description: "Orthopedic assistant: YOLO-based fracture detection on X-rays + LLM-powered treatment guidance. React UI shows annotated images, generates a PDF report, and chats about findings. Backend (Flask) runs inference and orchestrates suggestions via a fine-tuned Qwen-2.5 model.",
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
  }
];

export default function ProjectSection() {
  return (
    <section className="py-12 sm:py-20 bg-black">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Projects
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group w-full"
            >
              <CardContainer className="inter-var w-full">
                <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-4 sm:p-6 border">
                  {/* Project Image */}
                  <CardItem
                    translateZ="100"
                    className="w-full mt-2 sm:mt-4"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      height={1000}
                      width={1000}
                      className="h-48 sm:h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    />
                  </CardItem>

                  {/* Project Content */}
                  <CardItem
                    translateZ="50"
                    className="text-lg sm:text-xl font-bold text-neutral-600 dark:text-white mt-3 sm:mt-4"
                  >
                    {project.title}
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm sm:text-base max-w-full mt-2 dark:text-neutral-300 line-clamp-4"
                  >
                    {project.description}
                  </CardItem>

                  {/* Tags */}
                  <CardItem
                    translateZ="40"
                    className="flex flex-wrap gap-2 mt-3 sm:mt-4"
                  >
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 sm:px-3 py-1 text-xs rounded-full bg-white/10 text-white/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </CardItem>

                  {/* View Button */}
                  <div className="flex justify-between items-center mt-6 sm:mt-8">
                    <CardItem
                      translateZ={20}
                      as="a"
                      href="#"
                      target="__blank"
                      className="px-4 py-2 rounded-xl text-xs sm:text-sm font-normal dark:text-white hover:text-blue-400 transition-colors duration-200"
                    >
                      View Project →
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center items-center mt-8 sm:mt-12">
          <Link href="/projects" className="text-white/60 hover:text-white transition-colors duration-200 text-sm sm:text-base">
            View All Projects →
          </Link>
        </div>
      </div>
    </section>
  );
}