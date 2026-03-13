import type { CollectionConfig } from 'payload';

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    { name: 'icon', type: 'textarea', label: 'SVG Icon Markup' },
    { name: 'displayOrder', type: 'number', defaultValue: 0 },
  ],
};
