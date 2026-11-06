# Design verification set — Cyber-Industrial pass

Captured from the production build (`next start`) at 390 / 768 / 1440 px.
Each route is filed as `<route>-<width>.png`.

| Route | 390 | 768 | 1440 |
|---|---|---|---|
| `/` | `home-390.png` | `home-768.png` | `home-1440.png` |
| `/project` | `project-390.png` | `project-768.png` | `project-1440.png` |
| `/article` | `article-390.png` | `article-768.png` | `article-1440.png` |
| `/article/[slug]` | `article-detail-390.png` | `article-detail-768.png` | `article-detail-1440.png` |
| `/experience` | `experience-390.png` | `experience-768.png` | `experience-1440.png` |

## Recorded checks for this set

- 15/15 route×width pairs render an `<h1>` and report `scrollWidth === innerWidth` (no horizontal overflow).
- Home DOM order: Hero → About → "What i've build" → "What i work with" → Experience → Articles.
- Colours resolve from `src/styles/tokens.css`; no hex literals remain in the public component set.
- Reduced motion: transitions ≈0 s, `animation-name: none`, carousel autoplay halted, modal opens without scale.
- Lighthouse (mobile, production build): `/` = 100 performance / 100 accessibility, `/article` = 90 / 100.

## Visual review checklist

| Check | Result |
|---|---|
| Generic purple→blue gradient | none |
| Glassmorphism surfaces per page | 0 on pages (only the two dialogs) |
| Emoji in headings | none |
| Body text contrast ≥ 4.5:1 | pass (axe `color-contrast` = 1.0) |
| Orphaned single-item rows | none (`/project` last card spans both columns) |
| Section spacing from the token scale | pass (`.section-stack` → `--space-7/--space-9`) |
