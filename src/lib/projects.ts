import fs from 'fs';
import path from 'path';
import { cache } from 'react';

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  client?: string;
  description: string;
  problem: string;
  role: string;
  approach: string;
  hardestDecision: string;
  status: string;
  outcome: string;
  whatIdChange: string;
  stack: string[];
  repo: string | null;
  liveUrl: string | null;
  image?: string;
  featured: boolean;
  order: number;
  category?: string;
  tags?: string[];
}

const projectTaxonomy: Record<string, { category: string; tags: string[] }> = {
  'aeris-aq': { category: 'Applied AI', tags: ['AI agents', 'Air quality', 'Data products'] },
  'airqo-icons-flutter': { category: 'Open source', tags: ['Flutter', 'Design systems', 'Accessibility'] },
  'airqo-npm-packages': { category: 'Open source', tags: ['TypeScript', 'SDKs', 'Developer tooling'] },
  'airqo-web-db': { category: 'Backend systems', tags: ['Django', 'REST APIs', 'Content platforms'] },
  'airqo-website': { category: 'Product engineering', tags: ['Next.js', 'Internationalization', 'Low-bandwidth UX'] },
  aqmrg: { category: 'Research platforms', tags: ['Next.js', 'Sanity CMS', 'Environmental research'] },
  builld: { category: 'Product studio', tags: ['Product strategy', 'Web development', 'Design systems'] },
  coinz: { category: 'Fintech & commerce', tags: ['Loyalty', 'Merchant tools', 'Real-time systems'] },
  'dawa-ug': { category: 'Marketplaces', tags: ['E-commerce', 'Mobile-first', 'Trust & safety'] },
  ledgerbloom: { category: 'SaaS products', tags: ['Invoicing', 'Payments', 'Small business tools'] },
  nexcode: { category: 'Developer tools', tags: ['VS Code', 'Multi-agent AI', 'Local-first software'] },
  'nexus-airqo': { category: 'Data platforms', tags: ['Data visualization', 'Maps', 'Environmental data'] },
  'pdf-viewer': { category: 'Productivity tools', tags: ['PDF editing', 'Canvas UX', 'Browser-native apps'] },
  'saving-food': { category: 'Applied machine learning', tags: ['Food systems', 'Prediction', 'Operations dashboards'] },
  sentsafrica: { category: 'Financial products', tags: ['Analytics', 'Data visualization', 'Responsive dashboards'] },
  sti: { category: 'Public-interest technology', tags: ['Government services', 'Innovation ecosystems', 'Accessibility'] },
  'tic-tack-toe': { category: 'Learning projects', tags: ['Java', 'Game logic', 'Algorithms'] },
  'paul-portfolio-agent': { category: 'Applied AI', tags: ['AI agents', 'FastAPI', 'LLM orchestration', 'Rate limiting'] },
  'oncallug-drivers': { category: 'Product engineering', tags: ['Next.js', 'Ride-hailing', 'Fintech', 'Maps'] },
  'picsa-app': { category: 'Open source', tags: ['Climate services', 'Agricultural extension', 'Mobile apps'] },
};

const contentDir = path.join(process.cwd(), 'content', 'projects');

// This is the editorial order for the work people should understand first.
// The full project archive remains available below it on the Work page.
export const FLAGSHIP_PROJECT_SLUGS = [
  'airqo-website',
  'nexus-airqo',
  'airqo-npm-packages',
  'airqo-icons-flutter',
  'picsa-app',
  'dawa-ug',
  'oncallug-drivers',
  'aqmrg',
  'sti',
  'builld',
  'coinz',
] as const;

export const getAllProjects = cache((): Project[] => {
  try {
    const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.json'));
    const projects = files
      .map((file) => {
        try {
          const raw = fs.readFileSync(path.join(contentDir, file), 'utf-8');
          const project = JSON.parse(raw) as Project;
          const taxonomy = projectTaxonomy[project.slug];
          return taxonomy ? { ...project, ...taxonomy } : project;
        } catch {
          console.warn(`Failed to parse project file: ${file}`);
          return null;
        }
      })
      .filter((p): p is Project => p !== null);
    return projects.sort((a, b) => a.order - b.order);
  } catch {
    return [];
  }
});

export function getFeaturedProjects(): Project[] {
  return getFlagshipProjects();
}

export function getFlagshipProjects(): Project[] {
  const projects = getAllProjects();
  return FLAGSHIP_PROJECT_SLUGS.map((slug) => projects.find((project) => project.slug === slug)).filter(
    (project): project is Project => Boolean(project),
  );
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}
