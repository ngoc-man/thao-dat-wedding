# Phase 02 — Page Sections and Interactions

## Context Links

- [Plan overview](./plan.md)
- [Foundation](./phase-01-foundation-and-content-contract.md)

## Overview

- Priority: P1; status: Pending; effort: 9h; depends on: Phase 1.
- Deliver the full one-page journey with accessible, restrained interactions.

## Key Insights

- One `App` and small sections are enough; no router or global state library.
- Countdown and lightbox are the only stateful features.
- Photography, typography, spacing, and pacing create luxury—not ornament or continuous motion.

## Requirements

- Full-screen hero with image, names, date, countdown, scroll cue.
- Two couple cards; event time/address and safe map link; 10-photo gallery/lightbox.
- Two labeled QR gift cards; bride-and-groom thank-you.
- Mobile-first anchor scrolling, viewport-safe hero, 44px touch targets, reduced-motion support.
- Lightbox supports close, previous/next, wrapping, Escape/arrows, focus trap/return, scroll lock.

## Architecture

```text
App
├─ Hero → eventAt → useCountdown(now) → units / elapsed state
├─ Couple → couple[] → cards
├─ Event → details + map link
├─ Gallery → photos[] + selectedIndex → lightbox
├─ Gift → gifts[] → cards
└─ ThankYou → signed copy
```

Files: `components/layout/{page-shell,section-shell}.tsx`, `components/sections/*-section.tsx`, `components/ui/{couple-card,gift-card,section-heading}.tsx`, `features/countdown/**`, `features/gallery/**`, `hooks/use-reduced-motion.ts`.

## Related Code Files

- Create: `/mnt/c/Users/nguyen.ngoc.man/Desktop/WD_DAT/src/components/{layout,sections,ui}/**`.
- Create: `/mnt/c/Users/nguyen.ngoc.man/Desktop/WD_DAT/src/features/{countdown,gallery}/**`, `src/hooks/use-reduced-motion.ts`.
- Modify: `/mnt/c/Users/nguyen.ngoc.man/Desktop/WD_DAT/src/app.tsx` after Phase 1 handoff.
- Delete: none.

## Implementation Steps

1. Build shared section/heading/card primitives; keep code files below 200 lines.
2. Compose semantic sections in narrative order with stable IDs and scroll margins.
3. Implement pure countdown math plus a one-second clock; clamp negatives and show an elapsed message.
4. Render all static sections from typed content.
5. Render responsive thumbnails with dimensions and lazy loading; build an accessible dialog lightbox.
6. Add transform/opacity reveals only; disable nonessential motion via media preference.
7. Inspect 320/375/768/1024/1440px, landscape mobile, long copy, safe areas, and all photo crops.

## Todo List

- [ ] Six sections render from central data
- [ ] Countdown covers future/zero/elapsed states
- [ ] Ten-photo lightbox is keyboard and touch operable
- [ ] Map and two QR cards use approved content
- [ ] Responsive and reduced-motion behavior is complete

## Success Criteria

- Guest completes hero-to-thanks journey without a route change or dead end.
- Gallery wraps; Escape closes; focus returns to its trigger.
- Countdown honors configured timezone and never shows negative values.
- No horizontal overflow; all controls meet 44×44px target.

## Risk Assessment

| Risk | Likelihood/Impact | Countermove |
|---|---|---|
| Timezone/DST produces wrong countdown | Medium/High | Explicit ISO instant and IANA zone; fake-clock boundary tests. |
| Lightbox traps or loses focus | Medium/High | Dialog semantics, explicit focus lifecycle, keyboard integration tests. |
| Motion causes nausea/jank | Medium/Medium | Reduced-motion contract; short transform/opacity animation; no scroll-jacking. |
| Crops hide faces | High/Medium | Per-image focal metadata and breakpoint review. |

## Security Considerations

- New-tab map link uses `rel="noopener noreferrer"`.
- Never render raw HTML or runtime-provided URLs/content.

## Rollback and Next Steps

- Revert Phase 2 as one unit or detach a section from `App`; Phase 1 shell still compiles.
- Phase 3 starts after manual mobile and desktop interaction checks. Product defects return to Phase 2.

