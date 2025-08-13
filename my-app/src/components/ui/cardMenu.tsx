"use client";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type CardItem = {
  id: number;
  avatar: string;
  author: string;
  readTime: string;
  title: string;
  description: string;
  background: string;
  href?: string; // optional: override link target
};

// cardData.ts (inline)
export const cardData: CardItem[] = [
  {
    id: 1,
    avatar: "/file.svg",
    author: "Research Explorer",
    readTime: "Feature Highlight",
    title: "ArXiv Integration",
    description:
      "Search and explore research papers from arXiv. Get instant access to scientific papers with powerful search capabilities and real-time updates.",
    background:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80",
    href: "/explore",
  },
  {
    id: 2,
    avatar: "/globe.svg",
    author: "AI Assistant",
    readTime: "Smart Feature",
    title: "Smart Summarization",
    description:
      "Get instant AI-powered summaries of research papers. Our advanced summarization helps you quickly grasp key concepts and findings.",
    background:
      "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80",
    href: "/explore",
  },
  {
    id: 3,
    avatar: "/window.svg",
    author: "Context Analysis",
    readTime: "Advanced Search",
    title: "Context-Based Search",
    description:
      "Discover related papers and explore research clusters. Our intelligent system helps you find relevant papers based on context.",
    background:
      "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?auto=format&fit=crop&q=80",
    href: "/explore",
  },
  {
    id: 4,
    avatar: "/vercel.svg",
    author: "User Experience",
    readTime: "Security & UX",
    title: "Secure & Personalized",
    description:
      "Enjoy a secure, personalized experience with user authentication, email verification, and password management features.",
    background:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80",
    href: "/login",
  },
];

export function CardDemo() {
  return (
    <div className="mx-auto w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-16 px-4">
      {cardData.map((card) => {
        const targetHref =
          card.href ?? `/explore?query=${encodeURIComponent(card.title)}`;
        return (
          <Link key={card.id} href={targetHref} prefetch className="group">
            <article
              className={cn(
                "relative h-[28rem] w-full rounded-2xl overflow-hidden shadow-xl",
                "ring-1 ring-black/10 hover:ring-white/10 transition"
              )}
              aria-label={`${card.title} — ${card.readTime}`}
            >
              {/* Background image */}
              <Image
                src={card.background}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority={card.id === 1}
              />

              {/* Overlays for readability */}
              <div className="absolute inset-0 bg-black/50 transition group-hover:bg-black/60" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />

              {/* Content */}
              <div className="relative z-10 flex h-full flex-col justify-between p-5">
                {/* Header */}
                <header className="flex items-center gap-4">
                  <Image
                    src={card.avatar}
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full border-2 border-white/30 object-cover"
                  />
                  <div className="flex flex-col">
                    <p className="text-base text-gray-50/95">{card.author}</p>
                    <p className="text-sm text-gray-300">{card.readTime}</p>
                  </div>
                </header>

                {/* Body */}
                <div>
                  <h2 className="font-bold text-2xl md:text-3xl text-white drop-shadow-sm">
                    {card.title}
                  </h2>
                  <p className="mt-3 text-base text-gray-100/90 line-clamp-2">
                    {card.description}
                  </p>
                </div>
              </div>

              {/* Focus ring for accessibility */}
              <span className="absolute inset-0 rounded-2xl ring-0 ring-offset-2 ring-offset-black group-focus-visible:ring-2 group-focus-visible:ring-blue-400" />
            </article>
          </Link>
        );
      })}
    </div>
  );
}
