
"use client";
import { cn } from "@/lib/utils";

// cardData.ts content (inline here for convenience)
export const cardData = [
  {
    id: 1,
    avatar: "/finance.png", // category or sender logo
    author: "Daily Digest – 09 Aug 2025",
    readTime: "5 bullet summary",
    title: "Finance Updates",
    description:
      "Sensex surges 300 points as IT stocks rally; RBI hints at no rate hike this quarter.",
    background: "https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
  },
  {
    id: 2,
    avatar: "/technews.png",
    author: "Daily Digest – 09 Aug 2025",
    readTime: "Pinned: Tech",
    title: "Tech & AI",
    description:
      "OpenAI releases GPT-6 with advanced reasoning; Google DeepMind announces new robotics breakthrough.",
    background:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1651&q=80",
  },
  {
    id: 3,
    avatar: "/startup.png",
    author: "Daily Digest – 09 Aug 2025",
    readTime: "Category: Startups",
    title: "Startup Spotlight",
    description:
      "Fintech startup ‘CrediFast’ raises $20M in Series B funding to expand AI-powered lending services.",
    background:
     "https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U" },
  {
    id: 4,
    avatar: "/health.png",
    author: "Daily Digest – 09 Aug 2025",
    readTime: "Category: Health",
    title: "Health Advisory",
    description:
      "WHO issues dengue alert for Southeast Asia; tips for prevention and early detection shared.",
    background:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1651&q=80",
  },
];

export function CardDemo() {
  return (
    <div className="mx-auto w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-16 px-4">
      {cardData.map((card) => (
        <div key={card.id} className="w-full group/card">
          <div
            className={cn(
              "relative cursor-pointer overflow-hidden card h-[28rem] rounded-xl shadow-xl mx-auto",
              "flex flex-col justify-between p-5",
              // keep sizing/position utilities in Tailwind
              "bg-cover bg-center"
            )}
            // ✅ Dynamic background via inline style so it always renders
            style={{ backgroundImage: `url(${card.background})` }}
          >
            {/* overlay (use opacity color utilities, no dynamic hover purge issues) */}
            <div className="absolute inset-0 bg-black/50 transition group-hover/card:bg-black/60" />

            {/* header */}
            <div className="flex flex-row items-center space-x-4 relative z-10">
              <img
                height={100}
                width={100}
                alt="Avatar"
                src={card.avatar}
                className="h-10 w-10 rounded-full border-2 object-cover"
              />
              <div className="flex flex-col">
                <p className="font-normal text-base text-gray-50">{card.author}</p>
                <p className="text-sm text-gray-300">{card.readTime}</p>
              </div>
            </div>

            {/* content */}
            <div className="relative z-10">
              <h1 className="font-bold text-2xl md:text-3xl text-gray-50">
                {card.title}
              </h1>
              <p className="font-normal text-base text-gray-50/90 mt-3">
                {card.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
