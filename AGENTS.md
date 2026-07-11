# AGENTS.md

Landing page (Vite + React 19 + TypeScript, Tailwind v4) for ToneLab, an Electron music app. Single static page, dark theme, French content (`lang="fr"`).

## Commands

- `npm run dev` — Vite dev server (http://localhost:5173)
- `npm run build` — **runs `tsc -b && vite build`. The `tsc -b` step is the typecheck** — there is no separate typecheck script. Type errors block the build.
- `npm run lint` — `eslint .` (flat config)
- `npm run preview` — serve the built `dist/`
- No test framework is configured (no Vitest/Playwright). Do not expect `npm test`.

## TypeScript strictness (build will fail if violated)

`tsconfig.app.json` enables `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`, `erasableSyntaxOnly`. Practically:
- Unused imports or variables fail the build and lint. Remove them.
- Type-only imports must use `import type` (`verbatimModuleSyntax`).
- `tsc -b` uses project references (`tsconfig.app.json` + `tsconfig.node.json`); `tsconfig.json` itself is just the aggregator.

## Styling

- Tailwind **v4** wired through the `@tailwindcss/postcss` plugin (`postcss.config.js`), not the Tailwind CLI. `src/index.css` starts with `@import "tailwindcss";`.
- Two color systems coexist: tokens in `@theme` and the same values duplicated as `:root` CSS variables in `index.css`. Components reference the **`:root` variables** (`var(--accent-primary)`, `var(--bg-primary)`, etc.) via inline `style`, not Tailwind color classes. Keep both in sync if you change colors.
- Inline `React.CSSProperties` is the dominant styling pattern; keyframe classes `.animate-fadeInUp` / `.animate-slideDown` are defined in `index.css`.

## Architecture (what is not obvious from filenames)

- `src/config.ts` is the single source of truth for `APP_VERSION` (currently `2.7.11`), download URL, GitHub repo, Cloudinary demo URL. **Edit only this file for version/URL changes** — they are scattered across components otherwise.
- No router, no state management. The page is one long scroll; "navigation" is `<button onClick>` calling `scrollIntoView` on section `id`s. The Topbar logo scrolls to top. Sections are wrapped in `src/components/ScrollReveal.tsx`.
- `public/` assets are served as-is. Tool SVGs live in `public/assets/icons/*.svg` and are referenced via `<img src="/assets/icons/…">`. The demo video is hosted on Cloudinary (not bundled).
- Components use inline `interface` prop declarations; `Features.tsx` is the only one exporting its interface.

## Conventions

- Comments and copy are in French.
- Icons come from `lucide-react`; tool-specific icons are local SVGs.

## Source-of-truth notes

- `CLAUDE.md` is the long-form project doc but is **partially stale** (e.g., it lists version `2.6.8` and claims `ScrollReveal` does not exist). Trust `src/config.ts` and the code over prose in `CLAUDE.md`.
- The `/maj-tonelab` skill syncs this landing page from the sibling `tone-lab-electron` repo (reads it, updates `config.ts`, builds, commits — landing page only).
