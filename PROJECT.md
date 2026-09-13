# Adapt Agency

**Status:** Active
**Last synced:** 2026-09-13
**Production:** https://adaptagency.com.au
**Repo:** GitHub (`adaptagency/adaptagency.com.au`) — deployed to GitHub Pages via push to main; DNS on Cloudflare

## Overview

Static marketing and information site for Adapt Agency — "AI-native delivery for websites, systems, and applications." Bilingual (English/Vietnamese) with i18n via session storage. Hosted on GitHub Pages; DNS on Cloudflare; email on Namecheap.

## Stack

- Static HTML, Tailwind CSS (CDN), inline scripts
- No build step — pure HTML/CSS/JS
- GitHub Pages (hosting — deploys on push to main)
- Cloudflare (DNS only)
- Namecheap (email)
- GoDaddy (domain registration)

## Sections

- Home page (hero, services, contact form)
- Gallery (project showcase — masonry + lightbox)
- Privacy policy
- Terms of use

## Dependencies

- None — fully static, no build dependencies

## Task List

- [ ] Ongoing content updates as needed
- [x] Add Gallery page — Customer Projects (N Pub, RökTips, Silverdale Mechanical, Chanh Ventures) + Adapt Agency Projects (Words for Kids, Custom Directories, LeadResponse); masonry + lightbox; staged 2026-09-13, pending Steve's review
- [ ] Add `/llms.txt` (AI search readiness — Adapt Agency standard; missing from repo and live site, verified 2026-09-13)

## Decisions Log

- Static site — no framework or build tools
- Bilingual (en-AU / vi) with client-side i18n
- Cloudflare in front of Namecheap origin
- Session-scoped language preference (not persistent)
- **2026-07-17:** Reconciled from adaptagency/ + adaptagency.com.au/ duplicates into single canonical folder (~/projects/adaptagency/)

## Next Actions

- Review Gallery on staging: https://adaptagency-staging.steve-2ff.workers.dev/gallery.html → merge `gallery-staging` to main for production deploy
- Monitor production site
