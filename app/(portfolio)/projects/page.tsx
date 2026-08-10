import { getPayload } from 'payload'
import config from '@payload-config'
import { AllProjects } from '../components/AllProjects'
import type { ProjectData } from '../lib/types'
import type { Project } from '../../../payload-types'
import { fetchGithubRepoFromUrl } from '@/src/lib/github'

export const dynamic = 'force-dynamic'

export default async function ProjectsPage() {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'projects',
    sort: '-publishedAt',
    limit: 100,
  })

  // Fetch GitHub data for projects with empty fields
  const projectsWithGithub = await Promise.all(
    result.docs.map(async (doc: Project) => {
      let githubData = null
      if (doc.githubUrl) {
        const hasEmptyFields = !doc.description || !(doc.tech?.length) || !doc.title
        if (hasEmptyFields) {
          githubData = await fetchGithubRepoFromUrl(doc.githubUrl)
        }
      }
      return { doc, githubData }
    })
  )

  const projects: ProjectData[] = projectsWithGithub.map(({ doc, githubData }) => ({
    title: doc.title || githubData?.name || 'Untitled Project',
    slug: doc.slug,
    tag: doc.tag || 'Featured Case Study',
    description: doc.description || githubData?.description || '',
    tech: doc.tech?.length
      ? doc.tech.map((t) => t.name)
      : githubData?.techStack || [],
    image:
      doc.image && typeof doc.image === 'object' && 'url' in doc.image
        ? (doc.image.url as string)
        : undefined,
    projectUrl: doc.projectUrl || githubData?.homepage || undefined,
    githubUrl: doc.githubUrl || undefined,
    featured: doc.featured || false,
  }))

  return <AllProjects projects={projects} />
}
