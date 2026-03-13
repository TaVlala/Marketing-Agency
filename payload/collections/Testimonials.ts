import type { CollectionConfig } from 'payload';

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'authorName',
    defaultColumns: ['authorName', 'organization', 'active'],
    description: 'Short client quotes shown on the home page. Toggle Active to show/hide.',
  },
  access: { read: () => true },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      label: 'Quote Text',
      admin: { description: 'Keep to 1–2 sentences for best display.' },
    },
    {
      name: 'authorName',
      type: 'text',
      required: true,
      label: 'Author Name',
    },
    {
      name: 'authorTitle',
      type: 'text',
      required: true,
      label: 'Author Job Title',
    },
    {
      name: 'organization',
      type: 'text',
      required: true,
      label: 'Organization',
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      label: 'Active (shown on site)',
    },
  ],
};
