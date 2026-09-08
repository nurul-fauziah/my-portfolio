import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

/**
 * Download a resume PDF as an attachment, regardless of where the media file
 * is hosted (local Payload file route or Vercel Blob). Returns a guaranteed
 * `application/pdf` response so the browser always saves a `.pdf`, never a
 * `.json`/error payload.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 })
  }

  const payload = await getPayload({ config })

  const media = await payload.findByID({ collection: 'media', id: Number(id) })
  if (!media?.url && !media?.filename) {
    return NextResponse.json({ error: 'Media not found' }, { status: 404 })
  }

  // Resolve the actual file URL: blob store gives an absolute https URL,
  // otherwise fall back to the Payload local file route.
  const fileUrl = media.url?.startsWith('http')
    ? media.url
    : `${request.nextUrl.origin}${media.url}`

  const res = await fetch(fileUrl)
  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch file' }, { status: 502 })
  }

  const arrayBuffer = await res.arrayBuffer()
  const filename =
    media.filename?.replace(/\.[^.]+$/, '') || `resume-${media.id}`

  return new NextResponse(arrayBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}.pdf"`,
      'Cache-Control': 'private, max-age=3600',
    },
  })
}