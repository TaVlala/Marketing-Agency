import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'role'],
    description: 'Admin panel users. Email and password are managed by Payload auth.',
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => Boolean(user) && user?.role === 'admin',
    update: ({ req: { user }, id }) =>
      Boolean(user) && (user?.role === 'admin' || user?.id === id),
    delete: ({ req: { user } }) => Boolean(user) && user?.role === 'admin',
    admin: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Admin (full access, manages users)', value: 'admin' },
        { label: 'Editor (manages content only)', value: 'editor' },
      ],
      access: {
        update: ({ req: { user } }) => user?.role === 'admin',
      },
    },
  ],
};
