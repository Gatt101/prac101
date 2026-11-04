// Public-only knowledge used by the portfolio AI assistant.
// Intentionally excludes any employer-internal or university-internal project details.

export const PROFILE = {
  name: "Gaurav Patil",
  title: "Agentic AI Engineer",
  summary:
    "Gaurav Patil is an Agentic AI Engineer who builds autonomous LLM agents, multi-agent systems and production RAG pipelines.",
  email: "gauravpatilk11@gmail.com",
  links: {
    github: "https://github.com/gatt101",
    linkedin: "https://www.linkedin.com/in/gaurav-patil-2724a8264",
    x: "https://x.com/Gaurav72256287",
  },
  skills: [
    "Python", "TypeScript", "JavaScript", "Java", "C", "C++",
    "Next.js", "React", "Angular", "Spring Boot", "Flask", "Node.js", "Express.js",
    "Tailwind CSS", "Prisma", "Vercel",
    "MongoDB", "PostgreSQL", "MySQL",
  ],
};

export const PERSONAL_PROJECTS = [
  { name: "Briefly – AI-Powered arXiv Reader", about: "Next.js arXiv reader with on-device Xenova summarization, multi-tone summaries, infinite-scroll feed and a reading list.", tags: ["Next.js", "TypeScript", "Tailwind CSS"] },
  { name: "Radiographic X-Ray Bone Fracture Severity Detection", about: "YOLO-based fracture detection plus LLM treatment guidance, PDF reports and chat (Flask + React).", tags: ["Flask", "Python", "React", "YOLO"] },
  { name: "E-Store Platform", about: "Angular + Spring Boot e-commerce app with JWT auth, cart, orders and admin controls.", tags: ["Angular", "Spring Boot", "Docker"] },
  { name: "NextCV Coach – AI-powered Career & CV Coach", about: "SaaS that analyses and improves CVs with AI feedback, Clerk auth, template previews and PDF export.", tags: ["Next.js", "Inngest", "MongoDB", "Clerk"] },
  { name: "AI Chatbot Studio", about: "Streaming multi-model chatbot built on the Vercel AI SDK with reasoning, sources, tool-call and web-search UI elements.", tags: ["Next.js", "Vercel AI SDK", "TypeScript"] },
  { name: "AI Text Summarizer", about: "Text summarisation tool.", tags: ["NLP"] },
  { name: "Tree Enumeration – YOLOv11 Counting", about: "Counts trees in aerial imagery with YOLOv11 behind a Flask API.", tags: ["YOLOv11", "Flask"] },
  { name: "Multilingual Sentiment Analysis", about: "Sentiment analysis across languages.", tags: ["NLP", "Python"] },
];

export function knowledgeAsText(): string {
  return [
    PROFILE.summary,
    `Contact: ${PROFILE.email} | GitHub ${PROFILE.links.github} | LinkedIn ${PROFILE.links.linkedin} | X ${PROFILE.links.x}`,
    `Skills: ${PROFILE.skills.join(", ")}`,
    "Personal projects:",
    ...PERSONAL_PROJECTS.map((p) => `- ${p.name}: ${p.about} [${p.tags.join(", ")}]`),
  ].join("\n");
}

/** Offline fallback used when no LLM API key is configured. */
export function localAnswer(question: string): string {
  const q = question.toLowerCase();
  const has = (...w: string[]) => w.some((x) => q.includes(x));

  if (has("contact", "email", "hire", "reach", "mail"))
    return `You can reach Gaurav at ${PROFILE.email}, or on LinkedIn (${PROFILE.links.linkedin}) and GitHub (${PROFILE.links.github}).`;
  if (has("skill", "stack", "tech", "language", "tools"))
    return `Core stack: ${PROFILE.skills.join(", ")}. The focus is agentic AI: LLM agents, multi-agent systems and RAG.`;
  if (has("project", "built", "work", "portfolio", "demo")) {
    const hit = PERSONAL_PROJECTS.find((p) =>
      p.name.toLowerCase().split(/[\s–-]+/).some((t) => t.length > 3 && q.includes(t)),
    );
    if (hit) return `${hit.name}: ${hit.about} Built with ${hit.tags.join(", ")}.`;
    return `Highlights: ${PERSONAL_PROJECTS.slice(0, 5).map((p) => p.name).join("; ")}. See the full list at /projects.`;
  }
  if (has("who", "about", "gaurav", "yourself")) return PROFILE.summary;
  return `${PROFILE.summary} Ask me about projects, skills, or how to get in touch.`;
}
