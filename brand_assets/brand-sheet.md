# Adapt Agency — brand sheet

Canonical reference for visual identity, voice, and implementation. **Update this file when brand decisions change**; implementations should follow these tokens unless a specific campaign overrides them.

---

## Brand snapshot

| | |
|---|---|
| **Trading name** | Adapt Agency |
| **Domain** | [adaptagency.com.au](https://adaptagency.com.au) |
| **Positioning** | AI-native studio delivering websites, systems, and applications—with human judgment on what ships. |
| **Audience** | Australian businesses and teams who want clear outcomes, not hype; technical and non-technical stakeholders. |

---

## Logo

| Asset | Location | Notes |
|-------|----------|--------|
| **Primary (live site)** | Inline in `index.html` + `brand_assets/logo/mark.svg` | **Wordmark:** “Adapt Agency” in **DM Sans** (same family as nav / primary UI buttons), with an **upward** lightning SVG (apex at top of mark). **Dark UI:** bolt uses emerald gradient (`#99f6e4` → `#34d399`). **Light/footer:** bolt uses brand teal gradient (`#1a6b64` → `#0f3d3a`). **Favicon:** `mark.svg`. |
| **Legacy raster** | `adapt-agency-logo.png`, `adapt-agency-logo-web.png` / `.svg` | Earlier lockups; **not used** on the current marketing page—keep for reference or print if needed. |

**Clear space:** treat the lightning + wordmark as one lockup—keep clear space ≥ cap height of “A” on all sides.

**Do not** stretch the mark disproportionally; scale the SVG and text together.

---

## Colour palette

Use these hex values in design and code. Do **not** substitute default Tailwind blues/indigos for primary UI colour.

### Core

| Role | Hex | Usage |
|------|-----|--------|
| **Primary (deep teal)** | `#0F3D3A` | Headers, key CTAs, primary buttons, emphasis borders. |
| **Primary hover / mid** | `#1A6B64` | Hover states, secondary emphasis. |
| **Primary tint (backgrounds)** | `#E8F3F2` | Section bands, cards, subtle fills. |
| **Accent (terracotta)** | `#C45C42` | Links on neutral backgrounds, secondary CTAs, highlights—use sparingly. |
| **Accent soft** | `#F4E6E2` | Badges, soft callouts. |

### Neutrals

| Role | Hex | Usage |
|------|-----|--------|
| **Text primary** | `#141816` | Body and headings on light backgrounds. |
| **Text muted** | `#5A6562` | Supporting copy, captions. |
| **Border / hairline** | `#D4DCDA` | Dividers, input borders. |
| **Surface** | `#FAFAF8` | Page background (warm off-white). |
| **Surface elevated** | `#FFFFFF` | Cards, modals, nav bar. |

### Semantic (UI)

| Role | Hex | Usage |
|------|-----|--------|
| **Success** | `#2D6A4F` | Confirmations, positive states. |
| **Warning** | `#B8860B` | Non-destructive cautions. |
| **Error** | `#B00020` | Errors, destructive actions (keep rare on marketing pages). |

### Contrast

- Body text on `#FAFAF8` or `#FFFFFF`: use `#141816` (meets WCAG AA for normal text).
- Primary button: white `#FFFFFF` text on `#0F3D3A` (verify AA for chosen type size).

---

## Typography

Pair a **display** face for headings with a **neutral sans** for UI and body (per project design rules).

| Role | Font | Weights | Notes |
|------|------|---------|--------|
| **Display / headings** | **Fraunces** (Google Fonts) | 500–700 | Tight tracking on large sizes: `letter-spacing: -0.03em`. |
| **Body / UI** | **DM Sans** | 400, 500, 600 | Body line-height **1.65–1.75**. |

**Fallback stack (CSS):**  
`font-family: "Fraunces", Georgia, "Times New Roman", serif;`  
`font-family: "DM Sans", system-ui, -apple-system, sans-serif;`

**Scale (web, starting point):**

| Token | Size | Use |
|-------|------|-----|
| `text-display` | clamp(2.25rem, 5vw, 3.5rem) | Hero headline |
| `text-h2` | clamp(1.75rem, 3vw, 2.25rem) | Section titles |
| `text-h3` | 1.25rem–1.5rem | Subsections |
| `text-body` | 1rem (16px) | Body |
| `text-small` | 0.875rem | Meta, captions |

---

## Voice and copy (Australian English)

- **Spelling:** Australian English only — *colour, centre, organise, optimise* — everywhere on the public site and in repo copy.
- **Tone:** Direct, professional, warm. Prefer concrete outcomes over buzzwords. Say what you build and for whom.
- **Avoid:** “Revolutionary,” “game-changing,” “synergy,” vague “AI-powered” without substance. If AI is mentioned, tie it to *how* work is delivered or *what* the client gets.

**Example lines (adapt, don’t paste blindly):**

- “Websites, systems, and apps—designed and built with modern tooling and clear ownership.”
- “You get working software and honest scope—not a slide deck that never ships.”

---

## Imagery and iconography

- Photography: real people and real environments where possible; avoid clichéd stock “handshake in boardroom.”
- Illustration: geometric or abstract; avoid generic purple gradient blobs.
- Icons: simple stroke icons; one consistent set per site version.

---

## Layout and motion

- **Spacing:** Use a small set of steps (e.g. 4, 8, 12, 16, 24, 32, 48, 64 px) consistently—not arbitrary values every block.
- **Radius:** Default **8px** on buttons and cards; **12px** for large panels if needed.
- **Motion:** Prefer `transform` and `opacity` only; no `transition-all`. Subtle, short durations (150–250 ms).

---

## File inventory in this folder

| File | Purpose |
|------|---------|
| `brand-sheet.md` | This document — strategy and tokens in prose. |
| `tokens.css` | `:root` CSS custom properties for implementation. |
| `logo/mark.svg` | Primary mark (lightning); favicon. |
| `logo/adapt-agency-logo*.png` / `.svg` | Legacy lockups (optional archive). |

---

## Changelog

| Date | Change |
|------|--------|
| 2026-03-29 | Initial brand sheet and tokens for web use. |
| 2026-03-30 | Web badge from master PNG: rounded white plate, thin darker border `#084B96`, transparent outside the plate (PNG/SVG). |
| 2026-03-30 | Site wordmark: Fraunces “Adapt Agency” + upward emerald lightning; legacy raster lockups retired from the live page. |
