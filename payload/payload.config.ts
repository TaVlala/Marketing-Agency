import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { TeamMembers } from './collections/TeamMembers.js';
import { Services } from './collections/Services.js';
import { CaseStudies } from './collections/CaseStudies.js';
import { Testimonials } from './collections/Testimonials.js';
import { ProofStats } from './collections/ProofStats.js';
import { SiteSettings } from './collections/SiteSettings.js';
import { Media } from './collections/Media.js';

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

  // Media files stored on Railway local disk (configure Railway persistent volume)
  // Decision: no official Payload 3 Cloudinary adapter exists.
  // The Next.js frontend Cloudinary loader handles image optimisation for display.
  // See PROGRESS.md for details.
  upload: {
    limits: {
      fileSize: 10_000_000, // 10MB max
    },
  },

  typescript: {
    outputFile: './payload/payload-types.ts',
  },
});
