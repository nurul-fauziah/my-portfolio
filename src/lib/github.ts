export type GithubRepoData = {
  name: string
  description: string | null
  topics: string[]
  homepage: string | null
  html_url: string
  language: string | null
  techStack: string[]
}

// Map package names to friendly display names
const PACKAGE_TO_TECH: Record<string, string> = {
  // Frameworks
  next: 'Next.js',
  nuxt: 'Nuxt.js',
  gatsby: 'Gatsby',
  react: 'React',
  vue: 'Vue.js',
  svelte: 'Svelte',
  angular: 'Angular',
  express: 'Express',
  fastify: 'Fastify',
  nestjs: '@nestjs/core',
  '@nestjs/core': 'NestJS',
  koa: 'Koa',
  hapi: 'Hapi',
  remix: 'Remix',
  astro: 'Astro',
  vite: 'Vite',
  webpack: 'Webpack',
  tailwindcss: 'Tailwind CSS',
  '@tailwindcss/typography': 'Tailwind CSS',
  bootstrap: 'Bootstrap',
  'styled-components': 'Styled Components',
  'emotion/react': 'Emotion',
  '@emotion/react': 'Emotion',
  'framer-motion': 'Framer Motion',

  // UI Libraries
  'react-icons': 'React Icons',
  'react-hook-form': 'React Hook Form',
  zod: 'Zod',
  yup: 'Yup',
 formik: 'Formik',
  '@radix-ui/react-dialog': 'Radix UI',
  '@radix-ui/react-dropdown-menu': 'Radix UI',
  '@radix-ui/react-tabs': 'Radix UI',
  '@headlessui/react': 'Headless UI',
  'lucide-react': 'Lucide Icons',
  '@heroicons/react': 'Heroicons',

  // State Management
  zustand: 'Zustand',
  jotai: 'Jotai',
  recoil: 'Recoil',
  redux: 'Redux',
  '@reduxjs/toolkit': 'Redux Toolkit',
  mobx: 'MobX',

  // Database
  prisma: 'Prisma',
  '@prisma/client': 'Prisma',
  drizzle: 'Drizzle',
  'drizzle-orm': 'Drizzle ORM',
  sequelize: 'Sequelize',
  typeorm: 'TypeORM',
  mongoose: 'Mongoose',
  knex: 'Knex',
  kysely: 'Kysely',
  '@auth/core': 'Auth.js',
  nextauth: 'NextAuth.js',
  'next-auth': 'NextAuth.js',
  '@auth/nextjs': 'Auth.js',
  lucia: 'Lucia Auth',

  // Backend/Server
  graphql: 'GraphQL',
  '@apollo/client': 'Apollo',
  'socket.io': 'Socket.IO',
  'socket.io-client': 'Socket.IO',
  ws: 'WebSocket',
  trpc: 'tRPC',
  '@trpc/server': 'tRPC',
  '@trpc/client': 'tRPC',

  // Database Drivers
  pg: 'PostgreSQL',
  'pg-hstore': 'PostgreSQL',
  mysql2: 'MySQL',
  mysql: 'MySQL',
  'better-sqlite3': 'SQLite',
  sqlite3: 'SQLite',
  mongodb: 'MongoDB',
  '@elastic/elasticsearch': 'Elasticsearch',
  ioredis: 'Redis',
  'redis': 'Redis',
  '@upstash/redis': 'Upstash Redis',
  '@planetscale/database': 'PlanetScale',

  // Cloud/Infra
  '@aws-sdk/client-s3': 'AWS S3',
  '@aws-sdk/client-ses': 'AWS SES',
  '@aws-sdk/client-dynamodb': 'DynamoDB',
  '@vercel/blob': 'Vercel Blob',
  '@vercel/postgres': 'Vercel Postgres',
  '@vercel/edge-config': 'Edge Config',
  'node-pty': 'Terminal',
  sharp: 'Sharp',
  puppeteer: 'Puppeteer',
  playwright: 'Playwright',
  cypress: 'Cypress',
  jest: 'Jest',
  vitest: 'Vitest',
  mocha: 'Mocha',
  chai: 'Chai',
  eslint: 'ESLint',
  prettier: 'Prettier',
  typescript: 'TypeScript',

  // Payments
  stripe: 'Stripe',
  '@stripe/stripe-js': 'Stripe',
  '@stripe/react-stripe-js': 'Stripe',

  // CMS
  '@payloadcms/payload': 'PayloadCMS',
  '@payloadcms/db-postgres': 'PayloadCMS',
  sanity: 'Sanity',
  '@sanity/client': 'Sanity',
  contentful: 'Contentful',
  '@contentful/react-apps-richtext': 'Contentful',
  strapi: 'Strapi',
  '@strapi/strapi': 'Strapi',

  // Testing
  '@testing-library/react': 'Testing Library',
  '@testing-library/jest-dom': 'Testing Library',
  '@testing-library/user-event': 'Testing Library',

  // Utils
  axios: 'Axios',
  'node-fetch': 'Node Fetch',
  date: 'date-fns',
  'date-fns': 'date-fns',
  dayjs: 'Day.js',
  moment: 'Moment.js',
  lodash: 'Lodash',
  underscore: 'Underscore',
  uuid: 'UUID',
  nanoid: 'NanoID',
  bcryptjs: 'bcrypt',
  jsonwebtoken: 'JWT',
  ' jose': 'JWT',
}

/**
 * Parse GitHub URL to extract owner/repo.
 * Accepts: https://github.com/owner/repo, github.com/owner/repo, owner/repo
 */
export function parseGithubUrl(url: string): { owner: string; repo: string } | null {
  const cleaned = url.trim().replace(/\.git$/, '')

  // owner/repo format
  const directMatch = cleaned.match(/^([a-zA-Z0-9._-]+)\/([a-zA-Z0-9._-]+)$/)
  if (directMatch) {
    return { owner: directMatch[1], repo: directMatch[2] }
  }

  // URL format
  const urlMatch = cleaned.match(/github\.com\/([a-zA-Z0-9._-]+)\/([a-zA-Z0-9._-]+)/)
  if (urlMatch) {
    return { owner: urlMatch[1], repo: urlMatch[2] }
  }

  return null
}

function getGithubHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.mercy-preview+json',
  }
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }
  return headers
}

/**
 * Fetch package.json content from a repo
 */
async function fetchPackageJson(
  owner: string,
  repo: string,
  branch: string = 'main'
): Promise<Record<string, string> | null> {
  const headers = getGithubHeaders()
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/package.json?ref=${branch}`,
    { headers }
  )
  if (!res.ok) return null

  const data = await res.json()
  if (!data.content) return null

  try {
    const decoded = Buffer.from(data.content, 'base64').toString('utf-8')
    return JSON.parse(decoded)
  } catch {
    return null
  }
}

/**
 * Extract tech stack from package.json dependencies
 */
function extractTechFromPackageJson(pkg: Record<string, string> | null): string[] {
  if (!pkg) return []

  const allDeps = {
    ...pkg.dependencies,
    ...pkg.devDependencies,
  }

  const techSet = new Set<string>()

  for (const [pkgName] of Object.entries(allDeps)) {
    const friendlyName = PACKAGE_TO_TECH[pkgName]
    if (friendlyName) {
      techSet.add(friendlyName)
    }
  }

  return Array.from(techSet)
}

/**
 * Fetch repo data from GitHub API.
 * Uses GITHUB_TOKEN env var if available (5000 req/hr), otherwise unauthenticated (60 req/hr).
 */
export async function fetchGithubRepo(owner: string, repo: string): Promise<GithubRepoData | null> {
  const headers = getGithubHeaders()

  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers,
    next: { revalidate: 3600 },
  })

  if (!res.ok) return null

  const data = await res.json()

  // Fetch package.json in parallel
  const pkg = await fetchPackageJson(owner, repo, data.default_branch)

  // Merge tech from topics, language, and package.json
  const topicsTech = (data.topics || []).map((t: string) =>
    t.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  )
  const langTech = data.language ? [data.language] : []
  const pkgTech = extractTechFromPackageJson(pkg)

  // Dedupe: prioritize pkgTech (more specific) > topics > language
  const seen = new Set<string>()
  const techStack: string[] = []

  for (const tech of [...pkgTech, ...topicsTech, ...langTech]) {
    const lower = tech.toLowerCase()
    if (!seen.has(lower)) {
      seen.add(lower)
      techStack.push(tech)
    }
  }

  return {
    name: data.name,
    description: data.description,
    topics: data.topics || [],
    homepage: data.homepage,
    html_url: data.html_url,
    language: data.language,
    techStack,
  }
}

/**
 * Fetch repo data from URL string.
 */
export async function fetchGithubRepoFromUrl(url: string): Promise<GithubRepoData | null> {
  const parsed = parseGithubUrl(url)
  if (!parsed) return null
  return fetchGithubRepo(parsed.owner, parsed.repo)
}
