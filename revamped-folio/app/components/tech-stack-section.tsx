"use client"
import { motion } from "framer-motion";

const frontendTech = [
  { name: "React", icon: "⚛️", description: "Library for building user interfaces" },
  { name: "TypeScript", icon: "📘", description: "Typed JavaScript at any scale" },
  { name: "Next.js", icon: "⚡", description: "Production-ready React framework" },
  { name: "HTML5", icon: "🌐", description: "Standard markup language for web" }
];

const backendTech = [
  { name: "Node.js", icon: "💚", description: "JavaScript runtime environment" },
  { name: "MongoDB", icon: "🍃", description: "NoSQL database for modern apps" },
  { name: "Express", icon: "🚀", description: "Fast, unopinionated web framework" },
  { name: "PostgreSQL", icon: "🐘", description: "Advanced open source database" }
];

const stats = [
  { number: "10+", label: "Projects completed" },
  { number: "5+", label: "Frontend Technologies" },
  { number: "15+", label: "Projects completed" }
];

export default function TechStackSection() {
  return (
    <section className="py-20 bg-black">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Tech
          </h2>
          <p className="text-white/70 text-lg">
            Technologies I use to build scalable and performant applications
          </p>
        </div>

        {/* Tech Icons Row */}
        <div className="flex justify-center mb-16">
          <div className="flex items-center gap-8 p-4">
            {["⚛️", "📘", "💚", "🍃", "🚀"].map((icon, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-4xl"
              >
                {icon}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Frontend and Backend Technologies */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Frontend Technologies */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Frontend Technologies
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {frontendTech.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 border border-white/10 rounded-lg p-4 hover:border-white/20 transition-colors duration-200"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{tech.icon}</span>
                    <h4 className="font-semibold text-white">{tech.name}</h4>
                  </div>
                  <p className="text-white/60 text-sm">{tech.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Backend Technologies */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Backend Technologies
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {backendTech.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 border border-white/10 rounded-lg p-4 hover:border-white/20 transition-colors duration-200"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{tech.icon}</span>
                    <h4 className="font-semibold text-white">{tech.name}</h4>
                  </div>
                  <p className="text-white/60 text-sm">{tech.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-white/70">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
