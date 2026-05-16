/**
 * Seed script — populates Payload CMS with real HGM content.
 * Run with: npx tsx payload/seed.ts
 * Requires DATABASE_URI and PAYLOAD_SECRET in environment.
 */

import payload from 'payload';
import config from './payload.config';

async function clearCollection(slug: string) {
  const existing = await (payload as any).find({ collection: slug, limit: 100 });
  for (const doc of existing.docs) {
    await (payload as any).delete({ collection: slug, id: doc.id });
  }
}

async function seed() {
  await payload.init({ config });
  console.log('🌱 Seeding HGM database...');

  // ── Site Settings ────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      firmName: 'Hidden Gem Marketing',
      tagline: 'Investment Promotion. Marketing. Redefined.',
      contactEmail: 'hello@hgmrktng.com',
      heroHeadline: 'Marketing that moves narratives.',
      heroSubheadline: 'We help Investment Promotion Agencies raise their profile, sharpen their brand, and attract the investors they deserve.',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/company/hgmarketing',
        twitter: '',
      },
    },
  });
  console.log('✓ Site settings');

  // ── Services ─────────────────────────────────────────────────
  await clearCollection('services');
  const services = [
    {
      title: 'Investment Potential Audit',
      description: "Develop a clear, evidence-based understanding of your destination's investment potential, market position, and current visibility.",
      displayOrder: 1,
    },
    {
      title: 'Narrative & Positioning',
      description: 'Transform insights into a clear, investor-centric narrative that positions your destination competitively in the global investment landscape.',
      displayOrder: 2,
    },
    {
      title: 'Communication Strategy',
      description: 'Design a structured system to attract, engage, and convert investors using the narrative and positioning defined earlier.',
      displayOrder: 3,
    },
    {
      title: 'Execution Blueprints',
      description: 'Provide clear, actionable instructions for implementation partners and internal teams.',
      displayOrder: 4,
    },
    {
      title: 'Guided Execution',
      description: 'Support implementation and ensure the strategy translates into measurable investor engagement.',
      displayOrder: 5,
    },
    {
      title: 'Access to Execution Partners',
      description: 'We connect you with global media platforms, design studios, and digital agencies aligned with your strategy from day one.',
      displayOrder: 6,
    },
  ];
  for (const s of services) await payload.create({ collection: 'services', data: s });
  console.log('✓ Services (6)');

  // ── Proof Stats ──────────────────────────────────────────────
  await clearCollection('proof-stats');
  const stats = [
    { label: 'Years inside investment promotion.', value: '10+', displayOrder: 1 },
    { label: 'Markets advised across four continents.', value: '15+', displayOrder: 2 },
    { label: 'Campaigns audited, briefs sharpened.', value: '100+', displayOrder: 3 },
    { label: 'Agency teams assessed end-to-end.', value: '50+', displayOrder: 4 },
  ];
  for (const s of stats) await payload.create({ collection: 'proof-stats', data: s });
  console.log('✓ Proof stats (4)');

  // ── Case Studies ─────────────────────────────────────────────
  await clearCollection('case-studies');
  const cases = [
    {
      title: 'Caucasus — Repositioning',
      client: 'National Investment Agency, Caucasus',
      region: 'Caucasus',
      challenge: 'A full brand and narrative reset, repositioning a multi-sector mandate around a single, ownable investor proposition.',
      approach: 'Comprehensive brand audit and stakeholder interviews developed a new investment narrative anchored in the country\'s competitive differentiators. Brief to launch in 4 months.',
      outcome: '+38% inbound leads year-on-year.',
      tags: ['strategy', 'audit'],
      status: 'published',
    },
    {
      title: 'MENA — Sector Campaign',
      client: 'Sub-National Promotion Authority, MENA',
      region: 'Middle East & North Africa',
      challenge: 'A sector-led demand campaign for tier-one logistics and manufacturing investors, supported by an always-on content engine.',
      approach: 'Targeted investor outreach campaign with precision messaging for logistics and manufacturing sectors across digital and conference channels.',
      outcome: '×3.2 qualified meetings. 11 weeks to first investor visit.',
      tags: ['strategy'],
      status: 'published',
    },
    {
      title: 'SE Europe — Capability Audit',
      client: 'Regional Development Agency, Southeast Europe',
      region: 'Southeast Europe',
      challenge: 'A diagnostic of marketing capability and reporting, followed by a 12-month plan to consolidate spend and sharpen attribution.',
      approach: 'Full marketing capability review across all channels and agency relationships, delivering a consolidated vendor strategy and new attribution model.',
      outcome: '−27% wasted spend. Consolidated from 7 agency partners to 2.',
      tags: ['audit'],
      status: 'published',
    },
    {
      title: 'LATAM — Always-On Partner',
      client: 'Cross-Border Investment Initiative, LATAM',
      region: 'Latin America',
      challenge: 'Retained senior partnership across strategy, content, and board reporting — covering five sectors and a quarterly investor newsletter.',
      approach: 'Ongoing strategic advisory covering sector-specific investor content, board-level reporting frameworks, and quarterly investor newsletter across five mandates.',
      outcome: '4 years continuous engagement. 8,000+ investor readership.',
      tags: ['strategy', 'agency-management'],
      status: 'published',
    },
  ];
  for (const c of cases) await payload.create({ collection: 'case-studies', data: c });
  console.log('✓ Case studies (4)');

  // ── Testimonials — clear placeholders ───────────────────────
  await clearCollection('testimonials');
  console.log('✓ Testimonials cleared (add real quotes via admin)');

  // ── Team Members ─────────────────────────────────────────────
  await clearCollection('team-members');
  await payload.create({
    collection: 'team-members',
    data: {
      name: 'Eko Chubinidze',
      role: 'Co-Founder — Brand Strategy & Communications',
      bio: "Eko is a brand strategy and communications professional with extensive experience at the intersection of investment, government, and strategic communications. She played a key role in the development and positioning of Galleria Tbilisi, one of Georgia's flagship investment projects, working within the Georgian Co-Investment Fund. As Client Service Director at Leavingstone — one of the most awarded creative and digital agencies in the region — she led complex, multi-stakeholder projects aligning strategy, creative execution, and measurable outcomes for both public and private sector clients.",
      linkedinUrl: '',
      displayOrder: 1,
    },
  });
  await payload.create({
    collection: 'team-members',
    data: {
      name: 'David Tavlalashvili',
      role: 'Co-Founder — Investment Strategy & FDI',
      bio: "David is an investment promotion professional with over a decade of hands-on experience at the intersection of FDI strategy, investor relations, and location marketing. The majority of his career was spent at Enterprise Georgia — Georgia's national investment promotion agency — where he rose to Head of Investment Department, leading investment attraction and aftercare strategy at the institutional level. At HGM, David leads client strategy and the investment narrative, grounding every engagement in the operational realities of FDI.",
      linkedinUrl: '',
      displayOrder: 2,
    },
  });
  console.log('✓ Team members (2) — add photos via admin');

  console.log('\n✅ Seed complete.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
