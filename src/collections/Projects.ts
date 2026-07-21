import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'tag', 'publishedAt'],
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
