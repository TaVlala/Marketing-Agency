import type { CollectionConfig } from 'payload';

export const ProofStats: CollectionConfig = {
  slug: 'proof-stats',
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'value', 'displayOrder'],
    description: 'Stat callouts shown in the social proof strip (e.g. "10+ years in IPA").',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      label: 'Label',
      admin: { placeholder: 'e.g. Years in IPA' },
    },
    {
      name: 'value',
      type: 'text',
      required: true,
      label: 'Value',
      admin: { placeholder: 'e.g. 10+' },
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
