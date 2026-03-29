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

## Deployment

The production site is intended to be hosted as static files (e.g. GitHub Pages, Netlify, Cloudflare Pages, or your preferred CDN-backed host). Connect this repository to your host’s “deploy from Git” workflow and point the document root at the built or root output directory once the site structure is finalised.

---

## Contributing

Internal or contractor changes: use feature branches, open pull requests for non-trivial work, and keep commits scoped and message clear. For content and copy, prefer small, reviewable changes.

---

## Licence & contact

© Adapt Agency. All rights reserved unless otherwise noted in this repository.

**Web:** [adaptagency.com.au](https://adaptagency.com.au)

For project enquiries, use the contact channels published on the live site.
