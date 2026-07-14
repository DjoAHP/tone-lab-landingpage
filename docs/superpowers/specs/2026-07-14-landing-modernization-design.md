# Design — Modernisation ToneLab Landing Page

> Spec validé le 2026-07-14. Refonte moderne de la landing page, en **CSS pur** (aucune dépendance ajoutée), charte cyan existante conservée.

## 1. Contexte & objectif

La landing page (`ToneLab_landing-page`, React 19 + Vite + Tailwind v4) fonctionne mais son rendu est daté. Objectif : moderniser le **design, les animations et le placement** sans toucher à la charte (dark + accent cyan) ni au concept. L'utilisateur a validé :

- Niveau d'ambition : **Refonte moderne** (restructurer le rendu, pas les sections).
- Moteur d'animation : **CSS pur** (CSS + IntersectionObserver existant, amélioré). Aucune lib (Framer Motion / GSAP) ajoutée.
- Sections : les **5 sections conservées** (Hero, Features, Demo, Download, Footer) + Topbar.

### Ajustements explicites demandés par l'utilisateur

- **Hero** : PAS de motif de barres audio animé. On garde uniquement le fond dégradé cyan qui « respire » + shimmer + indicateur de scroll.
- **Features** : les **SVG existants, titres et descriptions sont 100% conservés**. On ne modifie que le style/les animations (bordure animée, reveal staggered, glow, flèche).
- Demo / Download / Footer / Topbar : validés tels quels.

## 2. Fondations transverses

- **Aucune nouvelle dépendance.** On garde Tailwind v4 + variables CSS `:root` (dans `src/index.css`) + styles inline.
- **Nouvelles keyframes** dans `src/index.css` :
  - `breathe` — pulsation du dégradé cyan de fond (opacity + scale léger, ~7 s, ease-in-out infinite).
  - `shimmer` — balayage lumineux (déjà en partie inline, promu en classe CSS réutilisable `.animate-shimmer`).
  - `glowPulse` — halo cyan doux pour les cartes/conteneurs.
  - `scrollHint` — mouvement vertical du chevron indicateur de scroll.
- **Accessibilité** : `@media (prefers-reduced-motion: reduce)` coupe les animations lourdes (breathe, glowPulse, scrollHint, tilt).
- **Cohérence couleurs** : on garde les valeurs cyan actuelles (`--accent-primary: #1D7195`, `--accent-light: #2898C8`). Aucun nouveau hash.
- **Corrections de bugs existants** (dans le scope de la modernisation) :
  - `Hero.tsx` : le `<span>` shimmer porte `group-hover:` mais le `<a>` parent n'a pas la classe `group` → le shimmer ne se déclenche jamais. Ajouter `group` au bouton.
  - `Footer.tsx` : `href="mailto:{CONFIG.CONTACT_EMAIL}"` est une chaîne littérale (interpolation manquante) → corriger en `mailto:{CONFIG.CONTACT_EMAIL}` réel via template string.
  - `Footer.tsx` : hover des icônes sociales utilise `rgba(43,79,67,0.2)` (vert, hors charte) → remplacer par un cyan `rgba(29,113,149,0.2)`.

## 3. Hero — centré + fond animé (sans barres audio)

- **Fond animé** : couche `absolute inset-0` avec grand dégradé radial cyan, `animation: breathe`. Opacité/scale doux, non perturbateur de la lisibilité.
- **Titre « ToneLab »** : dégradé existant conservé + léger halo (`text-shadow`) + balayage `shimmer` au chargement.
- **Description** : conservée.
- **CTAs** : hiérarchie clarifiée.
  - Windows + Linux = boutons **primaires** (gradient cyan), côte à côte en `flex` (ou empilés sur mobile).
  - PWA = bouton **ghost/outline** (bordure cyan, fond transparent) en dessous — hiérarchie visuelle claire.
  - Shimmer corrigé (classe `group` ajoutée).
- **Indicateur de scroll** : chevron animé (`scrollHint`) en bas du hero, `aria-hidden`, lien vers `#features`.

## 4. Features — grille 3D affinée (contenu conservé)

- Grille 3 colonnes + 6 outils **conservée**. Les `connectionIcon` (haut-droite) sont conservées (plus-value : montrent l'interconnexion des outils).
- **Contenu figé** : `icon` (SVG existants), `title`, `description` — AUCUNE modification de texte ni de SVG.
- **Reveal staggered** : délai par carte au scroll (via `ScrollReveal` existant ou `transitionDelay` par index).
- **Bordure animée au survol** : liseré cyan qui s'« allume » (technique `::before` + masque ou glow border via box-shadow). Tilt 3D conservé et adouci.
- **Glow icône** intensifié au hover + petite flèche « en savoir plus » qui apparaît (éléments décoratifs, pas de changement de contenu).

## 5. Demo — cadre « fenêtre produit »

- Vidéo 16:9 conservée (autoplay / loop / muted / controls).
- **Chrome de fenêtre** stylisé autour (3 pastilles + libellé « Démo ») pour un look app moderne.
- **Halo cyan** doux projeté derrière le conteneur + reveal au scroll (déjà via `ScrollReveal`).

## 6. Download — carte premium

- Carte conservée, plus mise en avant (halo glow).
- Icône ⬇ emoji → **icône `Download` de lucide-react** (déjà dépendance installée) pour cohérence pro.
- Options OS en cartes claires + PWA en ghost. Infos version conservées.

## 7. Footer — polish + bugfix

- Bugs `mailto` + hover vert corrigés (voir §2).
- Liseré cyan lumineux en haut + mini-motif de barres audio **discret** (unique endroit où le motif barres audio est autorisé, suite à la validation « Footer ok »).

## 8. Topbar — scrollspy (bonus)

- **Scrollspy** : la section courante est surlignée dans la nav (utile + moderne). Implémenté via `IntersectionObserver` sur les sections `features` / `demo` / `download`.

## 9. Plan de fichiers

| Fichier | Action |
|---------|--------|
| `src/index.css` | Ajout keyframes (`breathe`, `shimmer`, `glowPulse`, `scrollHint`) + `@media reduced-motion` + tokens |
| `src/components/Hero.tsx` | Fond animé `breathe`, CTAs hiérarchisés (PWA ghost), `group` + `shimmer`, indicateur de scroll. **Pas de barres audio** |
| `src/components/Features.tsx` | Bordure animée, reveal staggered, glow icône, flèche. **SVG/titres/desc conservés** |
| `src/components/Demo.tsx` | Chrome fenêtre + halo cyan |
| `src/components/Download.tsx` | Icône lucide `Download`, layout affiné, halo |
| `src/components/Footer.tsx` | Bugfix `mailto` + hover cyan, liseré glow + mini barres audio |
| `src/components/Topbar.tsx` | Scrollspy (section active surlignée) |
| `src/components/AudioBars.tsx` | Nouveau composant réutilisable (utilisé **uniquement** en Footer) |
| `src/App.tsx` | Câblage des wrappers / sections (si nécessaire) |

## 10. Sauvegarde & restauration

- **Sauvegarde effectuée avant toute modification** :
  - Copie `src.backup-2026-07-14/` (contient `src/`, `index.html`, `index.css`).
  - Tag git `pre-modernisation` sur `ToneLab_landing-page`.
- **Restauration** (si résultat non satisfaisant) :
  - `cp -r src.backup-2026-07-14/src ./src && cp src.backup-2026-07-14/index.html ./index.html && cp src.backup-2026-07-14/index.css ./src/index.css`
  - ET/OU `git checkout pre-modernisation -- .` puis `git tag -d pre-modernisation`.

## 11. Vérification

- `npm run lint` (eslint) — propre.
- `npm run build` (`tsc -b && vite build`) — le typecheck strict doit passer (pas d'`any`, `import type` pour types, pas d'unused).
- Contrôle visuel manuel (`npm run dev`) : Hero (fond respire, pas de barres audio), Features (bordures/glow au survol, contenu identique), Demo (chrome fenêtre), Download (icône lucide), Footer (mailto OK, hover cyan), Topbar (scrollspy).
- `prefers-reduced-motion` : animations lourdes désactivées.

## 12. Hors scope (YAGNI)

- Pas de nouvelle section (stats, étapes, FAQ).
- Pas de mode clair.
- Pas de librairie d'animation externe.
- Pas de modification de `config.ts` (version/URL).
