import { getPayload } from 'payload'
import config from './payload.config'

async function seed() {
  const payload = await getPayload({ config })

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'nurul-fauziah',
      copyrightName: 'Nurul Fauziah',
      email: 'nurulfauziahh204@gmail.com',
      github: 'github.com/nurul-fauziah',
      linkedin: 'linkedin.com/in/nurul-fauziah',
      contactLocation: 'Kota Tangerang, Indonesia',
    },
  })

  console.log('✓ Site settings updated!')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
