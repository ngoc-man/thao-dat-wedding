# Phase 03 — Quality Gates and Release

## Context Links

- [Plan overview](./plan.md)
- [Page implementation](./phase-02-page-sections-and-interactions.md)

## Overview

- Priority: P1; status: Pending; effort: 4h; depends on: Phase 2.
- Prove behavior, accessibility, responsiveness, performance, and rollback readiness on production output.

## Key Insights

- Static UI still fails through wrong dates, inaccessible dialogs, broken links, or oversized media.
- Test user contracts, not broad markup snapshots.
- Phase 3 owns tests/config only; application fixes return to the owning phase.

## Requirements

- Unit: countdown boundaries and gallery index helpers.
- Integration: counts, landmarks, map safety, lightbox keyboard/focus, elapsed state.
- End-to-end: primary mobile/desktop journey against local production preview.
- Automated accessibility plus manual keyboard, focus, contrast, zoom, and reduced-motion checks.
- Performance and asset-response checks; deployment smoke and immutable rollback artifact.

## Architecture

```text
fixture + fake clock → unit/integration assertions
production preview → Playwright → journey/screenshots/accessibility
immutable artifact → host smoke → promote or restore previous artifact
```

## Related Code Files

- Create: `/mnt/c/Users/nguyen.ngoc.man/Desktop/WD_DAT/vitest.config.ts`, `playwright.config.ts`, `tests/setup.ts`.
- Create: `/mnt/c/Users/nguyen.ngoc.man/Desktop/WD_DAT/tests/unit/**`, `tests/integration/**`, `tests/e2e/wedding-journey.spec.ts`.
- Modify product files: none; reassign defects to Phase 1 or 2.
- Delete: none.

## Implementation Steps

1. Configure deterministic timezone, fake timers, jsdom, Testing Library, and accessibility scan.
2. Test one second before, at, and after event; gallery wrap; exactly 10 photos and 2 gifts.
3. Test lightbox open/close, arrows, focus trap/return, labels, and body scroll restoration.
4. Run Playwright on mobile and desktop Chromium; add WebKit smoke when CI capacity permits.
5. Validate anchors, section order, map attributes, all images, QR visibility, and zero console/page errors.
6. Review 320/768/1440px screenshots, 200% zoom, landscape, reduced motion, and slow image loading.
7. Run Lighthouse three times on a fixed profile; use median. Retain prior static artifact before deployment.

## Todo List

- [ ] Unit and integration contracts pass
- [ ] Mobile and desktop E2E pass on production preview
- [ ] Accessibility and responsive evidence is clean
- [ ] Build and performance targets pass
- [ ] Rollback is rehearsed

## Success Criteria

- `npm run lint`, `npm run test -- --run`, `npm run build`, `npm run test:e2e` exit 0.
- No broken assets or uncaught browser errors.
- Zero serious/critical accessibility findings; manual keyboard journey completes.
- Lighthouse median reaches Performance ≥90 and Accessibility ≥95 on fixed profile.

## Risk Assessment

| Risk | Likelihood/Impact | Countermove |
|---|---|---|
| Browser variance breaks dialog/layout | Medium/High | Chromium mobile/desktop plus WebKit smoke; native semantics and CSS fallbacks. |
| Performance score fluctuates | High/Medium | Fixed profile, three runs, median, asset-size tracking. |
| Tests pass with placeholder content | Medium/High | Assert exact counts and fail on placeholder markers or asset errors. |
| Bad artifact replaces good deployment | Low/High | Immutable artifacts, smoke before promote, atomic rollback. |

## Security Considerations

- Triage reachable production dependency findings; do not weaken tests.
- Confirm no secrets, environment files, unapproved identifiers, or production source maps in output.
- On the selected host, verify HTTPS, MIME types, referrer/frame policy, and a minimal CSP.

## Rollback and Next Steps

- Atomically restore previous artifact; no database/cache migration exists.
- Preserve failing output, return defects to owning phase, rebuild, and rerun every gate.
- Custom domain, analytics, RSVP, CMS, music, and social sharing stay separate scope.

