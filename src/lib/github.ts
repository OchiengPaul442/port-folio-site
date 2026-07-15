export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  homepage: string | null;
  topics: string[];
  fork: boolean;
}

export interface GitHubProfile {
  login: string;
  name: string;
  bio: string | null;
  location: string | null;
  html_url: string;
  public_repos: number;
  followers: number;
}

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      'https://api.github.com/users/OchiengPaul442/repos?per_page=30&sort=updated&type=owner',
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return [];
    const repos = await res.json();
    return repos.filter((r: GitHubRepo) => !r.fork);
  } catch {
    return [];
  }
}

export async function getGitHubProfile(): Promise<GitHubProfile | null> {
  try {
    const res = await fetch('https://api.github.com/users/OchiengPaul442', {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
