import { getPayload } from 'payload'
import config from '@payload-config'
import { ProjectDetail } from '../../components/ProjectDetail'
import type { ProjectData } from '../../lib/types'
import type { Project } from '../../../../payload-types'
import { notFound } from 'next/navigation'

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

  const project: ProjectData = {
    title: doc.title,
    slug: doc.slug,
    tag: doc.tag || 'Featured Case Study',
    description: doc.description,
    tech: (doc.tech || []).map((t) => t.name),
    image:
      doc.image && typeof doc.image === 'object' && 'url' in doc.image
        ? (doc.image.url as string)
        : undefined,
    projectUrl: doc.projectUrl || undefined,
    githubUrl: doc.githubUrl || undefined,
    featured: doc.featured || false,
    content: doc.content || undefined,
    gallery,
  }

  return <ProjectDetail project={project} />
}
