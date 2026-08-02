<div align="center">

# Paul Ochieng - Portfolio

A personal portfolio and engineering showcase built with **Next.js 16**, **React 19**, and **Tailwind CSS v4**. Features 19 project case studies, an AI-powered chat assistant, multi-language support, and a contact form with enterprise-grade spam protection.

<p>
  <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js"></a>
  <a href="https://react.dev"><img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React"></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript" alt="TypeScript"></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss" alt="Tailwind CSS"></a>
  <a href="https://nodejs.org"><img src="https://img.shields.io/badge/Node.js-lts-339933?logo=node.js" alt="Node.js"></a>
  <a href="https://eslint.org"><img src="https://img.shields.io/badge/ESLint-9-4B32C3?logo=eslint" alt="ESLint"></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/License-MIT-orange" alt="License: MIT"></a>
</p>

</div>

---

## Features

- **19 Project Case Studies** - Detailed write-ups with problem, approach, outcome, and tech stack
- **AI Chat Assistant** - SSE-streaming FastAPI portfolio agent with multi-provider LLM support, web search, and daily quota enforcement
- **Multi-Language Support** - Google Translate integration with 7 languages
- **Contact Form** - Cloudflare Turnstile CAPTCHA, Zod validation, honeypot field, rate limiting
- **GitHub Integration** - Contribution calendar with year selector, proxied through API
- **Dark / Light Theme** - Class-based toggle via `next-themes`
- **Custom Cursor** - Dot + ring follower with sparkle effects and Konami code easter egg
- **Smooth Scroll** - Lenis-powered smooth scrolling with scroll-triggered reveal animations
- **SEO Optimized** - JSON-LD structured data, dynamic OpenGraph images, auto-generated sitemap
- **GDPR Consent** - Privacy-first analytics with accept/reject banner
- **Accessibility** - Semantic HTML, ARIA attributes, keyboard navigation, `prefers-reduced-motion`

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Language | TypeScript 5 (strict), Python 3.11+ |
| Styling | Tailwind CSS 4 |
| Animations | Motion (Framer Motion) 12, GSAP 3 |
| Smooth Scroll | Lenis |
| Icons | Lucide React |
| Validation | Zod 4 |
| AI Agent | FastAPI, OpenAI, Ollama, OpenRouter, HuggingFace |
| Search | Tavily, DuckDuckGo |
| Email | Resend |
| CAPTCHA | Cloudflare Turnstile |
| Analytics | Google Analytics 4 |
| Translation | Google Translate |
| Fonts | Inter, IBM Plex Mono |
| Deployment | Vercel (frontend), Render (agent API) |

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

```bash
git clone https://github.com/your-username/port-folio-site.git
cd port-folio-site
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Contact form (Resend)
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=you@example.com
CONTACT_FROM_EMAIL=noreply@yourdomain.com

# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=...
TURNSTILE_SECRET_KEY=...
TURNSTILE_ALLOWED_HOSTNAMES=localhost

# Google Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# AI Portfolio Agent (optional)
PORTFOLIO_AGENT_URL=https://your-agent-url.com
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

## Project Structure

```
├── src/
│   ├── app/                # Next.js App Router pages and API routes
│   │   ├── page.tsx        # Home page
│   │   ├── work/           # Projects listing + dynamic case study pages
│   │   ├── about/          # Bio and experience timeline
│   │   ├── now/            # Current focus and active projects
│   │   ├── contact/        # Contact form with Turnstile
│   │   ├── privacy/        # Privacy policy
│   │   └── terms/          # Terms of service
│   ├── components/         # 26 React components
│   └── lib/                # Utilities (site config, projects, GitHub)
├── content/projects/       # 19 JSON case study files
├── public/                 # Static assets (brand logos, images)
└── src/components/portfolio-chat.css  # Chat widget styles
```

## API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/contact` | POST | Submit contact form (Turnstile + Zod + Resend) |
| `/api/github/contributions` | GET | Proxy GitHub contribution data (24h cache) |
| `/api/portfolio-agent/[...path]` | * | Reverse proxy to AI assistant service |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Companion Project

The AI chat assistant is powered by a separate FastAPI service:

| Repository | Description |
|------------|-------------|
| [paul-portfolio-agent](https://github.com/OchiengPaul442/paul-portfolio-agent) | FastAPI backend with multi-provider LLM support, SSE streaming, curated knowledge retrieval, web search, and anonymous rate limiting |

```bash
# Agent API (Python)
git clone https://github.com/OchiengPaul442/paul-portfolio-agent.git
cd paul-portfolio-agent
cp .env.example .env
uv sync --all-extras
uv run uvicorn app.main:app --reload
```

## License

This project is licensed under the [MIT License](./LICENSE).

---

<div align="built-with-love">

Built with **Next.js 16** + **React 19** + **Tailwind CSS 4**

</div>
