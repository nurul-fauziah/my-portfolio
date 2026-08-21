import { NextResponse } from 'next/server'
import { fetchGithubRepoFromUrl } from '@/src/lib/github'

// Simple in-memory rate limiter — 10 requests per minute per IP
const RATE_LIMIT = 10
const WINDOW_MS = 60_000
const hits = new Map<string, { count: number; reset: number }>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const current = hits.get(ip)
  if (!current || now > current.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS })
    return false
  }
  current.count++
  return current.count > RATE_LIMIT
}

export async function GET(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
  }

  const { searchParams } = new URL(request.url)
  const repoUrl = searchParams.get('repo')

  if (!repoUrl) {
    return NextResponse.json({ error: 'Missing repo parameter' }, { status: 400 })
  }

  const data = await fetchGithubRepoFromUrl(repoUrl)
  if (!data) {
    return NextResponse.json({ error: 'Repo not found' }, { status: 404 })
  }

  return NextResponse.json(data)
}
