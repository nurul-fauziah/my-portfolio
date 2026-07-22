import { getPayload } from 'payload'
import config from '@payload-config'
import { AllProjects } from '../components/AllProjects'
import type { ProjectData } from '../lib/types'
import type { Project } from '../../../payload-types'

export const dynamic = 'force-dynamic'

export default async function ProjectsPage() {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'projects',
    sort: '-publishedAt',
    limit: 100,
  })

  const projects: ProjectData[] = result.docs.map((doc: Project) => ({
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
  }))

  return <AllProjects projects={projects} />
}
