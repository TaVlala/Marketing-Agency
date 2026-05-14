/**
 * REST API seed — populates live CMS with HGM content.
 *
 * Usage (PowerShell):
 *   $env:ADMIN_EMAIL="dtavlalashvili@hotmail.com"
 *   $env:ADMIN_PASSWORD="your-password-here"
 *   node seed-rest.mjs
 */

const BASE = 'https://web-production-addfa.up.railway.app';
const EMAIL = process.env.ADMIN_EMAIL || 'dtavlalashvili@hotmail.com';
const PASSWORD = process.env.ADMIN_PASSWORD;

if (!PASSWORD) {
  console.error('❌  Set ADMIN_PASSWORD env var before running.');
  process.exit(1);
}

// ── Helpers ───────────────────────────────────────────────────

async function login() {
  const res = await fetch(`${BASE}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  });
  const json = await res.json();
  if (!json.token) throw new Error(`Login failed: ${JSON.stringify(json)}`);
  console.log('✓ Logged in');
  return json.token;
}

async function clearCollection(token, slug) {
  const res = await fetch(`${BASE}/api/${slug}?limit=100`, {
    headers: { Authorization: `JWT ${token}` },
  });
  const { docs } = await res.json();
  for (const doc of docs) {
    await fetch(`${BASE}/api/${slug}/${doc.id}`, {
      method: 'DELETE',
      headers: { Authorization: `JWT ${token}` },
    });
  }
}

async function create(token, slug, data) {
  const res = await fetch(`${BASE}/api/${slug}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!json.doc && !json.id) throw new Error(`Create ${slug} failed: ${JSON.stringify(json)}`);
}

async function updateGlobal(token, slug, data) {
  const res = await fetch(`${BASE}/api/globals/${slug}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (res.status >= 400) throw new Error(`Update global ${slug} failed: ${JSON.stringify(json)}`);
}

// ── Seed ──────────────────────────────────────────────────────

async function seed() {
  const token = await login();

  // ── Site Settings ──────────────────────────────────────────
  await updateGlobal(token, 'site-settings', {
    firmName: 'Hidden Gem Marketing',
    tagline: 'Investment Promotion. Marketing. Redefined.',
    contactEmail: 'hello@hgmarketing.com',
    heroHeadline: 'Marketing that moves narratives.',
    heroSubheadline: 'We help Investment Promotion Agencies raise their profile, sharpen their brand, and attract the investors they deserve.',
    socialLinks: {
      linkedin: 'https://www.linkedin.com/company/hgmarketing',
      twitter: '',
    },
  });
  console.log('✓ Site settings');

  // ── Services ───────────────────────────────────────────────
  await clearCollection(token, 'services');
  const services = [
    { title: 'Investment Potential Audit', description: "Develop a clear, evidence-based understanding of your destination's investment potential, market position, and current visibility.", displayOrder: 1 },
    { title: 'Narrative & Positioning', description: 'Transform insights into a clear, investor-centric narrative that positions your destination competitively in the global investment landscape.', displayOrder: 2 },
    { title: 'Communication Strategy', description: 'Design a structured system to attract, engage, and convert investors using the narrative and positioning defined earlier.', displayOrder: 3 },
    { title: 'Execution Blueprints', description: 'Provide clear, actionable instructions for implementation partners and internal teams.', displayOrder: 4 },
    { title: 'Guided Execution', description: 'Support implementation and ensure the strategy translates into measurable investor engagement.', displayOrder: 5 },
    { title: 'Access to Execution Partners', description: 'We connect you with global media platforms, design studios, and digital agencies aligned with your strategy from day one.', displayOrder: 6 },
  ];
  for (const s of services) await create(token, 'services', s);
  console.log('✓ Services (6)');

  // ── Proof Stats ────────────────────────────────────────────
  await clearCollection(token, 'proof-stats');
  const stats = [
    { label: 'Years inside investment promotion.', value: '10+', displayOrder: 1 },
    { label: 'Markets advised across four continents.', value: '15+', displayOrder: 2 },
    { label: 'Campaigns audited, briefs sharpened.', value: '100+', displayOrder: 3 },
    { label: 'Agency teams assessed end-to-end.', value: '50+', displayOrder: 4 },
  ];
  for (const s of stats) await create(token, 'proof-stats', s);
  console.log('✓ Proof stats (4)');

  // ── Case Studies ───────────────────────────────────────────
  await clearCollection(token, 'case-studies');
  const cases = [
    {
      title: 'Caucasus — Repositioning',
      client: 'National Investment Agency, Caucasus',
      region: 'Caucasus',
      challenge: 'A full brand and narrative reset, repositioning a multi-sector mandate around a single, ownable investor proposition.',
      approach: "Comprehensive brand audit and stakeholder interviews developed a new investment narrative anchored in the country's competitive differentiators. Brief to launch in 4 months.",
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
  for (const c of cases) await create(token, 'case-studies', c);
  console.log('✓ Case studies (4)');

  // ── Testimonials — clear placeholders ─────────────────────
  await clearCollection(token, 'testimonials');
  console.log('✓ Testimonials cleared (add real quotes via admin)');

  // ── Team Members ───────────────────────────────────────────
  await clearCollection(token, 'team-members');
  await create(token, 'team-members', {
    name: 'Eko Chubinidze',
    role: 'Co-Founder — Brand Strategy & Communications',
    bio: "Eko is a brand strategy and communications professional with extensive experience at the intersection of investment, government, and strategic communications. She played a key role in the development and positioning of Galleria Tbilisi, one of Georgia's flagship investment projects, working within the Georgian Co-Investment Fund. As Client Service Director at Leavingstone — one of the most awarded creative and digital agencies in the region — she led complex, multi-stakeholder projects aligning strategy, creative execution, and measurable outcomes for both public and private sector clients.",
    linkedinUrl: '',
    displayOrder: 1,
  });
  await create(token, 'team-members', {
    name: 'David Tavlalashvili',
    role: 'Co-Founder — Investment Strategy & FDI',
    bio: "David is an investment promotion professional with over a decade of hands-on experience at the intersection of FDI strategy, investor relations, and location marketing. The majority of his career was spent at Enterprise Georgia — Georgia's national investment promotion agency — where he rose to Head of Investment Department, leading investment attraction and aftercare strategy at the institutional level. At HGM, David leads client strategy and the investment narrative, grounding every engagement in the operational realities of FDI.",
    linkedinUrl: '',
    displayOrder: 2,
  });
  console.log('✓ Team members (2) — add photos via admin');

  console.log('\n✅ Seed complete.');
}

seed().catch(err => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
