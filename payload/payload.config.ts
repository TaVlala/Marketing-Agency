import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { Users } from './collections/Users.ts';
import { TeamMembers } from './collections/TeamMembers.ts';
import { Services } from './collections/Services.ts';
import { CaseStudies } from './collections/CaseStudies.ts';
import { Testimonials } from './collections/Testimonials.ts';
import { ProofStats } from './collections/ProofStats.ts';
import { SiteSettings } from './collections/SiteSettings.ts';
import { Media } from './collections/Media.ts';

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
    Users,
    Media,
    TeamMembers,
    Services,
    CaseStudies,
    Testimonials,
    ProofStats,
  ],

  // Globals
  globals: [SiteSettings],

  // Secret for JWT — must be set in Railway environment variables
  // Generate with: openssl rand -hex 32
  secret: (() => {
    const s = process.env.PAYLOAD_SECRET;
    const isDefault = !s || s === 'CHANGE-ME-IN-PRODUCTION';
    if (isDefault && process.env.NODE_ENV === 'production') {
      throw new Error(
        '[Payload] PAYLOAD_SECRET env var is missing or still set to the default placeholder.\n' +
        'Generate a real secret with: openssl rand -hex 32\n' +
        'Then set it in your Railway service environment variables.'
      );
    }
    if (isDefault) {
      console.warn('[Payload] PAYLOAD_SECRET is not set — using insecure default. Set a real secret before deploying.');
    }
    return s ?? 'CHANGE-ME-IN-PRODUCTION';
  })(),

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
