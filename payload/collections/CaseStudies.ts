import type { CollectionConfig } from 'payload';

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'client', type: 'text', required: true },
    { name: 'region', type: 'text' },
    { name: 'challenge', type: 'textarea', required: true },
    { name: 'approach', type: 'textarea', required: true },
    { name: 'outcome', type: 'textarea', required: true },
    {
      name: 'tags',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Strategy', value: 'strategy' },
        { label: 'Audit', value: 'audit' },
        { label: 'Training', value: 'training' },
        { label: 'Agency Management', value: 'agency-management' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
  ],
};
