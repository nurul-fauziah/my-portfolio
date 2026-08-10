import { NextResponse } from 'next/server'
import { parseGithubUrl } from '@/src/lib/github'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const repoUrl = searchParams.get('repo')

  if (!repoUrl) {
    return NextResponse.json({ error: 'Missing repo parameter' }, { status: 400 })
  }

  const parsed = parseGithubUrl(repoUrl)
  if (!parsed) {
    return NextResponse.json({ error: 'Invalid GitHub URL' }, { status: 400 })
  }

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
  }

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  const res = await fetch(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}`, {
    headers,
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'Repo not found' }, { status: 404 })
  }

  const data = await res.json()

  return NextResponse.json({
    name: data.name,
    description: data.description,
    topics: data.topics || [],
    homepage: data.homepage,
    html_url: data.html_url,
    language: data.language,
  })
}
