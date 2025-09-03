"use client";
import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export default function TechStackSection() {
  return (
    <section className="py-20 bg-black rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          Tools that I have used
        </h2>
        <p className="text-white/70 text-lg">
          Technologies I use to build scalable and performant applications
        </p>
      </div>
      <div className="h-[6rem] mb-12">
        <InfiniteMovingCards
          items={frameworksAndTools}
          direction="right"
          speed="slow"
          className="max-w-7xl"
        />
      </div>
      <div className="h-[6rem]">
        <InfiniteMovingCards
          items={languagesAndDatabases}
          direction="left"
          speed="slow"
          className="max-w-7xl"
        />
      </div>
    </section>
  );
}

const frameworksAndTools = [
  { name: "Angular", icon: "devicon-angularjs-plain colored" },
  { name: "NextJs", icon: "devicon-nextjs-plain" },
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