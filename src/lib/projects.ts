import fs from 'fs';
import path from 'path';
import { cache } from 'react';

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
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
  featured: boolean;
  order: number;
}

const contentDir = path.join(process.cwd(), 'content', 'projects');

export const getAllProjects = cache((): Project[] => {
  try {
    const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.json'));
    const projects = files
      .map((file) => {
        try {
          const raw = fs.readFileSync(path.join(contentDir, file), 'utf-8');
          return JSON.parse(raw) as Project;
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
  return getAllProjects().filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}
