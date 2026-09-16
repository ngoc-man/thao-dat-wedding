# System Architecture

## Overview

The application is a static client-side wedding landing page. Vite serves and bundles React source; `main.jsx` mounts the root component and applies Motion's user reduced-motion configuration.

## Runtime Flow

```text
index.html
  -> src/main.jsx
     -> MotionConfig(reducedMotion="user")
        -> App
           -> Hero | Couple | Event Details | Gallery | Bank QR | Wishes | Thank You
              -> shared wedding data and reusable reveal components

Browser -> /api/wishes (Cloudflare Pages Function) -> Turnstile Siteverify
                                              -> Supabase wishes table
```

## Components

| Area | Responsibility |
| --- | --- |
| `src/app.jsx` | Renders the ordered invitation sections inside the visual shell. |
| `src/data/wedding.js` | Holds editable invitation content, image URLs, map URL, and one QR configuration. |
| `src/components/reveal.jsx` | Provides viewport-triggered entrance animation and shared section heading markup. |
| `src/sections/hero-section.jsx` | Calculates and displays the live countdown, couple names, and event anchor link. |
| `src/sections/event-details-section.jsx` | Shows ceremony details and opens the configured Google Maps URL in a new tab. |
| `src/sections/gallery-section.jsx` | Displays gallery thumbnails and manages local selected-image modal state. |
| `src/sections/bank-qr-section.jsx` | Renders the shared gift QR card, QR lightbox, and account-number copy control. |
| `src/sections/wishes-section.jsx` | Renders the guest-wish form and approved-wish list. |
| `functions/api/wishes.js` | Validates Turnstile server-side and reads/writes the Supabase table with a server-only credential. |
| `supabase/wishes.sql` | Creates and locks down the moderated `wishes` table. |
| `src/styles.css` | Imports Tailwind, defines font tokens, global layout rules, and reduced-motion CSS overrides. |

## Build and Dependencies

`vite.config.js` enables the React and Tailwind Vite plugins. Runtime dependencies are React, React DOM, Motion, Vite, and the React plugin; Tailwind packages are development dependencies. The supported commands are `npm run dev`, `npm run build`, and `npm run preview`.

## External Boundaries

- Google Fonts provides Bodoni Moda and Jost.
- Local `public/images` assets host the wedding images and shared QR code.
- Google Maps opens from the event-details link.
- Cloudflare Turnstile validates each submitted wish before storage.
- Supabase stores guest wishes as approved by default; the public endpoint returns them immediately after Turnstile validation.

Cloudflare Pages holds runtime secrets. Neither the Supabase secret key nor the Turnstile secret is bundled into the client.

## References

- [Vite configuration](../vite.config.js)
- [Application entry](../src/main.jsx)
- [Section exports](../src/sections/index.js)
