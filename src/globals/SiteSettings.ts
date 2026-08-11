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
              defaultValue: 'nurul-fauziah',
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
            {
              name: 'cursorRevealImage',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Background image revealed by cursor movement (wavy reveal effect across all sections)' },
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
                'Blending design intuition with clean code — crafting web experiences that feel as good as they look.',
            },
            {
              name: 'aboutParagraphs',
              type: 'array',
              defaultValue: [
                {
                  text: "I'm a fresh graduate in Information Systems who found the sweet spot where design meets development. I love building web applications that aren't just functional, but genuinely enjoyable to use — from pixel-perfect interfaces to the code that powers them.",
                },
                {
                  text: "With hands-on experience in React, Laravel, and Tailwind CSS, I bring both the technical depth and design sensibility needed to create responsive, polished digital products. I'm also drawn to data analysis — finding patterns that inform better design decisions. Always looking for opportunities where I can build, learn, and make an impact.",
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
              defaultValue: 'nurulfauziahh204@gmail.com',
            },
            {
              name: 'linkedin',
              type: 'text',
              defaultValue: 'linkedin.com/in/nurul-fauziah',
            },
            {
              name: 'github',
              type: 'text',
              defaultValue: 'github.com/nurul-fauziah',
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
              defaultValue: 'Nurul Fauziah',
            },
          ],
        },
        {
          label: 'Theme',
          fields: [
            {
              name: 'themePreset',
              type: 'select',
              defaultValue: 'earthy',
              options: [
                { label: 'Earthy (Default)', value: 'earthy' },
                { label: 'Ocean', value: 'ocean' },
                { label: 'Forest', value: 'forest' },
                { label: 'Sunset', value: 'sunset' },
                { label: 'Custom', value: 'custom' },
              ],
            },
            {
              name: 'customColors',
              type: 'group',
              fields: [
                { name: 'accent', type: 'text', defaultValue: '#81A6C6', admin: { description: 'Accent color (hex)' } },
                { name: 'bgPrimaryLight', type: 'text', defaultValue: '#F3E3D0', admin: { description: 'Light mode background' } },
                { name: 'bgSecondaryLight', type: 'text', defaultValue: '#F8F1E8', admin: { description: 'Light mode secondary background' } },
                { name: 'textPrimaryLight', type: 'text', defaultValue: '#3E342C', admin: { description: 'Light mode primary text' } },
                { name: 'textSecondaryLight', type: 'text', defaultValue: '#6E6257', admin: { description: 'Light mode secondary text' } },
                { name: 'bgPrimaryDark', type: 'text', defaultValue: '#0f0f0f', admin: { description: 'Dark mode background' } },
                { name: 'bgSecondaryDark', type: 'text', defaultValue: '#1a1a1a', admin: { description: 'Dark mode secondary background' } },
                { name: 'textPrimaryDark', type: 'text', defaultValue: '#e8e4e0', admin: { description: 'Dark mode primary text' } },
                { name: 'textSecondaryDark', type: 'text', defaultValue: '#b0a89e', admin: { description: 'Dark mode secondary text' } },
              ],
            },
          ],
        },
      ],
    },
  ],
}
