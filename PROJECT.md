# Adapt Agency

**Status:** Active
**Last synced:** 2026-06-04
**Production:** https://adaptagency.com.au
**Repo:** Local — deployed to Namecheap via Cloudflare

## Overview

Static marketing and information site for Adapt Agency — "AI-native delivery for websites, systems, and applications." Bilingual (English/Vietnamese) with i18n via session storage. Hosted on Namecheap, proxied through Cloudflare.

## Stack

- Static HTML, Tailwind CSS (CDN), inline scripts
- No build step — pure HTML/CSS/JS
- Cloudflare (DNS + CDN proxy)
- Namecheap (hosting + email)
- GoDaddy (domain registration)

## Sections

- Home page (hero, services, contact form)
- Privacy policy
- Terms of use

## Dependencies

- None — fully static, no build dependencies

## Task List

- [ ] Ongoing content updates as needed

## Decisions Log

- Static site — no framework or build tools
- Bilingual (en-AU / vi) with client-side i18n
- Cloudflare in front of Namecheap origin
- Session-scoped language preference (not persistent)
- **2026-07-17:** Reconciled from adaptagency/ + adaptagency.com.au/ duplicates into single canonical folder (~/projects/adaptagency/)

## Next Actions

- Monitor production site
