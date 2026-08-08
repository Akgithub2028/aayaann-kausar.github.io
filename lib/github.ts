import { GitHubUser, GitHubRepo, PinnedRepo, LanguageStat, GitHubStats, PortfolioData } from "./types";
import { LANGUAGE_COLORS } from "./constants";

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "Akgithub2028";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const headers: HeadersInit = {
  Accept: "application/vnd.github.v3+json",
  ...(GITHUB_TOKEN && { Authorization: `token ${GITHUB_TOKEN}` }),
};

export async function getUserProfile(username: string): Promise<GitHubUser> {
  const res = await fetch(`https://api.github.com/users/${username}`, {
    headers,
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Failed to fetch user profile: ${res.statusText}`);
  return res.json();
}

export async function getUserRepos(username: string): Promise<GitHubRepo[]> {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?sort=stars&per_page=100&type=owner`,
    {
      headers,
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) throw new Error(`Failed to fetch repos: ${res.statusText}`);
  const repos: GitHubRepo[] = await res.json();
  return repos.filter((r) => !r.archived).sort((a, b) => b.stargazers_count - a.stargazers_count);
}

export async function getPinnedRepos(username: string, fallbackRepos: GitHubRepo[]): Promise<PinnedRepo[]> {
  if (!GITHUB_TOKEN) {
    // Fallback to top 6 repos by stars
    return fallbackRepos.slice(0, 6).map((r) => ({
      name: r.name,
      description: r.description,
      url: r.html_url,
      stargazerCount: r.stargazers_count,
      forkCount: r.forks_count,
      primaryLanguage: r.language ? { name: r.language, color: LANGUAGE_COLORS[r.language] || "#ccc" } : null,
      repositoryTopics: { nodes: r.topics.slice(0, 5).map((t) => ({ topic: { name: t } })) },
      homepageUrl: r.homepage,
    }));
  }

  const query = `
    query {
      user(login: "${username}") {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              url
              stargazerCount
              forkCount
              primaryLanguage { name color }
              repositoryTopics(first: 5) {
                nodes { topic { name } }
              }
              homepageUrl
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers,
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 },
    });
    
    if (!res.ok) throw new Error("GraphQL fetch failed");
    
    const { data } = await res.json();
    return data.user.pinnedItems.nodes;
  } catch (error) {
    console.error("Error fetching pinned repos, falling back:", error);
    return fallbackRepos.slice(0, 6).map((r) => ({
      name: r.name,
      description: r.description,
      url: r.html_url,
      stargazerCount: r.stargazers_count,
      forkCount: r.forks_count,
      primaryLanguage: r.language ? { name: r.language, color: LANGUAGE_COLORS[r.language] || "#ccc" } : null,
      repositoryTopics: { nodes: r.topics.slice(0, 5).map((t) => ({ topic: { name: t } })) },
      homepageUrl: r.homepage,
    }));
  }
}

export function getLanguageStats(repos: GitHubRepo[]): LanguageStat[] {
  const counts: Record<string, number> = {};
  
  repos.forEach((repo) => {
    if (repo.language) {
      counts[repo.language] = (counts[repo.language] || 0) + 1;
    }
  });

  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return Object.entries(counts)
    .map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / total) * 100),
      color: LANGUAGE_COLORS[name] || "#00f5ff",
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
}

export function computeGitHubStats(user: GitHubUser, repos: GitHubRepo[]): GitHubStats {
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
  
  // Find top language
  const languageCounts: Record<string, number> = {};
  repos.forEach(repo => {
    if (repo.language) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
    }
  });
  const topLanguage = Object.keys(languageCounts).sort((a, b) => languageCounts[b] - languageCounts[a])[0] || "None";
  
  const accountAgeYears = (new Date().getTime() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24 * 365);
  
  return {
    totalStars,
    totalForks,
    totalRepos: user.public_repos,
    topLanguage,
    avgStarsPerRepo: repos.length ? Number((totalStars / repos.length).toFixed(1)) : 0,
    accountAge: Number(accountAgeYears.toFixed(1)),
    followers: user.followers,
  };
}

export async function getPortfolioData(): Promise<PortfolioData> {
  const user = await getUserProfile(GITHUB_USERNAME);
  const repos = await getUserRepos(GITHUB_USERNAME);
  const pinnedRepos = await getPinnedRepos(GITHUB_USERNAME, repos);
  
  return {
    user,
    repos,
    pinnedRepos,
    languageStats: getLanguageStats(repos),
    stats: computeGitHubStats(user, repos),
  };
}
