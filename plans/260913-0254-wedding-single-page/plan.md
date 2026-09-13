---
title: "Wedding Single-Page Website"
description: "Plan a mobile-first luxury wedding page with countdown, event details, gallery, gifts, and thanks."
status: pending
priority: P2
effort: 18h
branch: not-applicable
tags: [feature, frontend]
blockedBy: []
blocks: []
work_type: feature
spec_waived: "SDD disabled"
created: 2026-09-13
---

# Wedding Single-Page Website

## Overview

Greenfield React + Vite + Tailwind CSS + Framer Motion site. One static route, responsive from 320px, with a cream/beige/rose-gold luxury-minimal system. No backend, CMS, RSVP, analytics, or payment flow.

## Data Flow

```text
typed wedding content + local assets
            ↓
App → semantic sections → countdown/lightbox → static Vite artifact
                               ↓
                        map URL / QR display
```

React owns composition plus countdown/lightbox state. Tailwind tokens own styling. Framer Motion adds restrained reveals and yields to `prefers-reduced-motion`.

## Phases

| Phase | Name | Status | Effort | Depends on |
|---|---|---|---:|---|
| 1 | [Foundation and content contract](./phase-01-foundation-and-content-contract.md) | Pending | 5h | None |
| 2 | [Page sections and interactions](./phase-02-page-sections-and-interactions.md) | Pending | 9h | Phase 1 |
| 3 | [Quality gates and release](./phase-03-quality-gates-and-release.md) | Pending | 4h | Phase 2 |

## Ownership

| Phase | Exclusive files |
|---|---|
| 1 | Tooling config, `src/styles/**`, `src/content/**`, `src/types/**`, base shell |
| 2 | `src/components/**`, `src/hooks/**`, `src/features/**`, final page composition |
| 3 | `tests/**` and test config; product defects return to their owning phase |

No parallel editing. No cross-plan dependency: the workspace contains no app or open plan.

## Compatibility and Rollback

- No legacy users, data, routes, or integrations to migrate.
- Target current Chrome, Safari, Firefox, and Edge; core content remains readable without motion.
- Deploy an immutable static artifact; rollback atomically to the prior artifact.

## Test Matrix

| Layer | Contract |
|---|---|
| Unit | Countdown boundaries, gallery index wrap, content shape |
| Integration | Section rendering, external link safety, lightbox keyboard/focus, reduced motion |
| End-to-end | Mobile/desktop journey, anchors, 10 photos, map and 2 QR cards, no console errors |
| Visual/performance | 320/768/1440px screenshots, accessibility scan, image and layout budgets |

## Observable Done

- Six requested sections render; all 10 photos open in an accessible lightbox; map and two verified QR cards work.
- No overflow, clipped controls, or unreadable copy at 320px, 768px, and 1440px.
- `npm run lint`, `npm run test -- --run`, `npm run test:e2e`, and `npm run build` exit 0.
- No serious/critical accessibility findings; Lighthouse targets Performance ≥90 and Accessibility ≥95 on the agreed profile.

