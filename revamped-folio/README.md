# Gaurav Patil — Portfolio

Next.js 15 · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion. Live at [gaurav.social](https://gaurav.social).

## Features
- Animated hero, about, experience, projects, skills and contact sections
- **Ask AI** — floating chat assistant (`/api/chat`). Uses the Anthropic API when `ANTHROPIC_API_KEY` is set, otherwise falls back to an offline answer from `lib/profile-knowledge.ts`
- Interactive agentic-loop section (Planner → Retriever → Tool Executor → Memory → Critic)
- Project archive at `/projects`, contact form via nodemailer

## Run locally
```bash
npm install
cp .env.example .env.local   # optional
npm run dev
```

## Notes
`lib/profile-knowledge.ts` holds only public personal-project info; keep employer/university-internal work out of it.
