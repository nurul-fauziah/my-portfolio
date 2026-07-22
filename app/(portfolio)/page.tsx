import { getPayload } from 'payload'
import config from '@payload-config'
import PortfolioClient from './PortfolioClient'
import type { ProjectData } from './PortfolioClient'
import type { Project, Experience, SiteSetting } from '../../payload-types'

export const dynamic = 'force-dynamic'

export default async function PortfolioPage() {
  const payload = await getPayload({ config })

  const [projectsResult, experiencesResult, settings] = await Promise.all([
    payload.find({
      collection: 'projects',
      where: { featured: { equals: true } },
      sort: '-publishedAt',
      limit: 5,
    }),
    payload.find({
      collection: 'experiences',
      sort: 'order',
      limit: 50,
    }),
    payload.findGlobal({
      slug: 'site-settings',
    }),
  ])

  const projects: ProjectData[] = projectsResult.docs.map((doc: Project) => ({
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

  const experiences = experiencesResult.docs.map((doc: Experience) => ({
    period: doc.period,
    role: doc.role,
    company: doc.company,
    description: doc.description,
  }))

  const s = settings as SiteSetting

  const siteSettings = {
    siteName: s.siteName || 'yourname',
    navLinks: (s.navLinks || []).map((l) => ({
      label: l.label,
      href: l.href,
    })),
    heroSubtitle: s.heroSubtitle || 'Personal Portfolio',
    heroTitle: s.heroTitle || 'Elegant digital experiences with timeless character.',
    heroDescription: s.heroDescription || '',
    heroPrimaryCta: s.heroPrimaryCta || 'View Projects',
    heroSecondaryCta: s.heroSecondaryCta || 'Download Resume',
    profileBadge: s.profileBadge || 'Verified Profile',
    availabilityBadge: s.availabilityBadge || 'Available Worldwide',
    location: s.location || 'Indonesia',
    focusAreas: (s.focusAreas || []).map((f) => f.name),
    aboutQuote: s.aboutQuote || '',
    aboutParagraphs: (s.aboutParagraphs || []).map((p) => p.text),
    contactHeading: s.contactHeading || '',
    contactDescription: s.contactDescription || '',
    email: s.email || '',
    linkedin: s.linkedin || '',
    github: s.github || '',
    contactLocation: s.contactLocation || '',
    copyrightName: s.copyrightName || 'Your Name',
    worksHeading: s.worksHeading || 'A curated collection of digital work shaped with clarity and restraint.',
  }

  return (
    <PortfolioClient
      projects={projects}
      experiences={experiences}
      siteSettings={siteSettings}
    />
  )
}
