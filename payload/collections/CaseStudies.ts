import type { CollectionConfig } from 'payload';

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'client', 'status', 'tags'],
    description: 'Work / Results page entries. Set status to Published to make them visible.',
  },
  access: { read: () => true },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Short project name shown on cards. Can be anonymized.' },
    },
    {
      name: 'client',
      type: 'text',
      required: true,
      label: 'Client / Organization',
      admin: { description: 'e.g. "European Development Agency" — anonymized names are fine.' },
    },
    {
      name: 'region',
      type: 'text',
      label: 'Country or Region',
      admin: { placeholder: 'e.g. UK, Western Europe, Global' },
    },
    {
      name: 'challenge',
      type: 'textarea',
      required: true,
      label: 'The Challenge',
      admin: { description: '1–2 sentences on the problem faced.' },
    },
    {
      name: 'approach',
      type: 'textarea',
      required: true,
      label: 'What We Did',
      admin: { description: '2–3 sentences on the approach.' },
    },
    {
      name: 'outcome',
      type: 'textarea',
      required: true,
      label: 'Outcome / Result',
      admin: { description: '1 key stat or sentence — visually highlighted on the card.' },
    },
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
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: { description: 'Only Published entries appear on the website.' },
    },
  ],
};
