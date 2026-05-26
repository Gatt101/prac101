"use client";
import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { Cpu, Database, Workflow } from "lucide-react";

export default function TechStackSection() {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden rounded-md bg-black py-10 antialiased sm:py-14 lg:py-16">
      <div className="absolute inset-x-0 top-1/2 h-40 -translate-y-1/2 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 blur-3xl" />
      <div className="relative mx-auto mb-7 max-w-6xl px-4 text-center sm:mb-9 sm:px-6">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-medium text-cyan-200">
          <Workflow className="h-3.5 w-3.5" aria-hidden="true" />
          Toolbox
        </div>
        <h2 className="mb-3 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
          Tools I use to ship
        </h2>
        <p className="mx-auto max-w-2xl text-sm leading-6 text-white/62 sm:text-base">
          Technologies I use to build scalable and performant applications
        </p>
      </div>
      <div className="relative mb-5 grid w-full max-w-5xl grid-cols-1 gap-3 px-4 sm:mb-7 sm:grid-cols-3 sm:px-6">
        {[
          { label: "Frontend", value: "Next.js, React, Angular", icon: Cpu },
          { label: "Backend", value: "Spring Boot, Flask, Node", icon: Workflow },
          { label: "Data", value: "MongoDB, SQL, Prisma", icon: Database },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 text-left shadow-lg shadow-black/20 backdrop-blur">
            <Icon className="mb-3 h-5 w-5 text-blue-300" aria-hidden="true" />
            <p className="text-sm font-semibold text-white">{label}</p>
            <p className="mt-1 text-xs leading-5 text-white/56">{value}</p>
          </div>
        ))}
      </div>
      <div className="relative mb-4 flex h-[4.25rem] w-full justify-center sm:h-[5rem]">
        <InfiniteMovingCards
          items={frameworksAndTools}
          direction="right"
          speed="slow"
          className="mx-auto max-w-full sm:max-w-6xl lg:max-w-7xl"
        />
      </div>
      <div className="relative flex h-[4.25rem] w-full justify-center sm:h-[5rem]">
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
