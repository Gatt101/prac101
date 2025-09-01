"use client"
import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "Google Docs",
    description: "Design your files like as collaborator can edit a file with unlimited functionality to collaborate",
    image: "/favicon.ico",
    tags: ["React", "Node.js", "MongoDB"]
  },
  {
    id: 2,
    title: "Chat App",
    description: "Real-time chat application with modern messaging features",
    image: "/favicon.ico", 
    tags: ["Socket.io", "Express", "React"]
  },
  {
    id: 3,
    title: "Taskmanite",
    description: "Task management application with team collaboration features",
    image: "/favicon.ico",
    tags: ["Next.js", "TypeScript", "Prisma"]
  },
  {
    id: 4,
    title: "Freelance gig website",
    description: "Platform connecting freelancers with clients for various projects",
    image: "/favicon.ico",
    tags: ["React", "Node.js", "PostgreSQL"]
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
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300">
                {/* Project Image */}
                <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {project.title}
                  </h3>
                  <p className="text-white/70 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* View Button */}
                  <button className="w-full py-2 px-4 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-colors duration-200">
                    View
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
