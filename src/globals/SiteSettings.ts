import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Site Settings',
  },
  fields: [
    // ── Header ──
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Header',
          fields: [
            {
              name: 'siteName',
              type: 'text',
              defaultValue: 'yourname',
            },
            {
              name: 'navLinks',
              type: 'array',
              defaultValue: [
                { label: 'About', href: '#about' },
                { label: 'Projects', href: '#projects' },
                { label: 'Contact', href: '#contact' },
              ],
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'href', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'Hero',
          fields: [
            {
              name: 'heroSubtitle',
              type: 'text',
              defaultValue: 'Personal Portfolio',
            },
            {
              name: 'heroTitle',
              type: 'text',
              defaultValue: 'Elegant digital experiences with timeless character.',
            },
            {
              name: 'heroDescription',
              type: 'textarea',
              defaultValue:
                'I build websites and digital products that feel polished, calm, and intentional—blending modern development with a refined visual sensibility.',
            },
            {
              name: 'heroPrimaryCta',
              type: 'text',
              defaultValue: 'View Projects',
            },
            {
              name: 'heroSecondaryCta',
              type: 'text',
              defaultValue: 'Download Resume',
            },
            {
              name: 'profileBadge',
              type: 'text',
              defaultValue: 'Verified Profile',
            },
            {
              name: 'availabilityBadge',
              type: 'text',
              defaultValue: 'Available Worldwide',
            },
            {
              name: 'location',
              type: 'text',
              defaultValue: 'Indonesia',
            },
            {
              name: 'focusAreas',
              type: 'array',
              defaultValue: [
                { name: 'Web Development' },
                { name: 'UI/UX Design' },
                { name: 'Portfolio Sites' },
                { name: 'Landing Pages' },
              ],
              fields: [{ name: 'name', type: 'text', required: true }],
            },
          ],
        },
        {
          label: 'Projects',
          fields: [
            {
              name: 'worksHeading',
              type: 'text',
              defaultValue:
                'A curated collection of digital work shaped with clarity and restraint.',
            },
          ],
        },
        {
          label: 'About',
          fields: [
            {
              name: 'aboutQuote',
              type: 'textarea',
              defaultValue:
                'Thoughtful design, measured details, and digital experiences that age gracefully.',
            },
            {
              name: 'aboutParagraphs',
              type: 'array',
              defaultValue: [
                {
                  text: 'I approach every project with equal attention to function and feeling. The goal is not only to make something work, but to make it feel effortless, refined, and quietly memorable.',
                },
                {
                  text: 'My style leans toward clean layouts, restrained motion, balanced typography, and a visual language that feels timeless rather than trendy.',
                },
              ],
              fields: [{ name: 'text', type: 'textarea', required: true }],
            },
          ],
        },
        {
          label: 'Contact',
          fields: [
            {
              name: 'contactHeading',
              type: 'text',
              defaultValue: "Let's build something with substance and style.",
            },
            {
              name: 'contactDescription',
              type: 'textarea',
              defaultValue:
                "Whether it's a personal portfolio, a product site, or a polished digital presence for your brand, I'm open to creating work that feels thoughtful and lasting.",
            },
            {
              name: 'email',
              type: 'text',
              defaultValue: 'your@email.com',
            },
            {
              name: 'linkedin',
              type: 'text',
              defaultValue: 'linkedin.com/in/yourname',
            },
            {
              name: 'github',
              type: 'text',
              defaultValue: 'github.com/yourname',
            },
            {
              name: 'contactLocation',
              type: 'text',
              defaultValue: 'Indonesia · Remote Friendly',
            },
          ],
        },
        {
          label: 'Footer',
          fields: [
            {
              name: 'copyrightName',
              type: 'text',
              defaultValue: 'Your Name',
            },
          ],
        },
      ],
    },
  ],
}
