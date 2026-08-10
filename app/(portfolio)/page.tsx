import { getPayload } from 'payload'
import config from '@payload-config'
import PortfolioClient from './PortfolioClient'
import type { ProjectData } from './PortfolioClient'
import type { ThemeColors } from './lib/types'
import type { Project, Experience, SiteSetting } from '../../payload-types'
import { fetchGithubRepoFromUrl } from '@/src/lib/github'

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

  // Fetch GitHub data for projects with empty fields
  const projectsWithGithub = await Promise.all(
    projectsResult.docs.map(async (doc: Project) => {
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

  const experiences = experiencesResult.docs.map((doc: Experience) => ({
    period: doc.period,
    role: doc.role,
    company: doc.company,
    description: doc.description,
  }))

  const s = settings as SiteSetting

  // Resolve theme colors from CMS preset or custom values
  const preset = (s.themePreset || 'earthy') as string
  const custom = s.customColors || {}

  const presets: Record<string, { light: ThemeColors; dark: ThemeColors }> = {
    earthy: {
      light: { accent: '#81A6C6', accentLight: '#AACDDC', bgPrimary: '#F3E3D0', bgSecondary: '#F8F1E8', bgCard: '#F8F1E8', textPrimary: '#3E342C', textSecondary: '#6E6257', textMuted: '#8A7C70', border: '#D2C4B4' },
      dark: { accent: '#81A6C6', accentLight: '#5a8aad', bgPrimary: '#0f0f0f', bgSecondary: '#1a1a1a', bgCard: '#1e1e1e', textPrimary: '#e8e4e0', textSecondary: '#b0a89e', textMuted: '#7a7268', border: '#2a2a2a' },
    },
    ocean: {
      light: { accent: '#3B82F6', accentLight: '#93C5FD', bgPrimary: '#EFF6FF', bgSecondary: '#F8FAFC', bgCard: '#FFFFFF', textPrimary: '#1E3A5F', textSecondary: '#4B6A8D', textMuted: '#7A9BBD', border: '#BFDBFE' },
      dark: { accent: '#60A5FA', accentLight: '#3B82F6', bgPrimary: '#0c1929', bgSecondary: '#112240', bgCard: '#1A2F4A', textPrimary: '#e0e7ff', textSecondary: '#94A3B8', textMuted: '#64748B', border: '#1E3A5F' },
    },
    forest: {
      light: { accent: '#22C55E', accentLight: '#86EFAC', bgPrimary: '#F0FDF4', bgSecondary: '#F7FDF9', bgCard: '#FFFFFF', textPrimary: '#14532D', textSecondary: '#166534', textMuted: '#4ADE80', border: '#BBF7D0' },
      dark: { accent: '#4ADE80', accentLight: '#22C55E', bgPrimary: '#0a1a0f', bgSecondary: '#132E1A', bgCard: '#1A3D24', textPrimary: '#dcfce7', textSecondary: '#86EFAC', textMuted: '#4ADE80', border: '#166534' },
    },
    sunset: {
      light: { accent: '#F97316', accentLight: '#FDBA74', bgPrimary: '#FFF7ED', bgSecondary: '#FFFBF5', bgCard: '#FFFFFF', textPrimary: '#7C2D12', textSecondary: '#9A3412', textMuted: '#C2410C', border: '#FED7AA' },
      dark: { accent: '#FB923C', accentLight: '#F97316', bgPrimary: '#1a0f05', bgSecondary: '#2A1A0A', bgCard: '#3D2814', textPrimary: '#ffedd5', textSecondary: '#FDBA74', textMuted: '#FB923C', border: '#7C2D12' },
    },
  }

  const resolvedPreset = presets[preset] || presets.earthy
  const isCustom = preset === 'custom'

  function resolveLight(k: keyof ThemeColors, customKey?: string): string {
    if (isCustom && custom && customKey && custom[customKey as keyof typeof custom]) return custom[customKey as keyof typeof custom] as string
    return resolvedPreset.light[k]
  }
  function resolveDark(k: keyof ThemeColors, customKey?: string): string {
    const darkKey = customKey ? `${customKey}Dark` : undefined
    if (isCustom && custom && darkKey && custom[darkKey as keyof typeof custom]) return custom[darkKey as keyof typeof custom] as string
    return resolvedPreset.dark[k]
  }

  const theme = {
    light: {
      accent: resolveLight('accent', 'accent'),
      accentLight: resolveLight('accentLight', 'accent'),
      bgPrimary: resolveLight('bgPrimary', 'bgPrimaryLight'),
      bgSecondary: resolveLight('bgSecondary', 'bgSecondaryLight'),
      bgCard: resolveLight('bgCard', 'bgSecondaryLight'),
      textPrimary: resolveLight('textPrimary', 'textPrimaryLight'),
      textSecondary: resolveLight('textSecondary', 'textSecondaryLight'),
      textMuted: resolvedPreset.light.textMuted,
      border: resolvedPreset.light.border,
    },
    dark: {
      accent: resolveDark('accent', 'accent'),
      accentLight: resolveDark('accentLight', 'accent'),
      bgPrimary: resolveDark('bgPrimary', 'bgPrimaryDark'),
      bgSecondary: resolveDark('bgSecondary', 'bgSecondaryDark'),
      bgCard: resolveDark('bgCard', 'bgSecondaryDark'),
      textPrimary: resolveDark('textPrimary', 'textPrimaryDark'),
      textSecondary: resolveDark('textSecondary', 'textSecondaryDark'),
      textMuted: resolvedPreset.dark.textMuted,
      border: resolvedPreset.dark.border,
    },
  }

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
    cursorRevealImage:
      s.cursorRevealImage && typeof s.cursorRevealImage === 'object' && 'url' in s.cursorRevealImage
        ? (s.cursorRevealImage.url as string)
        : undefined,
    theme,
  }

  return (
    <PortfolioClient
      projects={projects}
      experiences={experiences}
      siteSettings={siteSettings}
    />
  )
}
