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

The site is **static**: HTML, CSS, and JavaScript (and optional assets). Structure will evolve as pages and sections are added; a typical layout looks like:

```
├── index.html          # Home (or entry via build output)
├── assets/             # Images, fonts, icons
├── css/                # Stylesheets
├── js/                 # Client-side behaviour (minimal by default)
└── README.md
```

If a build step (e.g. a static site generator or bundler) is introduced later, this section can be updated to document `src/`, build commands, and deploy output.

---

## Local development

1. Clone the repository.
2. Serve the folder with any static file server, for example:

   ```bash
   npx serve .
   ```

   Or open `index.html` directly in the browser for early layout checks (some features may require a local server).

3. Edit files, refresh, and commit changes when ready.

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
