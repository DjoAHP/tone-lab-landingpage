# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**landingpage-tonelab** is a single-page marketing landing page for **ToneLab v2.6.8** — an Electron-based music production desktop application. The page showcases the app's six built-in tools, includes a demo video, and provides Windows download links.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Language | TypeScript (~6.0.2, strict mode) |
| Runtime | React 19.2.5 (no router, no state management library) |
| Build tool | Vite 8.0.10 with `@vitejs/plugin-react` (SWC compiler) |
| Styling | Tailwind CSS 4.2.4 via PostCSS 8 |
| Linting | ESLint 10.2.1 + typescript-eslint 8.58.2 (flat config) |
| Icons | Lucide React 1.14.0 + local SVG files |

## Project Structure

```
src/
  main.tsx                    # Entry point — renders <App /> into #root
  config.ts                   # ⭐ Centralized config (version, URLs, constants)
  App.tsx                     # Page shell — renders all sections sequentially
  index.css                   # Global styles: Tailwind import, CSS variables, keyframe animations
  components/
    Topbar.tsx                # Sticky top nav — logo (scrolls to top), section links, mobile hamburger menu
    Hero.tsx                  # Hero section — headline, subtitle, CTA download button, background logo
    Features.tsx              # 6-feature grid with icons (Diapa, Stack, Metro, Setlist, Chrono, DocV)
    Demo.tsx                  # Cloudinary video player — autoplay, loop, muted, disablePictureInPicture
    Download.tsx              # Download section — Windows .exe links, PWA "coming soon" button
    Footer.tsx                # Footer — brand, GitHub link, social icons, copyright, version

public/
  favicon.svg
  icons.svg
  assets/
    logo.svg                  # ToneLab logo (used everywhere)
    screenshot.png            # OG image for social sharing
    demo/
      poster.png              # Video poster frame (shown before playback)
    icons/                    # 6 tool SVGs (one per feature)
      diapa-tool.svg
      stack-tool.svg
      metro-tool.svg
      setlist-tool.svg
      chrono-tool.svg
      docv-tool.svg

index.html                    # HTML shell — meta tags, Google Fonts, #root mount
postcss.config.js             # PostCSS — tailwindcss plugin
eslint.config.js              # ESLint flat config
tsconfig.json / tsconfig.*.json # TypeScript configs (bundler + project references)
vite.config.ts                # Vite config — SWC React plugin
```

**What was cleaned up (not present):**
- `src/App.css` — deleted (legacy Vite React template, ~300 unused lines)
- `src/assets/` — deleted entirely (unused screenshots + template logos)
- `src/assets/icons/` — deleted (was empty/corrupted; active icons live in `public/assets/icons/`)
- Empty placeholder dirs `public/download/`, `public/fonts/`, `public/assets/download/`

## Build & Development Commands

```bash
# Install dependencies (one-time)
npm install

# Start dev server with HMR (default: http://localhost:5173)
npm run dev

# Type-check + production build (output: dist/)
npm run build

# Preview production build locally
npm run preview

# Lint all files with ESLint
npm run lint
```

No test framework is configured (no Vitest, Playwright, or Cypress). No `*.test.*` or `*.spec.*` files exist.

## Architecture & Patterns

### Component Model
- All components are **functional React components** in TypeScript.
- Props use **inline `interface` declarations** (only `Features.tsx` exports one).
- **No custom hooks, no context, no global state** — the page is fully static.
- Inline `React.CSSProperties` objects are used for one-off/interactive styles (gradients, hover effects, animations).
- Tailwind classes handle layout, spacing, typography, and flexbox/grid.

### Centralized Config (`src/config.ts`)
All shared constants live in one file to avoid duplication:
```typescript
export const CONFIG = {
  APP_VERSION: "2.6.8",
  DOWNLOAD_BASE_URL: "https://github.com/DjoAHP/tone-lab-electron/releases",
  GITHUB_REPO: "https://github.com/DjoAHP/tone-lab-electron",
  CONTACT_EMAIL: "contact@tonelab.com",
  CLOUINARY_DEMO_URL: "https://res.cloudinary.com/...",
} as const;
```
When version or URLs change, update **only this file**.

### Styling Strategy (Hybrid)
Two systems coexist:
1. **Tailwind v4 via PostCSS** (`@import "tailwindcss"` in `index.css`) — layout, spacing, responsive breakpoints, typography size utilities.
2. **Inline `style` with CSS custom properties** — colors, gradients, shadows, borders, transitions. This is the dominant pattern.

CSS custom property tokens are defined in **both** `@theme` (Tailwind v4 tokens) and `:root` (legacy names). Components reference `:root` variables (`var(--bg-primary)`, `var(--accent-primary)`, etc.) in inline styles.

### Keyframe Animations
Defined in `src/index.css`:
- `fadeInUp` — 0.8s ease-out, fade + translate Y (used in Hero, Features)
- `slideDown` — 0.5s ease-out (used in Topbar)

Applied via CSS classes `.animate-fadeInUp` and `.animate-slideDown`.

### Navigation Flow (no router)
The page is one long scroll. All "links" are scroll-into-view via `<button onClick>` targeting section `id`s:
```
Topbar (sticky) → Hero → Features → Demo → Download → Footer
```
The logo in the Topbar acts as a **home/scroll-to-top** button from any section.

### Interactivity & UX
- **Desktop nav**: Buttons scroll to sections, download link triggers direct `.exe` download
- **Mobile nav**: Hamburger menu shows same links as a column
- **Hover micro-interactions**: Scale, lift, glow on buttons and cards via `onMouseEnter`/`onMouseLeave`
- **All images**: `loading="lazy"` for performance
- **Video**: `disablePictureInPicture`, `controlsList="nodownload"`

## Accessibility
- Semantic HTML5: `<section>`, `<footer>`, `<nav>`, `<main>`
- `alt` attributes on all `<img>` elements
- `aria-label` on interactive elements without visible text (social links, logo)
- `title` attribute on `<video>`
- `disabled` + `aria-label` on the unavailable PWA button
- `tabIndex` and `focus:outline-none` patterns used where appropriate
- `lang="fr"` on `<html>`, `cursor: pointer` on all clickable elements

## SEO / Open Graph
Set in `index.html`:
- `meta description`
- `og:title`, `og:description`, `og:image`, `og:type`
- `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- `meta keywords`
- `lang="fr"` on `<html>`

## Asset Pipeline
- `public/` files served as-is by Vite (copied to build root on `npm run build`).
- SVGs referenced via `<img src="/assets/icons/…">` (public path).
- Video hosted externally on Cloudinary (not bundled).
- Fonts loaded from Google Fonts CDN (Inter, `<link>` in `index.html`).

## Known Issues / Future Improvements

| Priority | Issue | Detail |
|----------|-------|--------|
| 🔴 | **No tests** | No Vitest, Playwright, or Cypress. Consider at minimum E2E tests for link/scroll behavior. |
| 🟡 | **Dual CSS token system** | `@theme` and `:root` define the same colors. Consider migrating to Tailwind tokens exclusively. |
| 🟡 | **Inline styles dominant** | Heavy inline `style` usage is hard to maintain at scale. Consider extracting to CSS utility classes. |
| 🟡 | **PWA button permanently disabled** | Currently just a visual placeholder. Decide whether to remove or implement PWA support. |
| 🟢 | **No `prefers-color-scheme`** | Dark-only theme. Could add light mode via CSS variable overrides. |
| 🟢 | **No analytics** | Consider adding Plausible, Umami, or similar privacy-first analytics. |

## Commit History (recent)
- Last 3 commits cover: backup state → initial cleanup + CLAUDE.md → navigation UX improvements

## Git
- Branch: `master`
- Remote: `origin/master` (2 commits ahead)