import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { TeamMembers } from './collections/TeamMembers';
import { Services } from './collections/Services';
import { CaseStudies } from './collections/CaseStudies';
import { Testimonials } from './collections/Testimonials';
import { ProofStats } from './collections/ProofStats';
import { SiteSettings } from './collections/SiteSettings';
import { Media } from './collections/Media';

export default buildConfig({
  // Server URL — Payload admin panel on Railway
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',

  admin: {
    user: 'users',
  },

  // Rich text editor
  editor: lexicalEditor(),

  // PostgreSQL on Railway
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),

  // Collections
  collections: [
    {
      slug: 'users',
      auth: true,
      fields: [],
    },
    Media,
    TeamMembers,
    Services,
    CaseStudies,
    Testimonials,
    ProofStats,
  ],

  // Globals
  globals: [SiteSettings],

  // Secret for JWT
  secret: process.env.PAYLOAD_SECRET || 'CHANGE-ME-IN-PRODUCTION',

  typescript: {
    outputFile: './payload/payload-types.ts',
  },
});
