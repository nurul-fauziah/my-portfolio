import type { CollectionConfig } from 'payload'

export const Experiences: CollectionConfig = {
  slug: 'experiences',
  admin: {
    useAsTitle: 'role',
    defaultColumns: ['role', 'company', 'period', 'order'],
  },
  fields: [
    {
      name: 'period',
      type: 'text',
      required: true,
      admin: {
        description: 'Contoh: "2025 — Present"',
      },
    },
    {
      name: 'role',
      type: 'text',
      required: true,
    },
    {
      name: 'company',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Urutan tampil (angka lebih kecil = di atas)',
      },
    },
  ],
}
