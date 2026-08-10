import { getPayload } from 'payload'
import config from '@payload-config'
import { ProjectDetail } from '../../components/ProjectDetail'
import type { ProjectData } from '../../lib/types'
import type { Project } from '../../../../payload-types'
import { notFound } from 'next/navigation'
import { fetchGithubRepoFromUrl } from '@/src/lib/github'

export const dynamic = 'force-dynamic'

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  if (!result.docs.length) {
    notFound()
  }

  const doc = result.docs[0] as Project

  const gallery =
    (doc.gallery || []).map((item) => ({
      image:
        item.image && typeof item.image === 'object' && 'url' in item.image
          ? (item.image.url as string)
          : '',
      caption: item.caption || undefined,
    })) || []

  // GitHub fallback: fetch repo data if fields are empty
  let githubData = null
  if (doc.githubUrl) {
    const hasEmptyFields = !doc.description || !(doc.tech?.length) || !doc.title
    if (hasEmptyFields) {
      githubData = await fetchGithubRepoFromUrl(doc.githubUrl)
    }
  }

  const project: ProjectData = {
    title: doc.title || githubData?.name || 'Untitled Project',
    slug: doc.slug,
    tag: doc.tag || 'Featured Case Study',
    description: doc.description || githubData?.description || '',
    tech: doc.tech?.length
      ? doc.tech.map((t) => t.name)
      : githubData?.topics || [],
    image:
      doc.image && typeof doc.image === 'object' && 'url' in doc.image
        ? (doc.image.url as string)
        : undefined,
    projectUrl: doc.projectUrl || githubData?.homepage || undefined,
    githubUrl: doc.githubUrl || undefined,
    featured: doc.featured || false,
    content: doc.content || undefined,
    gallery,
  }

  return <ProjectDetail project={project} />
}
