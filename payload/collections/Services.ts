import type { CollectionConfig } from 'payload';

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'displayOrder'],
    description: 'The 4 service cards shown on the home page.',
  },
  access: { read: () => true },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: { description: '2 lines max — keep it punchy.' },
    },
    {
      name: 'icon',
      type: 'textarea',
      label: 'SVG Icon Markup',
      admin: {
        description: 'Paste raw SVG markup here. Use viewBox="0 0 24 24" and currentColor for stroke/fill.',
      },
    },
    {
      name: 'displayOrder',
      type: 'number',
      defaultValue: 0,
      label: 'Display Order',
      admin: { description: 'Lower numbers appear first.' },
    },
  ],
};
