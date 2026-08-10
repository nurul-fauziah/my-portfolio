export type GithubRepoData = {
  name: string
  description: string | null
  topics: string[]
  homepage: string | null
  html_url: string
  language: string | null
}

/**
 * Parse GitHub URL to extract owner/repo.
 * Accepts: https://github.com/owner/repo, github.com/owner/repo, owner/repo
 */
export function parseGithubUrl(url: string): { owner: string; repo: string } | null {
  const cleaned = url.trim().replace(/\.git$/, '')

  // owner/repo format
  const directMatch = cleaned.match(/^([a-zA-Z0-9._-]+)\/([a-zA-Z0-9._-]+)$/)
  if (directMatch) {
    return { owner: directMatch[1], repo: directMatch[2] }
  }

  // URL format
  const urlMatch = cleaned.match(/github\.com\/([a-zA-Z0-9._-]+)\/([a-zA-Z0-9._-]+)/)
  if (urlMatch) {
    return { owner: urlMatch[1], repo: urlMatch[2] }
  }

  return null
}

/**
 * Fetch repo data from GitHub API.
 * Uses GITHUB_TOKEN env var if available (5000 req/hr), otherwise unauthenticated (60 req/hr).
 */
export async function fetchGithubRepo(owner: string, repo: string): Promise<GithubRepoData | null> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
  }

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers,
    next: { revalidate: 3600 },
  })

  if (!res.ok) return null

  const data = await res.json()

  return {
    name: data.name,
    description: data.description,
    topics: data.topics || [],
    homepage: data.homepage,
    html_url: data.html_url,
    language: data.language,
  }
}

/**
 * Fetch repo data from URL string.
 */
export async function fetchGithubRepoFromUrl(url: string): Promise<GithubRepoData | null> {
  const parsed = parseGithubUrl(url)
  if (!parsed) return null
  return fetchGithubRepo(parsed.owner, parsed.repo)
}
