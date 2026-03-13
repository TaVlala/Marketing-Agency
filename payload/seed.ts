/**
 * Seed script — populates Payload CMS with placeholder data.
 * Run with: npx tsx payload/seed.ts
 * Requires DATABASE_URI and PAYLOAD_SECRET in environment.
 */

import payload from 'payload';
import config from './payload.config';

async function seed() {
  await payload.init({ config });

  console.log('🌱 Seeding database...');

  // --- Site Settings ---
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      firmName: 'IPA Marketing Agency',
      tagline: 'Expert IPA marketing strategy, agency management, and best practice training.',
      contactEmail: 'hello@example.com', // TODO: replace
      heroHeadline: 'IPA marketing that actually works.',
      heroSubheadline: 'We help organisations navigate IPA frameworks, select the right agencies, and run campaigns that deliver measurable results.',
      socialLinks: {
        linkedin: 'https://linkedin.com/company/', // TODO: replace
        twitter: '',
      },
    },
  });
  console.log('✓ Site settings seeded');

  // --- Services ---
  const services = [
    {
      title: 'IPA Marketing Strategy',
      description: 'Develop IPA-aligned marketing strategies that connect objectives to measurable outcomes.',
      displayOrder: 1,
    },
    {
      title: 'Agency Selection & Management',
      description: 'Find the right agency partners and manage relationships for consistent performance.',
      displayOrder: 2,
    },
    {
      title: 'Campaign Audits & Reviews',
      description: 'Independent reviews of live or completed campaigns with actionable recommendations.',
      displayOrder: 3,
    },
    {
      title: 'Best Practice Training',
      description: 'Hands-on workshops bringing IPA best practices to your marketing team.',
      displayOrder: 4,
    },
  ];

  for (const s of services) {
    await payload.create({ collection: 'services', data: s });
  }
  console.log('✓ Services seeded');

  // --- Proof Stats ---
  const stats = [
    { label: 'Years in IPA', value: '10+', displayOrder: 1 },
    { label: 'Markets covered', value: '15+', displayOrder: 2 },
    { label: 'Campaigns audited', value: '100+', displayOrder: 3 },
  ];

  for (const s of stats) {
    await payload.create({ collection: 'proof-stats', data: s });
  }
  console.log('✓ Proof stats seeded');

  // --- Case Studies (placeholder, draft) ---
  await payload.create({
    collection: 'case-studies',
    data: {
      title: 'National Campaign Effectiveness Review',
      client: 'European Development Agency',
      region: 'Western Europe',
      challenge: 'The organisation had no consistent framework for evaluating campaign effectiveness across 12 regional offices.',
      approach: 'We conducted a full IPA-aligned audit across all active campaigns and introduced a unified measurement framework with shared KPIs.',
      outcome: '40% improvement in cross-regional campaign consistency within 6 months.',
      tags: ['audit', 'strategy'],
      status: 'published',
    },
  });

  await payload.create({
    collection: 'case-studies',
    data: {
      title: 'Agency Roster Rationalisation',
      client: 'UK Trade Body',
      region: 'UK',
      challenge: 'Fragmented agency relationships across 8 suppliers with no central oversight or performance tracking.',
      approach: 'Led a structured agency review process, consolidated to 3 preferred partners, and introduced quarterly performance reviews.',
      outcome: 'Reduced agency spend by 22% while improving output quality scores.',
      tags: ['agency-management', 'strategy'],
      status: 'published',
    },
  });
  console.log('✓ Case studies seeded');

  // --- Testimonial (placeholder) ---
  await payload.create({
    collection: 'testimonials',
    data: {
      quote: 'The IPA audit transformed how we think about campaign measurement. Genuinely practical, not just theoretical.',
      authorName: 'Jane Smith', // TODO: replace
      authorTitle: 'Marketing Director',
      organization: 'Example Organisation', // TODO: replace
      active: true,
    },
  });
  console.log('✓ Testimonial seeded');

  // --- Team Member (placeholder) ---
  await payload.create({
    collection: 'team-members',
    data: {
      name: 'Alex Johnson', // TODO: replace
      role: 'Founder & IPA Specialist',
      bio: 'Alex has 10+ years of experience in IPA marketing frameworks. Previously led campaigns across 15 European markets. Passionate about bringing measurement rigour to every brief.', // TODO: replace
      displayOrder: 1,
    },
  });
  console.log('✓ Team member seeded');

  console.log('\n✅ Seed complete.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
