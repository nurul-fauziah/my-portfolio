import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './src/collections/Users'
import { Media } from './src/collections/Media'
import { Projects } from './src/collections/Projects'
import { Experiences } from './src/collections/Experiences'
import { SiteSettings } from './src/globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// ── Vercel Blob connection diagnostic ──
// Logs whether the blob token is present and well-formed so upload issues
// (broken media links / `.json` downloads) are easy to spot at startup.
const blobToken = process.env.BLOB_READ_WRITE_TOKEN
const storeId = blobToken?.match(/^vercel_blob_rw_([a-z\d]+)_[a-z\d]+$/i)?.[1]?.toLowerCase()
if (!blobToken) {
  console.warn('[blob] BLOB_READ_WRITE_TOKEN is NOT set — media uploads will not be stored.')
} else if (!storeId) {
  console.warn('[blob] BLOB_READ_WRITE_TOKEN is malformed (expected vercel_blob_rw_<store>_<key>).')
} else {
  console.log(`[blob] connected: https://${storeId}.public.blob.vercel-storage.com`)
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Projects, Experiences],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || (() => {
    throw new Error('PAYLOAD_SECRET env var is required')
  })(),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
})
