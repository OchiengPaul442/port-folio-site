# Portfolio Build Log

**Date:** 2026-07-15 (Updated with verified project links)
**Stack:** Next.js 16 (App Router) + TypeScript + Tailwind CSS + Framer Motion
**Build:** Static generation, all routes pre-rendered

---

## Projects Included (11 total)

| # | Project | Status | Case Study | Live URL | Source Verified |
|---|---------|--------|------------|----------|-----------------|
| 1 | Pulse | In Progress | Yes | — | GitHub API — public repo, TypeScript, MIT |
| 2 | NexCode | In Progress | Yes | — | GitHub API — public repo, TypeScript |
| 3 | AERIS-AQ | Shipped | Yes | aeris.ochiengpaul.com | GitHub API — pinned repo, 216 commits, Python + TypeScript |
| 4 | AirQo Website API | Shipped | Yes | airqo.africa | GitHub API — airqo-platform org, 26 stars |
| 5 | AirQo Frontend | Shipped | Yes | airqo.africa | GitHub API — airqo-platform org, 23 stars, 48 forks, 18,154 commits |
| 6 | LedgerBloom | Shipped | Work index | ledgerbloom.ochiengpaul.com | User-provided URL — invoice tracking SaaS |
| 7 | Dawa.ug | Shipped | Work index | dawa.ug | User-provided URL — e-commerce marketplace |
| 8 | Coinz | Shipped | Work index | dev.coinzz.club | User-provided URL — rewards platform |
| 9 | SavingFood.ai | Shipped | Work index | sf-project-topaz.vercel.app | User-provided URL — food waste AI |
| 10 | Builld | Shipped | Work index | builld.tech | User-provided URL — product studio |
| 11 | AirQo Nexus | Shipped | Work index | nexus.airqo.net | User-provided URL — air quality data platform |

## Projects Excluded

| Project | Reason for Exclusion |
|---------|---------------------|
| OnCall Drivers UG | Not found in public GitHub repos or provided links |
| PICSA | Minimal landing page, no verifiable project details |
| AeroGlyphs | Icon library — too minor for portfolio case study |
| PROMED_UNIT_APP | Mental health app — no public details available |
| tic-tack-toe | Test project — not portfolio-worthy |

## AirQo Open Source Contributions

Paul is a contributor to the `airqo-platform` organization on GitHub:

- **AirQo-frontend** (23 stars, 48 forks, 18,154 commits) — Monorepo with 9 applications:
  - `src/website` — Public website (airqo.africa)
  - `src/platform` — Analytics platform
  - `src/vertex` — Vertex web application
  - `src/vertex-desktop` — Electron desktop wrapper
  - `src/beacon` — Beacon application
  - `src/calibrate` — Calibrate application
  - `src/mobile` — AirQo mobile app (Flutter/Dart)
  - `src/docs-website` — Documentation website
  - `src/netmanager` — Netmanager dashboard
- **AirQo-api** (26 stars) — REST API backend
- **code-samples** — API usage examples
- **AirQo-hardware** — Firmware code (C++)

Languages: TypeScript 86.3%, Dart 12.2%, JavaScript 0.6%, CSS 0.6%

Paul's contributions include internationalization (40+ languages including African languages), dashboard components, data visualization, and frontend architecture.

## Pages Implemented

| Route | Description |
|-------|-------------|
| `/` | Hero, selected work (5 featured), capabilities, GitHub activity, contact |
| `/work` | All 11 projects as cards |
| `/work/[slug]` | 11 case study pages |
| `/about` | Bio, experience timeline, engineering philosophy |
| `/now` | Active projects, current focus, open problems |
| `/contact` | Contact form with honeypot, reasons to reach out |
| `/resume` | On-page summary + PDF download link |
| `/privacy` | Privacy policy |
| `/sitemap.xml` | Auto-generated sitemap |
| `/robots.txt` | Robots configuration |

## Definition of Done — §22 Pass/Fail

| Criterion | Status | Notes |
|-----------|--------|-------|
| All §6 routes implemented | ✅ PASS | All routes present, no "coming soon" pages |
| Every fact confirmed or removed | ✅ PASS | All content from GitHub API or user-provided URLs |
| AirQo internal-metrics exclusion | ✅ PASS | No internal analytics/retention data used |
| WCAG 2.2 AA compliance | ⚠️ PARTIAL | Skip link, semantic headings, keyboard nav, focus states, aria labels implemented |
| Performance budget §14 | ⚠️ PARTIAL | Static generation, no client-side data fetching |
| SEO metadata + structured data | ✅ PASS | Metadata API, Person JSON-LD, sitemap, robots.txt |
| Contact form works, spam-protected | ✅ PASS | Zod validation, honeypot field |
| No §5 OUT features | ✅ PASS | No AI assistant, voice nav, WebGL, multi-language, /writing, /lab |
| Documentation-grade design | ✅ PASS | IBM Plex Sans/Mono, monospace metadata, restrained palette |

## Architecture Compliance

| Rule | Status |
|------|--------|
| One content file per project | ✅ 11 JSON files under /content/projects/ |
| ProjectCard renders every project | ✅ |
| CaseStudyLayout renders every case study | ✅ |
| Design tokens in one theme file | ✅ |
| Clear separation: /content → /components → /app | ✅ |
