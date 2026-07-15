# Portfolio Master Spec — Paul Ochieng Levi

**Status:** Draft v2 — revised from original brief. This version cuts scope that
contradicted itself or outran available content, and adds a content-readiness
gate before any visual/build work starts. Every claim below is either (a)
verified from public sources, (b) drawn from prior confirmed work, or (c)
explicitly flagged `NEEDS PAUL`. Nothing in this document should be treated
as launch-ready copy — the case study drafts are structural placeholders,
not final copy, until Paul signs off on every fact in them.

---

## 1. Executive Summary

A fast, honest, technically credible portfolio for a Uganda-based software
engineer working across AI agents, environmental tech, and product
engineering. The site's only job is: **a recruiter or collaborator
understands what Paul can do and takes one action (contact, view a real
project, download résumé) within 10-15 seconds.** Every feature in this doc
is evaluated against that single bar. Features that don't clear it were cut,
regardless of how novel they sounded in the original brief.

The previous draft of this brief (30 sections, 12 files, WebGL hero, AI
chat assistant, voice navigation, knowledge graph) was scoped for a design
agency with a content team, not a solo engineer building with an AI coding
agent. This version is scoped for the latter.

---

## 2. Verified Research Findings

Confirmed via public search (2026-07-15):

- GitHub: `github.com/OchiengPaul442`, display name **Paul Ochieng Levi**
- Bio: *"Passionate Software Engineer dedicated to crafting high-performance
  applications... currentFocus: AI/ML, DevOps, Cloud Architecture"*
- Languages listed: TypeScript, Python, JavaScript, PHP
- Company affiliation: `@airqo-platform`
- Location: Uganda
- Ranked among the top public committers in Uganda on independent GitHub
  activity trackers (committers.top, top-github-users), with 2,500+ tracked
  public contributions — this is a genuinely verifiable, linkable stat and
  should be used instead of any invented "X commits" or "X projects shipped"
  claim
- A "Pulse" VS Code extension search returned no distinct public Marketplace
  listing for `OchiengPaul442/pulse` — **treat Pulse as pre-launch / not yet
  publicly discoverable**, not as a shipped product, until Paul confirms
  otherwise

**What is NOT publicly verifiable and must not be published without Paul's
explicit sign-off:**
- Any specific metric from AirQo internal analytics work (retention, traffic
  numbers) — this was delivered privately to a client's leadership and is
  not Paul's information to publish, regardless of how honestly it reflects
  his work. **This is a hard exclusion, not a content gap.**
- Employment dates, titles, client names, compensation, team size
- Any outcome/impact number for OnCall Drivers UG (unlaunched) or AERIS-AQ
  (not public-facing)

---

## 3. Professional Positioning

> Paul Ochieng Levi is a software engineer in Kampala, Uganda, building
> AI-powered tools, environmental-data platforms, and product infrastructure
> — with a specific focus on problems particular to African markets:
> low-bandwidth performance, multi-language support, and infrastructure that
> works where connectivity and hardware assumptions from the West don't hold.

Cut from the original positioning language: "future-resilient," "leading
into 2030," "premium." These are unfalsifiable adjectives that every
portfolio claims and that add zero information. Replace adjectives with
specifics wherever they appear in copy — a rule, not a suggestion.

---

## 4. Target Audiences & Success Bar

Same five real audiences as the original brief (recruiters, remote tech
companies, climate-tech orgs, founders seeking a technical collaborator,
fellow engineers). Cut: conference organizers, open-source maintainers as
primary targets — they're welcome visitors but designing pages specifically
for them is scope you don't need for v1.

**Success bar, unchanged and central:** every homepage section must pass the
test "does this help a recruiter decide to click contact within 15 seconds,"
or it gets cut or demoted below the fold.

---

## 5. Scope Decision — What's IN v1, What's OUT

This is the section the original brief didn't have, and needed most.

**IN (v1):**
- Home, Work index, up to 3 case studies (not 6 — see §8), About/Experience,
  a "Now" page, Contact, Résumé download
- One deliberate visual direction (not three explored territories)
- Cached, build-time GitHub activity display
- Command palette (cheap to build with `cmdk`, genuinely useful for a
  technical audience, doesn't block the primary path)
- Full WCAG 2.2 AA compliance — this is not negotiable regardless of scope
  cuts elsewhere
- One quantified performance budget, tested on throttled 3G

**OUT (v1) — and why:**
- **"Ask about Paul" AI assistant** — adds interrogation friction to a page
  whose whole point is speed-to-understanding; carries live fabrication risk
  on your own recruiting surface; cut entirely, not deferred
- **Voice navigation, personal knowledge graph** — no evidence any recruiter
  wants this; real engineering cost; cut entirely
- **WebGL / React Three Fiber hero** — directly contradicts your own "avoid
  random 3D objects" instruction; a strong typographic + real-project-screenshot
  hero will outperform it for this audience
- **Multi-language site content** — your audience for hiring is
  English-reading; localize later if there's a specific business reason
- **`/writing`, `/lab` routes** — only build these once there is actual
  content for them; empty "coming soon" sections read as unfinished, which
  is worse than not having the route
- **Storybook, dedicated visual regression suite, 6-browser test matrix** —
  disproportionate tooling overhead for a single maintainer; replaced with a
  lighter testing bar in §20
- **3-6 full case studies** — reduced to what current content can honestly
  support (§8)

If Paul disagrees with a specific cut, that's a real conversation to have —
but the default going into implementation is this reduced scope, because the
expanded scope was not achievable with current content and a solo builder.

---

## 6. Information Architecture

```
/
├── /about
├── /work
│   └── /work/[project-slug]
├── /now                    (NEW — replaces most of the "Lab" ambition)
├── /contact
├── /resume
├── /privacy
├── /sitemap.xml
├── /robots.txt
└── /opengraph-image
```

`/experience` folded into `/about` — a separate route for a timeline that's
maybe 4-5 entries long is an unnecessary page for the visitor to navigate
through.

---

## 7. Page Requirements

### Home
- Hero: name, role, one specific value line (no adjectives without
  evidence), location + remote availability, GitHub/LinkedIn/email, two
  CTAs (View Work, Résumé)
- Selected Work: the 2-3 case studies that currently have honest content
  (§8) — not padded to 6
- Capabilities grouped by problem solved (AI-enabled products, environmental
  data platforms, cloud/DevOps, frontend/product engineering) — technology
  names as supporting detail only, never a badge wall
- GitHub activity — cached, build-time, linked to the real profile
- Contact section

### /about
- Real bio (NEEDS PAUL: confirmed history)
- Timeline: roles/projects with dates (NEEDS PAUL)
- Engineering philosophy — short, in Paul's actual voice, not generated
  corporate copy

### /work and /work/[slug]
Case study template, reduced from 20 points to what's honestly fillable
pre-launch (full template and current drafts in §8).

### /now
New page. Shows what Paul is actively working on right now, in plain
language, including unresolved problems (e.g. "chasing a v0.0.92 regression
in Pulse — extension silently fails to activate under X condition").
Updated periodically. This is the site's actual differentiator: nobody
fakes an in-progress bug.

### /contact
Reasons to reach out (full-time roles, remote engineering, climate-tech
collaboration, consulting), contact form with server-side validation +
spam protection, direct email/LinkedIn.

### /resume
PDF download (NEEDS PAUL: actual résumé file) + on-page summary version for
crawlability.

---

## 8. Case Study Framework — Reality-Adjusted

Original 20-point template assumed shipped products with measured outcomes.
Replaced with a template that has an honest "not yet known" option instead
of forcing a claim:

```
1. What it is (one paragraph, plain language)
2. The problem it addresses
3. Paul's specific role and contribution
4. Architecture / technical approach
5. The hardest engineering decision or trade-off, and why it was made
6. Current status — options: shipped & live / in progress / pre-launch
7. Outcome — ONLY include if there is a verifiable, publishable number.
   Otherwise state "not yet launched" or "internal deployment, results
   not public" — do not fill this with vague language instead
8. What Paul would change if redoing it
9. Stack
10. Links: repo (if public), live product (if live) — no link, no claim
```

**Draft case studies for v1** (structural drafts only — every fact needs
Paul's confirmation before publish):

1. **AERIS-AQ** — an AI agent for air-quality analysis across African
   cities, built on LangGraph with a ReAct orchestrator, ChromaDB retrieval,
   and multi-provider LLM routing via LiteLLM. Strong architecture story;
   status: in development, not public-facing. Do not claim a launch or
   usage numbers.
2. **Pulse debugging case study** — framed honestly as a technical
   deep-dive: two structured audits, root-caused a real regression
   (`activate()` failures, wrong `activationEvents`, a session-restore race
   condition). This is a genuinely strong signal of engineering rigor and
   doesn't need inflated framing — root-causing your own regression *is*
   the impressive part.
3. **OnCall Drivers UG** — describe the product concept (driver-to-you
   service, distinct from ride-hailing) and the two-app architecture.
   Status: pre-launch. No metrics, no user numbers, no revenue claims.

**Explicitly excluded from public case studies:** the AirQo internal
analytics/CEO-presentation work. If Paul wants to reference AirQo experience
at all, it should be a one-line, non-metric mention ("contributed to
AirQo's website internationalization, supporting 40+ languages including
several African languages") — that's a real, non-confidential, technically
specific fact that stands on its own without touching anything private.

---

## 9. Content Gap Checklist — BLOCKING

Nothing past Phase 1 in the roadmap (§14) proceeds until these are resolved:

- [ ] Confirmed résumé / work history with real dates
- [ ] Sign-off on which of the 3 draft case studies (§8) can be published,
      and confirmation of every fact in them
- [ ] High-resolution portrait or decision to go photo-free
- [ ] Project screenshots for whichever case studies are approved
- [ ] Preferred contact channel and any availability statement
- [ ] Confirmation that the AirQo exclusion above (§8) is correct
- [ ] Decision on whether Pulse should be framed as "in progress" or held
      back entirely until the current regression is fixed

---

## 10. Visual Direction — One Decision, Not Three Territories

**Chosen direction: Technical Editorial.**
Dense information design borrowed from engineering documentation and data
journalism, not from design-agency portfolio templates. Monospace accents
for metadata (dates, stack, status), a restrained serif or high-quality
grotesk for headings, generous whitespace, real screenshots and architecture
diagrams treated as first-class content rather than decoration.

**Why this and not a "premium agency" look:** your audience — engineering
managers, technical recruiters, fellow engineers — is the audience most
allergic to gradient-hero, glassmorphism agency templates, and most
persuaded by a page that reads like good documentation. It's also
achievable solo without a designer.

**Rejected direction:** illustration-heavy "friendly African tech" look —
risks exactly the stereotyping your original brief correctly wanted to
avoid, and is harder to execute well without a dedicated illustrator.

---

## 11. Design System (Essentials Only)

- Colour: one accent, neutral-dominant palette, light + dark theme via CSS
  variables
- Type: two families max (one for headings/body, one monospace for
  metadata/code)
- Spacing: 8px base scale
- Components needed for v1: nav, hero, project card, case study layout,
  timeline, tag, button, form input, toast, command palette — cut modal,
  drawer, tooltip system unless a specific v1 page needs them

---

## 12. Motion System

One hero device, not five layered effects. Recommendation: a single
text-line reveal on load + restrained scroll-triggered fade/slide on section
entry. No parallax, no cursor-following, no card tilt for v1 — each is a
`prefers-reduced-motion` edge case and a mobile-performance cost for
marginal visual gain. Framer Motion is fine for what's left.

---

## 13. Accessibility — WCAG 2.2 AA, Non-Negotiable

Keyboard nav, visible focus states, skip link, semantic headings, accessible
forms with real error messages, sufficient contrast, `prefers-reduced-motion`
respected everywhere, no content gated behind animation alone. This list
doesn't shrink even though other sections did.

---

## 14. Performance Budget

Test on throttled Slow 3G / mid-range Android as a standing practice, not a
one-time check — this is the actual point of credibility for an engineer
positioning around African markets and low-bandwidth constraints. Targets:
LCP < 2.5s, CLS < 0.1, total JS < 150KB gzipped on the homepage, images
responsive + lazy-loaded, GitHub data fetched at build time only (never
client-side, avoids rate limits and a loading flash).

---

## 15. SEO

Metadata + Open Graph + canonical URL per route, Person + ProfilePage +
BreadcrumbList JSON-LD, sitemap, semantic heading structure. Target queries:
"Paul Ochieng Levi," "Software Engineer Uganda," "air quality software
engineer," "React Next.js developer Uganda." No keyword stuffing, no
CreativeWork schema for unlaunched projects (don't tell Google something
shipped when it hasn't).

---

## 16. Security & Privacy

Server-side contact form validation, rate limiting, spam protection (e.g. a
honeypot field + basic rate limit — skip a paid CAPTCHA service given the
zero-paid-dependency constraint), no secrets in client bundles, minimal
privacy-conscious analytics, clear privacy notice.

---

## 17. Analytics

Track: case study opened, case study completed, résumé downloaded, contact
form submitted, GitHub/LinkedIn link clicked, command palette used. Skip
vanity metrics (page views as a headline number, time-on-site) as anything
resembling a success measure.

---

## 18. Technical Stack

Next.js (App Router) + TypeScript strict + Tailwind + Framer Motion +
next/image + next Metadata API. MDX for case studies (simpler than a
headless CMS for a 2-3 case study v1). Zod for form validation. Deployment:
Vercel or a DigitalOcean-hosted static export, consistent with your existing
infra preference.

---

## 19. Testing — Right-Sized

Given this is a solo-maintained portfolio, not a product with users
depending on uptime: Playwright for a handful of critical-path smoke tests
(homepage loads, case study loads, contact form submits, nav works via
keyboard) plus `axe-playwright` for automated a11y checks on each route.
Skip Storybook and a dedicated visual regression suite for v1 — revisit only
if the site grows well past its current scope.

---

## 20. Implementation Roadmap — Gated

**Phase 1 — Content (BLOCKING GATE):**
Resolve the checklist in §9 completely. Do not proceed to Phase 2 until every
item is checked or explicitly deferred by Paul in writing.

**Phase 2 — Foundation:**
Project setup, design tokens, layout shell, SEO/meta foundation.

**Phase 3 — Core Build:**
Home, Work index, the 2-3 approved case studies, About, Now, Contact,
Résumé.

**Phase 4 — Polish:**
Motion (per §12, restrained), responsive pass, empty/error/loading states.

**Phase 5 — QA:**
Accessibility audit, performance audit against §14 budget on throttled
network, SEO/structured-data validation, broken-link check.

**Phase 6 — Ship:**
Deploy, submit to search engines, confirm analytics firing correctly.

---

## 21. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Publishing unverified/confidential info (esp. AirQo internals) | Hard exclusion in §8, enforced before any copy is written |
| Scope creep back toward the original feature list | This document is the reference; anything not in §5 "IN" needs a deliberate re-scoping conversation, not silent addition |
| Solo maintenance burden post-launch | Testing/tooling deliberately right-sized in §19 to match actual maintenance capacity |
| Case studies feel thin with only 2-3 entries | Depth over breadth — one well-told regression-debugging story beats three padded ones |

---

## 22. Definition of Done (v1)

- All §6 routes implemented, no "coming soon" pages
- Every fact on the site confirmed by Paul or removed
- AirQo internal-metrics exclusion respected
- WCAG 2.2 AA passes on `axe-playwright` for every route
- Performance budget (§14) met on throttled 3G
- SEO metadata + structured data validate
- Contact form works, is spam-protected, no secrets exposed
- Site does not contain any of the §5 "OUT" features
- Design reads as documentation-grade technical editorial, not template-grade agency gloss
