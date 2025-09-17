"use client";
import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export default function TechStackSection() {
  return (
    <section className="py-12 sm:py-20 bg-black rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
          Tools that I have used
        </h2>
        <p className="text-white/70 text-sm sm:text-lg max-w-2xl mx-auto">
          Technologies I use to build scalable and performant applications
        </p>
      </div>
      <div className="h-[5rem] sm:h-[6rem] mb-8 sm:mb-12 w-full flex justify-center">
        <InfiniteMovingCards
          items={frameworksAndTools}
          direction="right"
          speed="slow"
          className="max-w-full sm:max-w-6xl lg:max-w-7xl mx-auto"
        />
      </div>
      <div className="h-[5rem] sm:h-[6rem] w-full flex justify-center">
        <InfiniteMovingCards
          items={languagesAndDatabases}
          direction="left"
          speed="slow"
          className="max-w-full sm:max-w-6xl lg:max-w-7xl mx-auto"
        />
      </div>
    </section>
  );
}
const frameworksAndTools = [
  { name: "Angular", icon: "devicon-angularjs-plain colored" },
  { name: "NextJs", icon: "devicon-nextjs-plain colored" },
  { name: "Spring Boot", icon: "devicon-spring-plain colored" },
  { name: "Flask", icon: "devicon-flask-original colored" },
  { name: "Node.js", icon: "devicon-nodejs-plain colored" },
  { name: "Express.js", icon: "devicon-express-original" },
  { name: "React", icon: "devicon-react-original colored" },
  { name: "Prisma", icon: "devicon-prisma-original" },
  { name: "Vercel", icon: "devicon-vercel-original colored" },
  { name: "Tailwind CSS", icon: "devicon-tailwindcss-plain colored" },
];

const languagesAndDatabases = [
  { name: "Java", icon: "devicon-java-plain colored" },
  { name: "C", icon: "devicon-c-plain colored" },
  { name: "Python", icon: "devicon-python-plain colored" },
  { name: "JavaScript", icon: "devicon-javascript-plain colored" },
  { name: "TypeScript", icon: "devicon-typescript-plain colored" },
  { name: "C++", icon: "devicon-cplusplus-plain colored" },
  { name: "MongoDB Atlas", icon: "devicon-mongodb-plain colored" },
  { name: "PostgreSQL", icon: "devicon-postgresql-plain colored" },
  { name: "MySQL", icon: "devicon-mysql-plain colored" },
  { name: "HTML", icon: "devicon-html5-plain colored" },
  { name: "CSS", icon: "devicon-css3-plain colored" },
];