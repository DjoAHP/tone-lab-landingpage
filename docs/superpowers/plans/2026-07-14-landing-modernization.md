# Modernisation ToneLab Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Moderniser le rendu, les animations et le placement de la landing page ToneLab (5 sections + Topbar) en CSS pur, sans nouvelle dépendance, en conservant la charte cyan et le contenu existant.

**Architecture:** On modifie composant par composant (Hero, Features, Demo, Download, Footer, Topbar) + un nouveau `AudioBars.tsx` (Footer uniquement) + des keyframes partagés dans `src/index.css`. Aucun routeur/state global changé. La page reste un long scroll avec navigation par `scrollIntoView`.

**Tech Stack:** React 19 + Vite + TypeScript (strict) + Tailwind v4 (via `@tailwindcss/postcss`) + variables CSS `:root` + styles inline + `lucide-react` (déjà installé) + IntersectionObserver (navigateur).

## Global Constraints

- **Aucune nouvelle dépendance** (CSS pur, animations via CSS + IntersectionObserver).
- **Charte conservée** : cyan `--accent-primary: #1D7195`, `--accent-light: #2898C8`. Aucun nouveau hash de couleur.
- **Hero** : PAS de motif de barres audio animé (fond dégradé cyan `breathe` + shimmer + scroll indicator uniquement).
- **Features** : SVG existants, titres et descriptions 100% conservés (aucune modif de texte/SVG).
- **TypeScript strict** : `tsc -b` est le typecheck (pas d'`any`, `import type` pour les types, pas d'`unused locals/params`). Le build échoue sinon.
- **Commentaires/copy en français.**
- **Pas de test framework configuré** (pas de Vitest/Playwright) → pas de tests unitaires ; chaque tâche se vérifie via `npm run lint` + `npm run build` + contrôle visuel `npm run dev`.
- **Sauvegarde existante** : `src.backup-2026-07-14/` + tag git `pre-modernisation` (restauration possible).
- Icônes de plateforme (windows/linux) = `<img src="/assets/icons/...">` avec classe `brightness-0 invert`.

---

### Task 1 — Fondations CSS (`src/index.css`)

**Files:**
- Modify: `src/index.css` (ajout de keyframes + classes + reduced-motion, après la ligne 78)

**Interfaces:**
- Produces: classes réutilisables `.animate-breathe`, `.animate-shimmer`, `.animate-glowPulse`, `.animate-scrollHint`, `.audio-bars`, et `@property --angle` + `.feature-card::before` (utilisées par Hero, Features, Demo, Footer).

- [ ] **Step 1: Ajouter les keyframes et classes à la fin de `src/index.css`**

Ajouter après la dernière ligne (`}` de la règle `*` transition) :

```css
/* === Modernisation : animations partagées === */

@keyframes breathe {
  0%, 100% { opacity: 0.35; transform: scale(1); }
  50%      { opacity: 0.6;  transform: scale(1.08); }
}

@keyframes shimmer {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes glowPulse {
  0%, 100% { box-shadow: 0 0 30px rgba(29, 113, 149, 0.15); }
  50%      { box-shadow: 0 0 60px rgba(29, 113, 149, 0.3); }
}

@keyframes scrollHint {
  0%, 100% { transform: translateY(0); opacity: 0.5; }
  50%      { transform: translateY(8px); opacity: 1; }
}

@keyframes audioBar {
  0%, 100% { height: 20%; }
  50%      { height: 100%; }
}

.animate-breathe     { animation: breathe 7s ease-in-out infinite; }
.animate-shimmer     { animation: shimmer 2.5s infinite; }
.animate-glowPulse   { animation: glowPulse 6s ease-in-out infinite; }
.animate-scrollHint  { animation: scrollHint 2s ease-in-out infinite; }

/* Barres audio (Footer uniquement) */
.audio-bars {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 24px;
}
.audio-bars span {
  width: 3px;
  border-radius: 2px;
  background: linear-gradient(to top, var(--accent-primary), var(--accent-light));
  animation: audioBar 1.2s ease-in-out infinite;
}

/* Bordure animée des cartes Features (survol) */
@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}
.feature-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: conic-gradient(from var(--angle), transparent 0%, var(--accent-light) 20%, transparent 40%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.4s ease;
  animation: spinBorder 4s linear infinite;
  pointer-events: none;
}
.feature-card:hover::before { opacity: 1; }
@keyframes spinBorder { to { --angle: 360deg; } }

/* Accessibilité : coupe les animations lourdes */
@media (prefers-reduced-motion: reduce) {
  .animate-breathe,
  .animate-shimmer,
  .animate-glowPulse,
  .animate-scrollHint,
  .audio-bars span,
  .feature-card::before {
    animation: none !important;
  }
}
```

- [ ] **Step 2: Vérifier le build (typecheck + lint)**

Run: `cd ToneLab_landing-page && npm run build`
Expected: build OK (le typecheck `tsc -b` passe, aucune erreur). `npm run lint` propre.

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "style(landing): fondations CSS — keyframes breathe/shimmer/glowPulse/scrollHint + bordure animée + reduced-motion"
```

---

### Task 2 — Composant `AudioBars` (réutilisable, Footer uniquement)

**Files:**
- Create: `src/components/AudioBars.tsx`

**Interfaces:**
- Produces: `AudioBars` (props `bars?: number`, `className?: string`) — importé par `Footer.tsx` (Task 7).

- [ ] **Step 1: Créer le composant**

```tsx
import React from 'react';

interface AudioBarsProps {
  bars?: number;
  className?: string;
}

const AudioBars: React.FC<AudioBarsProps> = ({ bars = 16, className = '' }) => {
  return (
    <div className={`audio-bars ${className}`} aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          style={{
            animationDelay: `${(i % 5) * 0.12}s`,
            animationDuration: `${1 + (i % 3) * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
};

export default AudioBars;
```

- [ ] **Step 2: Vérifier le lint**

Run: `cd ToneLab_landing-page && npm run lint`
Expected: aucun warning/erreur sur `AudioBars.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/components/AudioBars.tsx
git commit -m "feat(landing): composant AudioBars réutilisable (Footer)"
```

---

### Task 3 — Hero modernisé (centré + fond animé, sans barres audio)

**Files:**
- Modify: `src/components/Hero.tsx` (réécriture complète du fichier)

**Interfaces:**
- Consumes: `CONFIG` depuis `../config`, classes `.animate-breathe`, `.animate-shimmer`, `.animate-scrollHint`, `.animate-fadeInUp` (index.css, Task 1).
- Produces: rien d'autre (section `#features` ciblée par le scroll indicator).

- [ ] **Step 1: Réécrire `src/components/Hero.tsx`**

```tsx
import React from 'react';
import { CONFIG } from '../config';

const primaryBtn: React.CSSProperties = {
  background: 'linear-gradient(135deg, #1D7195, #2898C8)',
  boxShadow: '0 4px 15px rgba(29, 113, 149, 0.3)',
  transition: 'all 200ms ease-out',
};

const ghostBtn: React.CSSProperties = {
  background: 'transparent',
  border: '1px solid rgba(29, 113, 149, 0.5)',
  color: '#4EAFC8',
  transition: 'all 200ms ease-out',
};

const Shimmer: React.FC = () => (
  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out" />
);

const Hero: React.FC = () => {
  return (
    <section
      className="relative overflow-hidden flex items-center justify-center"
      style={{ height: '100vh', minHeight: '600px', padding: '0 40px' }}
    >
      {/* Fond dégradé cyan qui respire */}
      <div
        className="absolute inset-0 pointer-events-none animate-breathe"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgba(29,113,149,0.35) 0%, rgba(29,113,149,0.08) 35%, transparent 70%)',
        }}
      />

      {/* Logo en arrière-plan avec opacité */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src="/assets/logo.svg"
          alt=""
          className="w-[600px] h-auto"
          style={{ opacity: 0.05 }}
          aria-hidden="true"
          loading="lazy"
        />
      </div>

      <div className="relative z-10 max-w-[1500px] mx-auto text-center">
        {/* Titre avec dégradé + halo + shimmer au chargement */}
        <h1
          className="text-7xl font-extrabold mb-5 animate-fadeInUp"
          style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, #1D7195 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 40px rgba(29, 113, 149, 0.25)',
          }}
        >
          ToneLab
        </h1>

        {/* Description */}
        <p
          className="text-xl text-text-secondary max-w-[600px] mx-auto mb-10 leading-relaxed animate-fadeInUp"
          style={{ animationDelay: '0.2s' }}
        >
          L'application de bureau complète pour les musiciens. Métronome, accordeur, gestion de setlists et plus encore.
        </p>

        {/* CTA group : Windows + Linux primaires, PWA ghost */}
        <div
          className="flex flex-col gap-3 justify-center items-center animate-fadeInUp"
          style={{ animationDelay: '0.4s' }}
        >
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center w-full sm:w-auto">
            <a
              href={`${CONFIG.DOWNLOAD_BASE_URL}/download/v${CONFIG.APP_VERSION}/ToneLab-${CONFIG.APP_VERSION}_windows.exe`}
              download={`ToneLab-${CONFIG.APP_VERSION}_windows.exe`}
              className="group relative px-6 py-2 rounded-lg font-semibold text-sm text-white inline-flex items-center gap-2 overflow-hidden"
              style={primaryBtn}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(29, 113, 149, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(29, 113, 149, 0.3)';
              }}
            >
              <Shimmer />
              <img src="/assets/icons/windows.svg" alt="Windows" className="w-5 h-5 brightness-0 invert" />
              Télécharger pour Windows
            </a>

            <a
              href={`${CONFIG.DOWNLOAD_BASE_URL}/download/v${CONFIG.APP_VERSION}/ToneLab-${CONFIG.APP_VERSION}_linux.deb`}
              download={`ToneLab-${CONFIG.APP_VERSION}_linux.deb`}
              className="group relative px-6 py-2 rounded-lg font-semibold text-sm text-white inline-flex items-center gap-2 overflow-hidden"
              style={primaryBtn}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(29, 113, 149, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(29, 113, 149, 0.3)';
              }}
            >
              <Shimmer />
              <img src="/assets/icons/linux.svg" alt="Linux" className="w-5 h-5 brightness-0 invert" />
              Télécharger pour Linux
            </a>
          </div>

          {/* PWA en ghost/outline */}
          <a
            href={CONFIG.PWA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 rounded-lg font-semibold text-sm inline-flex items-center gap-2"
            style={ghostBtn}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(29, 113, 149, 0.12)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(29, 113, 149, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Ouvrir la version PWA
          </a>
        </div>
      </div>

      {/* Indicateur de scroll */}
      <button
        onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-scrollHint text-text-muted hover:text-accent-primary"
        aria-label="Défiler vers les fonctionnalités"
        style={{ cursor: 'pointer', background: 'transparent', border: 'none' }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>
    </section>
  );
};

export default Hero;
```

- [ ] **Step 2: Vérifier le build**

Run: `cd ToneLab_landing-page && npm run build`
Expected: build OK (tsc + vite). Le shimmer se déclenche maintenant (classe `group` présente sur les `<a>`).

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat(landing): Hero modernisé — fond breathe, CTAs hiérarchisés (PWA ghost), scroll indicator"
```

---

### Task 4 — Features : grille 3D affinée (contenu conservé)

**Files:**
- Modify: `src/components/Features.tsx` (réécriture complète — SVG/titres/desc identiques)
- Consumes: classe `.feature-card` + `.feature-card::before` (index.css, Task 1)

**Interfaces:**
- Produces: rien (section `#features`). Les `connectionIcon` haut-droite conservées.

- [ ] **Step 1: Réécrire `src/components/Features.tsx`**

```tsx
import React from 'react';

interface Feature {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  connectionIcon?: string;
}

const features: Feature[] = [
  {
    id: "diapa",
    icon: (
      <img src="/assets/icons/diapa-tool.svg" alt="Diapa" className="w-7 h-7 brightness-0 invert" loading="lazy" />
    ),
    title: "Diapa",
    description: "Diapason avancé sous forme de clavier virtuel.",
  },
  {
    id: "stack",
    icon: (
      <img src="/assets/icons/stack-tool.svg" alt="Stack" className="w-7 h-7 brightness-0 invert" loading="lazy" />
    ),
    title: "Stack",
    description:
      "Recherche de sons et identité sonore via interface plugins et instruments.",
  },
  {
    id: "metro",
    icon: (
      <img src="/assets/icons/metro-tool.svg" alt="Metro" className="w-7 h-7 brightness-0 invert" loading="lazy" />
    ),
    title: "Metro",
    description:
      "Métronome avancé avec signaux visuels et auditifs précis.",
    connectionIcon: "/assets/features/metro-docv.svg",
  },
  {
    id: "setlist",
    icon: (
      <img src="/assets/icons/setlist-tool.svg" alt="Setlist" className="w-7 h-7 brightness-0 invert" loading="lazy" />
    ),
    title: "Setlist",
    description:
      "Permet de créer des setlists pour groupe de musique.",
    connectionIcon: "/assets/features/setlist-chrono.svg",
  },
  {
    id: "chrono",
    icon: (
      <img src="/assets/icons/chrono-tool.svg" alt="Chrono" className="w-7 h-7 brightness-0 invert" loading="lazy" />
    ),
    title: "Chrono",
    description:
      "Chronomètre précis pour chronométrer vos morceaux de musique.",
    connectionIcon: "/assets/features/chrono-setlist.svg",
  },
  {
    id: "docv",
    icon: (
      <img src="/assets/icons/docv-tool.svg" alt="DocV" className="w-7 h-7 brightness-0 invert" loading="lazy" />
    ),
    title: "DocV",
    description:
      "Visionneuse de documents (JPG, PNG, PDF) avec lecteur audio intégré : URL YouTube ou fichiers locaux mp3, wav, flac.",
    connectionIcon: "/assets/features/docv-metro.svg",
  },
];

const gridStyle: React.CSSProperties = { maxWidth: '1200px', margin: '0 auto' };

const cardStyle: React.CSSProperties = {
  background: 'rgba(26, 29, 39, 0.4)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  borderColor: 'rgba(29, 113, 149, 0.15)',
  transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
};

const iconContainerStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-light))',
  transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: 'none',
};

const Features: React.FC = () => {
  return (
    <section id="features" className="relative overflow-hidden py-20" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="relative z-10 max-w-[1200px] mx-auto px-4">
        <h2 className="text-4xl font-bold text-text-primary text-center mb-5">
          Fonctionnalités
        </h2>
        <p className="text-lg text-text-secondary text-center max-w-[600px] mx-auto mb-15 leading-relaxed">
          6 outils intégrés pour couvrir tous vos besoins musicaux
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" style={gridStyle}>
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="feature-card group relative p-8 rounded-2xl border animate-fadeInUp"
              style={{
                ...cardStyle,
                animationDelay: `${index * 0.08}s`,
              }}
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const rotateY = ((e.clientX - centerX) / rect.width) * 6;
                const rotateX = ((centerY - e.clientY) / rect.height) * 6;

                e.currentTarget.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
                e.currentTarget.style.borderColor = 'rgba(29, 113, 149, 0.5)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(29, 113, 149, 0.12)';

                const iconEl = e.currentTarget.querySelector(".icon-glow") as HTMLElement | null;
                if (iconEl) {
                  iconEl.style.boxShadow = '0 0 25px rgba(29, 113, 149, 0.5), 0 0 50px rgba(29, 113, 149, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(29, 113, 149, 0.15)';
                e.currentTarget.style.boxShadow = 'none';

                const iconEl = e.currentTarget.querySelector(".icon-glow") as HTMLElement | null;
                if (iconEl) {
                  iconEl.style.boxShadow = 'none';
                }
              }}
            >
              {feature.connectionIcon && (
                <img
                  src={feature.connectionIcon}
                  alt={`${feature.title} connection`}
                  className="absolute top-4 right-4 w-10 h-10 opacity-60 hover:opacity-100 transition-opacity"
                  style={{ filter: 'brightness(0) invert(1)' }}
                  loading="lazy"
                />
              )}
              <div
                className="w-[60px] h-[60px] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 icon-glow"
                style={iconContainerStyle}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">
                {feature.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {feature.description}
              </p>

              {/* Flèche "en savoir plus" au survol */}
              <span
                className="absolute bottom-5 right-5 text-accent-light opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
```

- [ ] **Step 2: Vérifier le build**

Run: `cd ToneLab_landing-page && npm run build`
Expected: build OK. Bordure animée + reveal staggered + glow + flèche fonctionnels en `npm run dev`.

- [ ] **Step 3: Commit**

```bash
git add src/components/Features.tsx
git commit -m "feat(landing): Features — bordure animée, reveal staggered, glow icône, flèche (contenu conservé)"
```

---

### Task 5 — Demo : cadre « fenêtre produit » + halo

**Files:**
- Modify: `src/components/Demo.tsx` (réécriture complète)
- Consumes: classe `.animate-glowPulse` (index.css, Task 1)

**Interfaces:**
- Produces: rien (section `#demo`).

- [ ] **Step 1: Réécrire `src/components/Demo.tsx`**

```tsx
import React from 'react';

const sectionStyle: React.CSSProperties = {
  backgroundColor: 'var(--bg-primary)',
  padding: '100px 40px',
};

const videoWrapperStyle: React.CSSProperties = {
  position: 'relative' as const,
  width: '100%',
  paddingTop: '56.25%',
};

const Demo: React.FC = () => {
  return (
    <section id="demo" className="relative overflow-hidden" style={sectionStyle}>
      <div className="relative z-10 max-w-[1200px] mx-auto">
        <h2 className="text-4xl font-bold text-text-primary text-center mb-5">
          Démo
        </h2>
        <p className="text-lg text-text-secondary text-center max-w-[600px] mx-auto mb-15 leading-relaxed">
          Découvrez ToneLab en action avec cette vidéo de démonstration
        </p>

        {/* Conteneur "fenêtre produit" avec halo */}
        <div
          className="max-w-[1000px] mx-auto rounded-2xl overflow-hidden animate-glowPulse"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-medium)',
          }}
        >
          {/* Chrome de fenêtre */}
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{ background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-subtle)' }}
          >
            <span className="w-3 h-3 rounded-full" style={{ background: '#2A3044' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#3D8FA8' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#4EAFC8' }} />
            <span className="ml-3 text-text-muted text-xs">Démo — ToneLab</span>
          </div>

          <div style={videoWrapperStyle}>
            <video
              className="absolute top-0 left-0 w-full h-full"
              src="https://res.cloudinary.com/dmj4wyxcw/video/upload/v1779187633/Demo02_dmngg8.mov"
              title="Démonstration de ToneLab"
              controls
              controlsList="nodownload"
              muted
              autoPlay
              loop
              playsInline
              disablePictureInPicture
              style={{ backgroundColor: 'var(--bg-primary)' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;
```

- [ ] **Step 2: Vérifier le build**

Run: `cd ToneLab_landing-page && npm run build`
Expected: build OK.

- [ ] **Step 3: Commit**

```bash
git add src/components/Demo.tsx
git commit -m "feat(landing): Demo — chrome fenêtre + halo glowPulse"
```

---

### Task 6 — Download : icône lucide + layout affiné

**Files:**
- Modify: `src/components/Download.tsx` (réécriture complète)
- Consumes: `CONFIG` depuis `../config`, `Download` depuis `lucide-react`

**Interfaces:**
- Produces: rien (section `#download`).

- [ ] **Step 1: Réécrire `src/components/Download.tsx`**

```tsx
import React from 'react';
import { Download as DownloadIcon } from 'lucide-react';
import { CONFIG } from '../config';

const sectionStyle: React.CSSProperties = {
  backgroundColor: 'var(--bg-primary)',
  padding: '100px 40px',
  textAlign: 'center',
};

const cardStyle: React.CSSProperties = {
  background: 'var(--bg-primary)',
  border: '1px solid var(--border-medium)',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 80px rgba(29, 113, 149, 0.1)',
  transition: 'all 200ms ease-out',
};

const iconContainerStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-light))',
  boxShadow: '0 10px 30px rgba(29, 113, 149, 0.4)',
};

const primaryButtonStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-light))',
  boxShadow: '0 10px 30px rgba(29, 113, 149, 0.4)',
  transition: 'all 200ms ease-out',
  cursor: 'pointer',
};

const Download: React.FC = () => {
  return (
    <section id="download" className="relative overflow-hidden" style={sectionStyle}>
      <div className="relative z-10 max-w-[600px] mx-auto">
        <h2 className="text-4xl font-bold text-text-primary mb-5">
          Télécharger
        </h2>
        <p className="text-lg text-text-secondary max-w-[600px] mx-auto mb-15 leading-relaxed">
          Obtenez ToneLab dès maintenant et commencez à améliorer votre pratique musicale
        </p>

        <div
          className="rounded-2xl p-[52px]"
          style={cardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 30px 80px rgba(0, 0, 0, 0.5), 0 0 100px rgba(29, 113, 149, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(29, 113, 149, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 80px rgba(29, 113, 149, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(29, 113, 149, 0.3)';
          }}
        >
          <div className="w-[80px] h-[80px] rounded-2xl flex items-center justify-center mx-auto mb-8" style={iconContainerStyle}>
            <DownloadIcon size={32} className="text-white" />
          </div>

          <a
            href={`${CONFIG.DOWNLOAD_BASE_URL}/download/v${CONFIG.APP_VERSION}/ToneLab-${CONFIG.APP_VERSION}_windows.exe`}
            download={`ToneLab-${CONFIG.APP_VERSION}_windows.exe`}
            aria-label={`Télécharger ToneLab v${CONFIG.APP_VERSION} pour Windows (133 MB, compatible 10/11 64-bit)`}
            className="flex items-center justify-center gap-3 w-full px-6 py-2 rounded-lg font-semibold text-sm text-white mb-3"
            style={primaryButtonStyle}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(29, 113, 149, 0.2)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(29, 113, 149, 0.4)'; }}
          >
            <img src="/assets/icons/windows.svg" alt="Windows" className="w-5 h-5 brightness-0 invert" />
            Télécharger pour Windows
          </a>

          <a
            href={`${CONFIG.DOWNLOAD_BASE_URL}/download/v${CONFIG.APP_VERSION}/ToneLab-${CONFIG.APP_VERSION}_linux.deb`}
            download={`ToneLab-${CONFIG.APP_VERSION}_linux.deb`}
            aria-label={`Télécharger ToneLab v${CONFIG.APP_VERSION} pour Linux (Debian/Ubuntu 64-bit)`}
            className="flex items-center justify-center gap-3 w-full px-6 py-2 rounded-lg font-semibold text-sm text-white mb-5"
            style={primaryButtonStyle}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(29, 113, 149, 0.2)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(29, 113, 149, 0.4)'; }}
          >
            <img src="/assets/icons/linux.svg" alt="Linux" className="w-5 h-5 brightness-0 invert" />
            Télécharger pour Linux
          </a>

          <div className="text-text-secondary text-sm mb-8 leading-relaxed">
            <strong className="text-text-primary">Version {CONFIG.APP_VERSION}</strong> • 133 MB<br />
            Compatible Windows 10/11 (64-bit) • Linux Debian/Ubuntu (64-bit)
          </div>

          <a
            href={CONFIG.PWA_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ouvrir ToneLab en version PWA (Progressive Web App)"
            className="inline-block px-[40px] py-4 rounded-xl font-semibold text-lg"
            style={{
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-light))',
              boxShadow: '0 10px 30px rgba(29, 113, 149, 0.4)',
              transition: 'all 200ms ease-out',
              cursor: 'pointer',
              color: 'white',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(29, 113, 149, 0.2)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(29, 113, 149, 0.4)'; }}
          >
            Ouvrir la version PWA
          </a>
        </div>
      </div>
    </section>
  );
};

export default Download;
```

- [ ] **Step 2: Vérifier le build**

Run: `cd ToneLab_landing-page && npm run build`
Expected: build OK (import `lucide-react` valide, `DownloadIcon` typé).

- [ ] **Step 3: Commit**

```bash
git add src/components/Download.tsx
git commit -m "feat(landing): Download — icône lucide Download, layout affiné"
```

---

### Task 7 — Footer : bugfix + polish + AudioBars

**Files:**
- Modify: `src/components/Footer.tsx` (réécriture complète)
- Consumes: `CONFIG` depuis `../config`, `Mail` depuis `lucide-react`, `AudioBars` depuis `./AudioBars` (Task 2)

**Interfaces:**
- Produces: rien.

- [ ] **Step 1: Réécrire `src/components/Footer.tsx`**

```tsx
import React from 'react';
import { Mail } from 'lucide-react';
import { CONFIG } from '../config';
import AudioBars from './AudioBars';

const Footer: React.FC = () => {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-primary)',
        padding: '20px 40px 15px',
        borderTop: '1px solid var(--border-medium)',
      }}
    >
      {/* Liseré cyan lumineux en haut */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(29,113,149,0.6), transparent)' }}
      />

      <div className="relative z-10 max-w-[1500px] mx-auto">
        <div className="flex justify-between items-start flex-wrap gap-10 mb-8">
          {/* Brand */}
          <div className="flex-1 min-w-[250px]">
            <div className="flex items-center gap-3 mb-4">
              <img src="/assets/logo.svg" alt="ToneLab" className="h-8 w-auto" loading="lazy" />
              <div className="flex flex-col">
                <span className="text-text-primary text-lg font-bold leading-none">ToneLab</span>
                <span className="text-text-muted text-xs">v{CONFIG.APP_VERSION}</span>
              </div>
            </div>
            {/* Mini barres audio (unique endroit autorisé) */}
            <AudioBars bars={18} />
          </div>

          {/* Links */}
          <div className="flex gap-8 flex-wrap">
            <div>
              <h4 className="text-text-primary text-sm font-semibold mb-4 uppercase tracking-wider">Liens</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href={`${CONFIG.DOWNLOAD_BASE_URL}/download/v${CONFIG.APP_VERSION}/ToneLab-${CONFIG.APP_VERSION}_windows.exe`}
                    download={`ToneLab-${CONFIG.APP_VERSION}_windows.exe`}
                    className="group relative text-text-secondary text-sm hover:text-accent-primary transition-colors duration-300 inline-flex items-center gap-2"
                  >
                    Télécharger
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent-primary transition-all duration-500 ease-out group-hover:w-full" />
                  </a>
                </li>
                <li>
                  <a
                    href={CONFIG.PWA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative text-text-secondary text-sm hover:text-accent-primary transition-colors duration-300 inline-flex items-center gap-2"
                  >
                    Version PWA
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent-primary transition-all duration-500 ease-out group-hover:w-full" />
                  </a>
                </li>
                <li>
                  <a
                    href="#features"
                    className="group relative text-text-secondary text-sm hover:text-accent-primary transition-colors duration-300 inline-flex items-center gap-2"
                  >
                    Documentation
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent-primary transition-all duration-500 ease-out group-hover:w-full" />
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-text-primary text-sm font-semibold mb-4 uppercase tracking-wider">Communauté</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href={CONFIG.GITHUB_REPO}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary text-sm hover:text-accent-primary transition-colors inline-flex items-center gap-2"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-4 pt-4 border-t border-[var(--border-subtle)] flex justify-between items-center flex-wrap gap-4">
          <div className="text-text-muted text-sm">
            © {new Date().getFullYear()} ToneLab. Tous droits réservés.
          </div>
          <div className="flex gap-4">
            <a
              href={CONFIG.GITHUB_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-text-secondary hover:text-accent-primary hover:bg-[rgba(29,113,149,0.2)] transition-all"
              style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}
              aria-label="GitHub"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            </a>
            <a
              href={`mailto:${CONFIG.CONTACT_EMAIL}`}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-text-secondary hover:text-accent-primary hover:bg-[rgba(29,113,149,0.2)] transition-all"
              style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}
              aria-label="Contact par email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

- [ ] **Step 2: Vérifier le build**

Run: `cd ToneLab_landing-page && npm run build`
Expected: build OK. `mailto:` pointe vers `contact@tonelab.com` (interpolation corrigée), hover social en cyan.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "fix(landing): Footer — mailto interpolé, hover cyan, liseré glow + AudioBars"
```

---

### Task 8 — Topbar : scrollspy

**Files:**
- Modify: `src/components/Topbar.tsx` (réécriture complète)
- Consumes: `CONFIG` depuis `../config`

**Interfaces:**
- Produces: rien (les liens appellent `scrollToSection`).

- [ ] **Step 1: Réécrire `src/components/Topbar.tsx`**

```tsx
import React, { useEffect, useState } from 'react';
import { CONFIG } from '../config';

const SECTIONS = ['features', 'demo', 'download'] as const;
type SectionId = (typeof SECTIONS)[number];

const Topbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id as SectionId);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMenuOpen(false);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  const linkStyle = (id: SectionId): React.CSSProperties => ({
    cursor: 'pointer',
    transition: 'color 0.3s ease-out, transform 0.2s ease-out',
    color: active === id ? 'var(--accent-light)' : undefined,
  });

  const renderLink = (id: SectionId, label: string) => (
    <button
      onClick={() => scrollToSection(id)}
      style={linkStyle(id)}
      className={`text-sm hover:text-accent-primary ${active === id ? 'text-accent-light' : 'text-text-muted'}`}
    >
      {label}
    </button>
  );

  return (
    <nav
      className="sticky top-0 z-50 animate-slideDown"
      style={{
        backgroundColor: 'rgba(26, 29, 39, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(29, 113, 149, 0.3)',
      }}
    >
      <div className="max-w-[1500px] mx-auto px-4 sm:px-10 py-4 flex items-center justify-between">
        <button onClick={scrollToTop} className="flex items-center gap-3 focus:outline-none" style={{ cursor: 'pointer' }} aria-label="Retour à l'accueil">
          <img src="/assets/logo.svg" alt="ToneLab" className="h-8 w-auto" loading="lazy" style={{ cursor: 'pointer' }} />
          <div className="flex flex-col">
            <span className="text-text-primary text-lg font-bold leading-none">ToneLab</span>
            <span className="text-text-muted text-xs">v{CONFIG.APP_VERSION}</span>
          </div>
        </button>

        <div className="hidden md:flex items-center gap-6">
          {renderLink('features', 'Fonctionnalités')}
          {renderLink('demo', 'Démo')}
          {renderLink('download', 'Télécharger')}
        </div>

        <button className="md:hidden p-2 text-text-primary" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" style={{ cursor: 'pointer' }}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 py-4" style={{ borderTop: '1px solid rgba(29, 113, 149, 0.2)' }}>
          <button onClick={() => scrollToSection('features')} className="block w-full text-left py-2 text-sm hover:text-accent-primary transition-colors text-text-muted" style={{ cursor: 'pointer' }}>Fonctionnalités</button>
          <button onClick={() => scrollToSection('demo')} className="block w-full text-left py-2 text-sm hover:text-accent-primary transition-colors text-text-muted" style={{ cursor: 'pointer' }}>Démo</button>
          <button onClick={() => scrollToSection('download')} className="block w-full text-left py-2 text-sm hover:text-accent-primary transition-colors text-text-muted" style={{ cursor: 'pointer' }}>Télécharger</button>
        </div>
      )}
    </nav>
  );
};

export default Topbar;
```

- [ ] **Step 2: Vérifier le build**

Run: `cd ToneLab_landing-page && npm run build`
Expected: build OK. `App.tsx` n'a pas besoin de changer (les sections gardent leurs `id`).

- [ ] **Step 3: Commit**

```bash
git add src/components/Topbar.tsx
git commit -m "feat(landing): Topbar — scrollspy (section active surlignée)"
```

---

### Task 9 — Vérification finale globale

**Files:** aucun (contrôle)

- [ ] **Step 1: Lint + build complets**

Run: `cd ToneLab_landing-page && npm run lint && npm run build`
Expected: lint propre, build OK (`tsc -b` strict passé).

- [ ] **Step 2: Contrôle visuel (`npm run dev`)**

Run: `cd ToneLab_landing-page && npm run dev` puis ouvrir http://localhost:5173
Vérifier :
- Hero : fond cyan respire, PAS de barres audio, CTA Windows/Linux primaires + PWA ghost, shimmer au survol, scroll indicator.
- Features : SVG/titres/desc identiques, bordure animée au survol, reveal staggered, glow icône, flèche.
- Demo : chrome fenêtre + halo.
- Download : icône lucide (pas d'emoji), hover OK.
- Footer : `mailto:contact@tonelab.com` fonctionne, hover social cyan, liseré glow + barres audio.
- Topbar : la section courante est surlignée au scroll.
- `prefers-reduced-motion` : animations lourdes désactivées.

- [ ] **Step 3: Commit de suivi (si ajustements visuels nécessaires)**

```bash
git add -A
git commit -m "style(landing): ajustements visuels post-modernisation"
```

(Ne committer que si des retouches sont faites.)
