# IPA Marketing Agency — Launch Checklist

> **Audience**: Junior developer deploying the site for the first time or handing it over to a client.
> **Complete every item in order.** Each section depends on the one before it.
>
> Stack: Next.js 15 static export → Hostinger (FTP via GitHub Actions) | Payload CMS 3 → Railway + PostgreSQL | Cloudinary (display CDN) | Formspree (contact) | Mailchimp JSONP (newsletter) | Plausible (analytics)
>
> Repo: https://github.com/TaVlala/Marketing-Agency.git (branch: `master`)

---

## 1. External Accounts

Set these up before anything else. You will need the credentials and URLs from each service in later steps.

- [ ] **Cloudinary** — Create account at https://cloudinary.com. Free tier is sufficient.
  - After sign-up, open the dashboard. Your **Cloud Name** is shown in the top-left card (e.g. `my-cloud-name`). Write it down.
- [ ] **Formspree** — Create account at https://formspree.io.
  - Click **+ New Form**, give it a name (e.g. `IPA Contact`), and choose your notification email.
  - Copy the full endpoint URL shown — format: `https://formspree.io/f/XXXXXXXX`. This is your `NEXT_PUBLIC_FORMSPREE_ENDPOINT`.
- [ ] **Mailchimp** — Create account at https://mailchimp.com.
  - Create an **Audience** (Audience → Manage Audience → Create Audience).
  - Go to Audience → Signup forms → **Embedded forms**.
  - Scroll to the form `action` URL in the generated code. It will look like:
    ```
    https://yourorg.us1.list-manage.com/subscribe/post?u=XXXX&id=YYYY
    ```
  - Modify it: change `/post` to `/post-json` and append `&c=mailchimpCallback`:
    ```
    https://yourorg.us1.list-manage.com/subscribe/post-json?u=XXXX&id=YYYY&c=mailchimpCallback
    ```
  - This modified URL is your `NEXT_PUBLIC_MAILCHIMP_URL`.
- [ ] **Plausible** — Create account at https://plausible.io.
  - Click **+ Add website**. Enter the production domain exactly as it will be live (e.g. `ipamarketing.co.uk` — no `https://`, no trailing slash).
  - Note the domain string — it must match exactly what you set in `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`.
- [ ] **Railway** — Create account at https://railway.app. You will use this in Section 2.

---

## 2. Railway — Payload CMS Deployment

- [ ] Log in to Railway → click **New Project**.
- [ ] Click **+ Add a Service** → **Database** → **PostgreSQL**.
  - Railway automatically creates a `DATABASE_URL` variable on this plugin. You will copy it in the next step.
- [ ] Click **+ Add a Service** again → **GitHub Repo**.
  - Authorise Railway to access your GitHub if prompted.
  - Select the repo `TaVlala/Marketing-Agency`.
  - Under **Root Directory**, enter `payload/` — this scopes the build to the Payload subdirectory only.
- [ ] Open the new service → **Variables** tab → add each variable below.
  - To get `DATABASE_URI`: click the PostgreSQL plugin → **Connect** tab → copy the `DATABASE_URL` value.

  | Variable | Value |
  |---|---|
  | `DATABASE_URI` | Paste the `DATABASE_URL` from the PostgreSQL plugin |
  | `PAYLOAD_SECRET` | Generate a strong secret: run `openssl rand -base64 32` in your terminal |
  | `PAYLOAD_PUBLIC_SERVER_URL` | `https://<your-service-name>.railway.app` (visible in Railway service Settings → Domains) |

  Optional (only needed if you upload files directly through Payload and store them on Cloudinary):

  | Variable | Value |
  |---|---|
  | `CLOUDINARY_API_KEY` | From Cloudinary dashboard → Settings → API Keys |
  | `CLOUDINARY_API_SECRET` | From Cloudinary dashboard → Settings → API Keys |

- [ ] Open the service → **Settings** tab → **Deploy** section.
  - Confirm the **Start Command** is `npm run start` (or `npx payload serve`). Check `payload/package.json` to see what the `start` script runs — it should invoke `payload serve`.
- [ ] Click **Deploy** (Railway may auto-deploy on the first save). Watch the build log.
  - Build typically takes 2–4 minutes. Expect a successful exit with `Payload CMS is running`.
- [ ] Once deployed, open the public URL: `https://<your-service-name>.railway.app/admin`.
- [ ] Payload will show a **Create First User** screen on the very first visit. Fill in:
  - Email (use the client's admin email or a shared inbox)
  - Password (strong — at least 16 characters)
  - Click **Create**. Store these credentials in a password manager.
- [ ] Verify the admin panel loads and the left sidebar shows all expected collections:
  - Services
  - Team Members
  - Case Studies
  - Testimonials
  - Proof Stats
  - Media
  - Globals: **Site Settings**

---

## 3. First Content Entry in Payload Admin

Fill in real content before the first frontend deploy so the static build fetches live data (not empty responses).

- [ ] Click **Site Settings** (under Globals in the sidebar) → fill in:
  - **Firm Name**: `IPA Marketing Agency`
  - **Hero Headline**: e.g. `Strategy-led marketing for ambitious IPA members`
  - **Hero Subheadline**: one sentence describing the value proposition
  - **Contact Email**: the client's primary contact address
  - **LinkedIn URL**: the agency's LinkedIn profile URL
  - **Twitter / X URL**: the agency's Twitter/X profile URL
  - Click **Save**.
- [ ] Go to **Proof Stats** → click **Create New** for each stat. Create at least 3–4 entries, for example:
  - Value: `10+` / Label: `Years in IPA` / Display Order: `1`
  - Value: `60+` / Label: `Clients served` / Display Order: `2`
  - Value: `£2M+` / Label: `Revenue generated` / Display Order: `3`
  - Set `displayOrder` on each so they appear in the correct sequence.
- [ ] Go to **Services** → create at least 4 services:
  - Fields: Name, Short Description, Icon Name (Lucide icon string, e.g. `megaphone`), Display Order.
  - Click **Save** after each.
- [ ] Go to **Case Studies** → create 2–3 entries:
  - Fields: Title, Client name, Outcome text, Tags (comma-separated), Status = `published`.
  - Unpublished entries will not appear on the frontend.
- [ ] Go to **Testimonials** → create 2–3 quotes:
  - Fields: Quote text, Author name, Author title/company, Active = `true`.
  - Only entries with Active = `true` are displayed.
- [ ] Go to **Media** → upload headshots and case study images before creating Team Member entries.
- [ ] Go to **Team Members** → create entries for the team:
  - Fields: Name, Role, Bio, Photo (select from Media), Display Order.
- [ ] Confirm the Railway CMS URL is in the format `https://<your-service-name>.railway.app`. You will need this in Section 6.

---

## 4. Cloudinary — Upload Production Images

The frontend uses Cloudinary as a **display-side CDN loader only** — images are referenced by public ID in your Next.js code or CMS content, not uploaded via a Payload plugin.

- [ ] Log in to https://cloudinary.com → open the **Media Library**.
- [ ] Upload any images that are referenced in the site that are not managed through the Payload Media collection (e.g. hero background, logo, OG image).
- [ ] Note each image's **Public ID** (shown in the Media Library detail panel) so you can reference them correctly in the codebase.
- [ ] Confirm your **Cloud Name** from the dashboard top-left. This is your `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`.

---

## 5. Hostinger — FTP Credentials

- [ ] Log in to Hostinger hPanel at https://hpanel.hostinger.com.
- [ ] Go to **Hosting** → select your hosting plan → click **Manage**.
- [ ] In the left sidebar, go to **Files** → **FTP Accounts**.
- [ ] Note the existing FTP credentials, or click **Create FTP Account** if none exists:
  - **FTP Hostname**: shown in the FTP Accounts panel (e.g. `ftp.ipamarketing.co.uk` or the server IP)
  - **FTP Username**: typically your cPanel/hPanel username or the FTP account username
  - **FTP Password**: the password you set (or reset it now and note it)
- [ ] The deploy target directory is `/public_html/`. The GitHub Action uses `dangerous-clean-slate: false`, so existing files (e.g. a `.htaccess`) are preserved between deploys — only new/changed files are uploaded.
- [ ] Keep these three values ready for Section 6: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`.

---

## 6. GitHub Repository — Secrets

All environment variables are injected at build time via GitHub Actions secrets. You must add all 9 secrets before running the first deploy.

Open: https://github.com/TaVlala/Marketing-Agency/settings/secrets/actions

Click **New repository secret** for each row below:

| Secret Name | Value | Where to find it |
|---|---|---|
| `PAYLOAD_URL` | `https://<your-service-name>.railway.app` | Railway service URL (Section 2) |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name | Cloudinary dashboard top-left (Section 4) |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | e.g. `ipamarketing.co.uk` | Exactly as registered in Plausible (Section 1) |
| `NEXT_PUBLIC_MAILCHIMP_URL` | The `/post-json?...&c=mailchimpCallback` URL | Mailchimp embedded form (Section 1) |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | `https://formspree.io/f/XXXXXXXX` | Formspree form dashboard (Section 1) |
| `NEXT_PUBLIC_SITE_URL` | `https://ipamarketing.co.uk` | Your production domain (with `https://`) |
| `FTP_SERVER` | Hostinger FTP hostname | Hostinger FTP Accounts panel (Section 5) |
| `FTP_USERNAME` | Hostinger FTP username | Hostinger FTP Accounts panel (Section 5) |
| `FTP_PASSWORD` | Hostinger FTP password | Hostinger FTP Accounts panel (Section 5) |

- [ ] All 9 secrets are saved. Double-check for trailing spaces — GitHub Secrets can hide them.
- [ ] Tip: after saving each secret, its name appears in the list but the value is masked. If you need to correct a value, click the secret name → **Update**.

---

## 7. DNS Configuration (Hostinger)

- [ ] Log in to Hostinger hPanel → **Domains** → click your domain → **DNS / Nameservers**.
- [ ] If the domain is registered with Hostinger, DNS is already pointed correctly — skip to the SSL step.
- [ ] If the domain is registered elsewhere (e.g. GoDaddy, Namecheap), update the nameservers at your registrar to Hostinger's nameservers. These are shown in hPanel under **Nameservers** (e.g. `ns1.dns-parking.com`, `ns2.dns-parking.com`).
- [ ] Once nameservers are set, confirm the **A record** points to Hostinger's shared hosting IP (shown in hPanel → DNS Zone Editor).
- [ ] Enable HTTPS: in hPanel → **SSL** → **SSL/TLS** → click **Install** next to the free Let's Encrypt certificate for your domain.
  - If the button is greyed out, DNS has not propagated yet — wait and try again.
- [ ] Check DNS propagation status at https://dnschecker.org — search your domain for the `A` record. Propagation can take up to 48 hours but is usually under 1 hour with Hostinger nameservers.
- [ ] Once DNS resolves and SSL is installed, `https://ipamarketing.co.uk` should show a padlock in the browser.

---

## 8. Trigger First Deployment

- [ ] Ensure all 9 GitHub Secrets are in place (Section 6) before proceeding.
- [ ] Trigger the deployment using one of these two methods:
  - **Option A (push a commit)**: Make a trivial change (e.g. update a comment in `src/app/page.tsx`) and push to `master`:
    ```bash
    git add .
    git commit -m "chore: trigger initial production deploy"
    git push origin master
    ```
  - **Option B (manual trigger)**: Go to https://github.com/TaVlala/Marketing-Agency/actions → select the **Deploy to Hostinger** workflow → click **Run workflow** → select branch `master` → click **Run workflow**.
- [ ] Open the **Actions** tab: https://github.com/TaVlala/Marketing-Agency/actions
  - Watch the workflow run. Expected steps and approximate times:
    1. **Checkout** — ~5s
    2. **Install dependencies** (`npm ci`) — ~30–60s
    3. **Build** (`npm run build`) — ~60–90s (fetches CMS data from Railway during build)
    4. **FTP Upload** — ~30–60s depending on asset count
- [ ] Green checkmark = deploy succeeded.
- [ ] If the workflow fails, click the failed step to read the full log. Common causes:
  - **Build error: fetch failed** → `PAYLOAD_URL` secret is wrong or Railway service is not running. Verify the Railway URL returns a 200 at `/api/health` or `/admin`.
  - **FTP error: authentication failed** → `FTP_USERNAME` or `FTP_PASSWORD` is wrong. Reset the FTP password in Hostinger and update the secret.
  - **Missing env variable** → a `NEXT_PUBLIC_*` variable is undefined at build time. Check all 9 secrets are present with no typos.
  - **Railway build failing** → check Railway service logs in the Railway dashboard.
- [ ] After a successful deploy, visit your domain (or Hostinger's temporary URL while DNS propagates: found in hPanel → Hosting → Manage → Overview).

---

## 9. Smoke Test Checklist

Open the live site in an **incognito window** and verify each item. Test on both desktop and mobile.

**Global**
- [ ] Home page loads without a blank screen or loading spinner stuck indefinitely
- [ ] Browser address bar shows `https://` with a padlock (no mixed-content warnings)
- [ ] No red errors in browser DevTools → Console (`F12` → Console tab)
- [ ] Site title and meta description are correct (visible in the browser tab)

**Home page sections**
- [ ] Hero headline and subheadline match what was entered in Payload Site Settings
- [ ] Proof strip renders correctly — all stats visible with correct values
- [ ] Services section shows at least 4 service cards with icons, names, and descriptions
- [ ] Featured Work / Case Studies section shows published case study cards
- [ ] Testimonials carousel works — arrows advance slides and dots indicate current position

**Forms**
- [ ] Newsletter subscription form: enter a test email address → click Subscribe → confirm the Mailchimp success message appears (not an error or spinner stuck)
  - Verify the email appears in your Mailchimp Audience list
- [ ] Contact form (`/contact`): fill in all fields with test data → submit → confirm the Formspree success message appears
  - Verify the submission arrives in your Formspree dashboard and the notification email is delivered

**Inner pages**
- [ ] `/about` loads — team member cards visible with photos and bios
- [ ] `/services` loads — full services listing visible
- [ ] `/work` loads — case study grid visible; filter bar changes which cards are shown

**Analytics & Privacy**
- [ ] Cookie consent banner appears on first visit (incognito)
- [ ] Click **Decline** → reload → Plausible script should NOT fire (verify in DevTools → Network tab: no request to `plausible.io`)
- [ ] Open a second incognito window → cookie consent banner appears again → click **Accept** → browse a few pages
- [ ] Open the Plausible dashboard for your domain — confirm live visitor count is 1 (may take 10–30 seconds)
- [ ] Cookie consent preference persists after reloading the page (banner does not re-appear)

**Mobile**
- [ ] Open DevTools → toggle device toolbar → set to iPhone SE (375 × 667)
- [ ] Home page layout is not broken (no horizontal scroll, no overlapping text)
- [ ] Navigation menu opens and closes correctly on mobile
- [ ] Forms are usable on mobile (fields are large enough to tap)

**SEO / Open Graph**
- [ ] Visit `https://ipamarketing.co.uk/sitemap.xml` — returns a valid XML sitemap listing pages
- [ ] Visit `https://ipamarketing.co.uk/robots.txt` — returns a file allowing all crawlers (`User-agent: *` / `Disallow:` blank or `/admin`)
- [ ] Paste the homepage URL into https://opengraph.xyz — verify the OG title, description, and image preview are correct

---

## 10. CMS Webhook — Auto-Rebuild on Content Change (Optional but Recommended)

Without this, the frontend will only update when you manually push a commit or trigger the GitHub Action. With this configured, saving content in Payload automatically triggers a new deploy.

- [ ] Go to https://github.com/settings/tokens (classic tokens) → click **Generate new token (classic)**.
  - Note: `Fine-grained tokens` are also supported but the `dispatches` endpoint requires `repo` scope.
  - Scopes: tick `repo` (full control of private repositories).
  - Set expiry (90 days is a reasonable balance of security and convenience).
  - Click **Generate token** → copy the token immediately (it will not be shown again).
- [ ] Add the token as a GitHub secret named `GH_DISPATCH_TOKEN` at:
  https://github.com/TaVlala/Marketing-Agency/settings/secrets/actions
- [ ] Add it also as a Railway environment variable so Payload can read it: `GH_DISPATCH_TOKEN=<token>`.
- [ ] In the Payload codebase (`payload/`), add an `afterChange` hook to any collection that should trigger a rebuild (e.g. Services, Case Studies, Testimonials, Site Settings). The hook should send:
  ```http
  POST https://api.github.com/repos/TaVlala/Marketing-Agency/dispatches
  Authorization: token <GH_DISPATCH_TOKEN>
  Content-Type: application/json

  { "event_type": "cms-update" }
  ```
  Example using `node-fetch` or the native `fetch` available in Node 18+:
  ```ts
  // payload/src/hooks/triggerRebuild.ts
  export const triggerRebuild = async () => {
    const token = process.env.GH_DISPATCH_TOKEN;
    if (!token) return;
    await fetch(
      'https://api.github.com/repos/TaVlala/Marketing-Agency/dispatches',
      {
        method: 'POST',
        headers: {
          Authorization: `token ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/vnd.github.v3+json',
        },
        body: JSON.stringify({ event_type: 'cms-update' }),
      }
    );
  };
  ```
- [ ] Ensure your GitHub Actions workflow file (`.github/workflows/deploy.yml`) includes `repository_dispatch` as a trigger:
  ```yaml
  on:
    push:
      branches: [master]
    repository_dispatch:
      types: [cms-update]
  ```
- [ ] Test the webhook: update a Service entry in Payload → Save → go to https://github.com/TaVlala/Marketing-Agency/actions and confirm a new workflow run appears within ~30 seconds.

---

## 11. Post-Launch Housekeeping

- [ ] **Rotate `PAYLOAD_SECRET`**: if you used a temporary or guessable value during setup, generate a new one (`openssl rand -base64 32`) and update it in Railway → Variables. **Restart the Railway service after updating.** All existing sessions will be invalidated (users will be logged out of the admin panel).
- [ ] **Remove placeholder content**: delete any test case studies, team members, or testimonials that were created during setup. Only real, approved content should be live.
- [ ] **Google Search Console**:
  - Go to https://search.google.com/search-console → **Add property**.
  - Choose **URL prefix** → enter `https://ipamarketing.co.uk`.
  - Verify ownership (HTML file method is easiest for static sites: download the file, add it to `public/` in the repo, deploy, then verify).
  - After verification: go to **Sitemaps** → enter `sitemap.xml` → Submit.
- [ ] **Bing Webmaster Tools**:
  - Go to https://www.bing.com/webmasters → Add your site.
  - Import from Google Search Console (easiest method) or verify manually.
  - Submit `https://ipamarketing.co.uk/sitemap.xml`.
- [ ] **Railway usage alert**: open Railway → your project → **Settings** → **Usage** → enable billing alerts so you are notified before exceeding the free tier credit.
- [ ] **Secure credential handover**: share the following with the client via a password manager (1Password, Bitwarden) or an encrypted note — do NOT send via plain email:
  - Payload admin URL: `https://<your-railway-domain>.railway.app/admin`
  - Payload admin email and password
  - Cloudinary login
  - Formspree login (to view submissions)
  - Mailchimp login (to manage audience and campaigns)
  - Plausible login (to view analytics)
  - Hostinger hPanel login
- [ ] **Brief the client** on CMS usage:
  - How to add/edit services, case studies, testimonials, and team members
  - How to update Site Settings (headline, contact details, social links)
  - How to publish vs. draft a case study
  - Remind them that saving in Payload triggers a site rebuild (if webhook is configured) or that they need to notify the developer to redeploy (if not)
- [ ] **Archive this checklist** and note the deploy date and any decisions made during setup (e.g. which Cloudinary cloud name was used, which Railway project was created) in the project `PROGRESS.md`.

---

*Checklist complete. The site is live, tested, and handed over.*
