import type { CollectionConfig } from 'payload';

export const Submissions: CollectionConfig = {
  slug: 'submissions',
  labels: { singular: 'Form Submission', plural: 'Form Submissions' },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'organisation', 'service', 'createdAt'],
    description: 'Contact form submissions from the website.',
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => true,
    update: () => false,
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'organisation', type: 'text' },
    {
      name: 'service',
      type: 'text',
      label: 'Service Interest',
    },
    { name: 'message', type: 'textarea' },
  ],
};
