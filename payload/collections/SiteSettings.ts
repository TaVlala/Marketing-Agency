import type { GlobalConfig } from 'payload';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  fields: [
    { name: 'firmName', type: 'text', defaultValue: 'IPA Marketing Agency' },
    { name: 'tagline', type: 'text' },
    { name: 'contactEmail', type: 'email' },
    { name: 'heroHeadline', type: 'text' },
    { name: 'heroSubheadline', type: 'textarea' },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        { name: 'linkedin', type: 'text' },
        { name: 'twitter', type: 'text' },
      ],
    },
  ],
};
