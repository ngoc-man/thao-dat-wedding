# Phase 01 — Foundation and Content Contract

## Context Links

- [Plan overview](./plan.md)

## Overview

- Priority: P1; status: Pending; effort: 5h; depends on: none.
- Establish the smallest stable toolchain, design tokens, typed content, and final asset contract.

## Key Insights

- Static content meets the journey; backend/CMS adds no required value.
- Image dimensions, alt text, ratio, and focal point belong in content metadata.
- Fonts must cover Vietnamese glyphs when Vietnamese copy is used.

## Requirements

- Vite + React + TypeScript; Tailwind CSS and Framer Motion; ESLint, Vitest, Testing Library, Playwright.
- Central data for names, explicit event instant/timezone, address, HTTPS map URL, couple cards, 10 photos, 2 gifts, thank-you copy.
- Cream/beige/rose-gold tokens for color, typography, spacing, radius, shadow, focus.
- Optimized local images and recipient-verified QR files; no launch placeholders.

## Architecture

```text
copy/assets → wedding-data.ts → typed props → sections
event instant + timezone → Phase 2 countdown → clamped units
```

Target layout: `src/{content,types,styles,components,features,hooks}/`, `public/images/{hero,couple,gallery,gifts}/`, `tests/{unit,integration,e2e}/`.

## Related Code Files

- Create: `/mnt/c/Users/nguyen.ngoc.man/Desktop/WD_DAT/package.json`, Vite/TypeScript/Tailwind/ESLint config, `index.html`.
- Create: `/mnt/c/Users/nguyen.ngoc.man/Desktop/WD_DAT/src/{main.tsx,app.tsx}`.
- Create: `/mnt/c/Users/nguyen.ngoc.man/Desktop/WD_DAT/src/styles/globals.css`, `src/types/wedding.ts`, `src/content/wedding-data.ts`.
- Create: `/mnt/c/Users/nguyen.ngoc.man/Desktop/WD_DAT/public/images/**`.
- Modify/delete: none.

## Implementation Steps

1. Scaffold React TypeScript in the workspace root; add only named dependencies and standard scripts.
2. Define semantic base styles, visible focus, responsive tokens, and reduced-motion fallback.
3. Create strict content types and one content module; never duplicate wedding facts in JSX.
4. Store image width/height, alt, aspect, focal point; prepare responsive AVIF/WebP/JPEG where practical.
5. Prioritize only hero media; lazy-load below-fold images.
6. Confirm event timezone and scan each QR on two physical devices with its account owner.

## Todo List

- [ ] Toolchain compiles
- [ ] Tokens and semantic shell exist
- [ ] Typed data covers all requested content
- [ ] Ten photos and two verified QR assets are mapped

## Success Criteria

- `npm install`, `npm run lint`, and `npm run build` exit 0.
- Types reject incomplete gallery/gift/accessibility metadata.
- No placeholder or hotlinked image reaches the production artifact.

## Risk Assessment

| Risk | Likelihood/Impact | Countermove |
|---|---|---|
| Late/inconsistent final assets | High/High | Make manifest and target ratios the handoff contract; block release until final. |
| Wrong QR recipient | Low/High | Account-owner verification plus two-device scans. |
| Heavy media slows first paint | High/High | Responsive formats, reserved dimensions, lazy loading, measured image budget. |

## Security Considerations

- No secrets, bank text, forms, guest data, or third-party scripts.
- Allow only approved HTTPS external URLs; QR is a local display asset.

## Rollback and Next Steps

- Roll back manifest and lockfile together; no persistent data exists.
- Phase 2 waits for compiled types plus approved copy, timezone, tokens, and asset list.

