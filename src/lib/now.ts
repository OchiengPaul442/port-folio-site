export interface NowProject {
  title: string;
  subtitle?: string;
  description: string;
  tags: string[];
  link?: { href: string; label: string };
}

export interface NowContent {
  lastUpdated: string;
  activeProjects: NowProject[];
  currentFocus: string[];
  openProblems: string[];
  homeNowLine: string;
}

export const nowContent: NowContent = {
  lastUpdated: "October 2026",
  activeProjects: [
    {
      title: "ATLAS - Aggregated Tracking & Live Analytics System",
      subtitle: "E-mobility data platform",
      description:
        "A data platform for Uganda\u2019s e-mobility sector.",
      tags: [
        "Next.js",
        "React",
        "Node.js",
        "PostgreSQL",
        "Docker",
      ],
    },
  ],
  currentFocus: [
    "Public-sector digital platforms: secure, accessible government systems",
    "Full-stack product craft: creating clear interfaces and dependable services that work well together",
    "Developer tooling: making everyday engineering workflows calmer, faster, and easier to understand",
    "Environmental data infrastructure: contributing to AirQo\u2019s platform and its community-facing products",
  ],
  openProblems: [
    "How to make sophisticated product experiences fast and trustworthy on constrained devices and connections",
    "Better ways to design resilient systems when a dependency, provider, or network connection fails",
    "Making complex data genuinely useful for non-technical community members",
    "Collecting and aggregating trustworthy data from organizations with very different digital maturity",
  ],
  homeNowLine:
    "Building ATLAS, an e-mobility data platform for Uganda",
};
