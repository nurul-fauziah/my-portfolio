import { getPayload } from 'payload'
import config from '@payload-config'
import PortfolioClient from './PortfolioClient'
import type { ProjectData } from './PortfolioClient'
import type { Project } from '../../payload-types'

export const dynamic = 'force-dynamic'

export default async function PortfolioPage() {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'projects',
    sort: '-publishedAt',
    limit: 50,
  })

  const projects: ProjectData[] = result.docs.map((doc: Project) => ({
    title: doc.title,
    tag: doc.tag || 'Featured Case Study',
    description: doc.description,
    tech: (doc.tech || []).map((t) => t.name),
    image:
      doc.image && typeof doc.image === 'object' && 'url' in doc.image
        ? (doc.image.url as string)
        : undefined,
    projectUrl: doc.projectUrl || undefined,
    githubUrl: doc.githubUrl || undefined,
  }))

  return <PortfolioClient projects={projects} />
}
