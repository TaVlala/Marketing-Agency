import type { CollectionConfig } from 'payload';

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'displayOrder'],
    description: 'The 4 service cards shown on the home page.',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
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
        description: 'Paste raw SVG markup here. Must start with <svg and include viewBox="0 0 24 24". Use currentColor for stroke/fill so hover colours work.',
      },
      validate: (value: string | null | undefined) => {
        if (!value) return true; // optional field — default icons are used when blank
        const trimmed = value.trim();
        if (!trimmed.startsWith('<svg')) {
          return 'Icon markup must be valid SVG starting with <svg';
        }
        if (!trimmed.includes('viewBox')) {
          return 'SVG must include a viewBox attribute (e.g. viewBox="0 0 24 24")';
        }
        return true;
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
