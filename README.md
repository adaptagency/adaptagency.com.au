# Adapt Agency

**AI-native delivery for websites, systems, and applications.**

This repository contains the source for [adaptagency.com.au](https://adaptagency.com.au)—a static marketing and information site for Adapt Agency. We design and build digital products with modern AI-assisted workflows, from marketing sites through to internal systems and customer-facing apps.

---

## What we do

| Capability | Description |
|------------|-------------|
| **Websites** | Fast, accessible marketing and content sites—clear messaging, solid performance, and maintainable markup. |
| **Systems** | Business workflows, integrations, and operational tooling built for reliability and clarity. |
| **Apps** | Focused web and product experiences where UX and technical fit matter. |

We use AI thoughtfully across discovery, implementation, and quality—always with human judgment on architecture, security, and what ships to production.

---

## Repository layout

The site is **static**: HTML, [Tailwind CSS](https://tailwindcss.com/) (via CDN), small inline scripts, and assets. There is no build step.

```
├── index.html          # Home (marketing, contact form, hero)
├── privacy.html        # Privacy policy
├── terms.html          # Terms of use
├── js/
│   └── adaptagency-lang.js   # Shared i18n: session preference, home toggle, [data-i18n] apply
├── sitemap.xml         # URL list for crawlers (update lastmod when content changes)
├── robots.txt          # Crawl rules + sitemap URL
├── brand_assets/       # Logo, tokens, brand notes
└── README.md
```

If a static site generator or bundler is added later, update this section with `src/`, build commands, and deploy output.

---

## Local development

1. Clone the repository.
2. Serve the folder with any static file server, for example:

   ```bash
   npx serve .
   ```

   Or open `index.html` directly in the browser for early layout checks (some features may require a local server).

3. Edit files, refresh, and commit changes when ready.

**Internationalisation (English / Vietnamese):** Implemented in `js/adaptagency-lang.js` and loaded on every page. Each page passes its string table into `AdaptAgencyLang.init(I18N)`; the home page also passes `onAfterApply` to keep the contact form in sync.

- **Home** has the language switch (`#lang-switch-root` / `#lang-toggle`). **Privacy** and **Terms** do not; they follow the same language as the home page for the current browser session.
- **Preference is session-scoped:** `sessionStorage` key `adaptagency-lang`, plus a session cookie `aa_lang_sess` (`path=/`, no `Max-Age`). A **new browser session defaults to English** until the user switches again.
- **Resolution order** when applying language: URL query `?aa_lang=en|vi` (then stripped with `history.replaceState` for a clean address bar), then `sessionStorage`, then `aa_lang_sess`. Internal links among `index.html`, `privacy.html`, and `terms.html` are rewritten to include `?aa_lang=…` so navigation stays consistent (needed because `file://` treats each HTML file as a separate origin and does not share `sessionStorage` between them).
- **Legacy cleanup:** On init, any old persistent `adaptagency-lang` cookie from earlier deploys is cleared (`max-age=0`), and a stale `localStorage` entry with the same name is removed.
- **`pageshow` and `visibilitychange`** re-read storage so returning via the back-forward cache or refocusing the tab reapplies the correct language.

Use **`npx serve .`** for local multi-page testing over one HTTP origin; `file://` still works for layout checks but relies on the query parameter and cookie path above.

---

## Responsiveness and accessibility

- All main pages include **`width=device-width, initial-scale=1`** in the viewport meta tag.
- Layout uses Tailwind breakpoints (`sm`, `md`, `lg`, etc.), fluid type (e.g. `clamp` on key headings), and `min-h-[48px]` on primary controls where appropriate.
- Nav and header actions use a **minimum 44×44px** touch target (`.touch-target` on the home page).
- In-page anchors (`#services`, `#lead`, etc.) use **`scroll-margin-top`** so section titles are not hidden under the **sticky** header. Legal pages use **`scroll-mt-28`** on `<main>` for the same reason.
- **Home:** `max-w-7xl` content, responsive grid for hero (`md:grid-cols-…`), stacked header on small viewports (`flex-wrap` / full-width nav under the bar) and horizontal padding `px-4 sm:px-5 md:px-8`.
- **Privacy / Terms:** Narrow reading column `max-w-3xl`, horizontal padding `px-4 sm:px-6`, prose sections with `break-words` / `min-w-0`; Terms also use **`overflow-x: clip`** and Vietnamese-friendly **`word-break`** where needed.

---

## SEO (checklist)

- **Per page:** `<title>`, meta description, canonical URL, `robots`, `theme-color`, Open Graph and Twitter tags where applicable, JSON-LD on the home page and legal pages.
- **Home `og:image` / Twitter image:** points at `brand_assets/logo/adapt-agency-logo-web.svg` in this repo. Many networks prefer a **1200×630 PNG or JPG** for rich previews; add one under `brand_assets/` and point the meta tags at it if you need maximum social compatibility.
- **`sitemap.xml` and `robots.txt`:** deploy at the site root; submit the sitemap in Google Search Console if you use it.
- **Hreflang:** `alternate` links note en-AU and vi; both locales are served from the same URLs with client-side copy (common for small static sites).

---

## Domain, DNS, and hosting

| Piece | Provider | Role |
|--------|----------|------|
| **Domain registration** | GoDaddy | Owns `adaptagency.com.au`; renewal and registrar settings live here. |
| **DNS** | Cloudflare | Authoritative DNS for the zone. All records (web, mail, verification) are defined here. |
| **Website hosting** | Namecheap | Static site files are uploaded or synced to Namecheap hosting; the origin that Cloudflare proxies to. |
| **CDN / proxy** | Cloudflare | Sits in front of Namecheap for caching, SSL/TLS, and performance (typically “proxied” / orange-cloud on the web record). |
| **Email** | Namecheap | Mailbox hosting; **MX** (and related mail records such as SPF/DKIM per Namecheap’s docs) are added in **Cloudflare**, not at GoDaddy. |

**GoDaddy setup:** Point the domain’s **nameservers** to the pair Cloudflare gives you when you add the site to Cloudflare. DNS is then no longer edited at GoDaddy for day-to-day use.

**Cloudflare setup:** Create DNS records that point web traffic to your Namecheap hosting (A/AAAA to the IP Namecheap provides, or CNAME if they specify a hostname). Enable proxying on that record if you want Cloudflare’s CDN and edge TLS. Add **MX** (and any mail CNAME/TXT records) exactly as Namecheap’s email setup instructions specify, so mail routes to Namecheap while DNS stays on Cloudflare.

---

## Deployment

1. **Build or prepare** the static output (root of this repo or a `dist/` folder if you add a build step).
2. **Publish** to Namecheap hosting (FTP/SFTP, File Manager, or any workflow Namecheap supports for your plan).
3. **Verify** the site loads over HTTPS once Cloudflare SSL mode matches your setup (often *Full* or *Full (strict)* when the origin supports HTTPS).

This repository is not tied to Namecheap’s UI; keep deploy steps in your own checklist or CI if you automate uploads later.

---

## Contributing

Internal or contractor changes: use feature branches, open pull requests for non-trivial work, and keep commits scoped and message clear. For content and copy, prefer small, reviewable changes.

---

## Licence & contact

© Adapt Agency. All rights reserved unless otherwise noted in this repository.

**Web:** [adaptagency.com.au](https://adaptagency.com.au)

For project enquiries, use the contact channels published on the live site.
