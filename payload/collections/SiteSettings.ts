import type { GlobalConfig } from 'payload';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    description: 'Global site content: firm name, hero copy, contact details, and social links.',
  },
  access: { read: () => true },
  fields: [
    {
      name: 'firmName',
      type: 'text',
      required: true,
      defaultValue: 'IPA Marketing Agency',
      label: 'Firm Name',
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
      admin: { description: 'Short sentence shown in footer and meta descriptions.' },
    },
    {
      name: 'contactEmail',
      type: 'email',
      label: 'Contact Email',
      admin: { description: 'Shown in footer and contact page.' },
    },
    {
      name: 'heroHeadline',
      type: 'text',
      label: 'Hero Headline',
      admin: { description: 'Bold headline at top of home page.' },
    },
    {
      name: 'heroSubheadline',
      type: 'textarea',
      label: 'Hero Subheadline',
      admin: { description: 'One sentence below the main headline.' },
    },
    {
      name: 'socialLinks',
      type: 'group',
      label: 'Social Links',
      fields: [
        {
          name: 'linkedin',
          type: 'text',
          label: 'LinkedIn URL',
          admin: { placeholder: 'https://linkedin.com/company/...' },
        },
        {
          name: 'twitter',
          type: 'text',
          label: 'Twitter / X URL',
          admin: { placeholder: 'https://twitter.com/...' },
        },
      ],
    },
  ],
};
