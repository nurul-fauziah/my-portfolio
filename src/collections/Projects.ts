import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'tag', 'featured', 'publishedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Tampilkan di homepage (maks 3-5 project)',
      },
    },
    {
      name: 'tag',
      type: 'text',
      defaultValue: 'Featured Case Study',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      editor: undefined, // will use global editor
      admin: {
        description: 'Detail content project (tampil di halaman detail)',
      },
    },
    {
      name: 'tech',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'gallery',
      type: 'array',
      admin: {
        description: 'Screenshot tambahan untuk halaman detail',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },
    {
      name: 'projectUrl',
      type: 'text',
      admin: {
        description: 'Link ke live project (opsional)',
      },
    },
    {
      name: 'githubUrl',
      type: 'text',
      admin: {
        description: 'Link ke GitHub repo (opsional)',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'Tanggal project dipublish',
      },
      defaultValue: () => new Date().toISOString(),
    },
  ],
}
