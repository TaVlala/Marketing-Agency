import type { CollectionConfig } from 'payload';

export const ProofStats: CollectionConfig = {
  slug: 'proof-stats',
  admin: {
    useAsTitle: 'label',
  },
  fields: [
    { name: 'label', type: 'text', required: true },
    { name: 'value', type: 'text', required: true },
    { name: 'displayOrder', type: 'number', defaultValue: 0 },
  ],
};
