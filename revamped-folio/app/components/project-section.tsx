"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";

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
    link: 'https://orthopedic-agent.vercel.app',
    github: 'https://github.com/Gatt101/Bone_Fracture_Detection'
  },

  {
    id: 3,
    title: 'E-Store Platform',
    description:
      'Full-stack e-commerce with secure auth, catalog, cart, orders, and admin controls. Clean Angular SPA talks to Spring Boot REST APIs with JWT. MySQL persistence and role-based access.',
    image: '/images/assets/image2.png',
    tags: ['Angular', 'Spring Boot', 'MongoDB' , 'TypeScript' ,'Docker'],
    link: 'https://e-commerce-alpha-five-96.vercel.app',
    github: 'https://github.com/Gatt101/E-Commerce'
  },

  {
    id: 4,
    title: 'Multilingual Sentiment Analysis',
    description:
      'Web app that classifies sentiment for texts across languages. Angular frontend with Flask backend using a multilingual Transformer model; simple REST integration and clean UI.',
    image: '/images/assets/image5.png',
    tags: ['Flask', 'Angular', 'Vercel'],
    link: 'https://sentimental-analysis-gatt101s-projects.vercel.app',
    github: 'https://github.com/Gatt101/Sentimental_Analysis'
  },

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

                  {/* View & GitHub Buttons */}
                   {/* View & GitHub Buttons */}
                  <div className="flex justify-between items-center mt-6">
                    <div className="flex items-center gap-3">
                      <CardItem
                        translateZ={20}
                        as="a"
                        href={project.link || '#'}
                        target={project.link ? '_blank' : undefined}
                        aria-disabled={!project.link}
                        className={`px-4 py-2 rounded-xl text-xs font-medium ${project.link ? 'bg-white text-black hover:brightness-95' : 'bg-white/10 text-white/40 cursor-not-allowed'}`}
                      >
                        {project.link ? 'View Project →' : 'Unavailable'}
                      </CardItem>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 rounded-xl text-xs bg-gray-800 text-white/90 hover:bg-gray-700 transition-colors duration-200 flex items-center gap-2"
                          aria-label={`View ${project.title} on GitHub`}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          GitHub
                        </a>
                      )}
                    </div>
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