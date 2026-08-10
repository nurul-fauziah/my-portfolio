import { NextResponse } from 'next/server'
import { fetchGithubRepoFromUrl } from '@/src/lib/github'

export async function GET(request: Request) {
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
