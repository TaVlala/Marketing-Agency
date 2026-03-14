import type { CollectionConfig } from 'payload';

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'displayOrder'],
    description: 'Team member profiles shown on the About page.',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      label: 'Job Title / Role',
    },
    {
      name: 'bio',
      type: 'textarea',
      required: true,
      label: 'Short Bio',
      admin: { description: '3–4 sentences describing background and expertise.' },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Profile Photo',
    },
    {
      name: 'linkedinUrl',
      type: 'text',
      label: 'LinkedIn URL',
      admin: { placeholder: 'https://linkedin.com/in/...' },
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
