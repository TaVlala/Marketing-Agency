import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    description: 'Images and files. Uploads are stored on Cloudinary (configured via Railway env vars).',
  },
  access: { read: () => true },
  upload: {
    // Cloudinary handles resizing — no local resize needed
    imageSizes: [],
    adminThumbnail: 'thumbnail',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt Text',
      admin: { description: 'Describe the image for screen readers and SEO.' },
    },
  ],
};
