# System Architecture

## Overview

The application is a static client-side wedding landing page. Vite serves and bundles React source; `main.jsx` mounts the root component and applies Motion's user reduced-motion configuration.

## Runtime Flow

```text
index.html
  -> src/main.jsx
     -> MotionConfig(reducedMotion="user")
        -> App
           -> Hero | Couple | Event Details | Gallery | Bank QR | Thank You
              -> shared wedding data and reusable reveal components
```

## Components

| Area | Responsibility |
| --- | --- |
| `src/app.jsx` | Renders the ordered page sections inside the visual shell. |
| `src/data/wedding.js` | Holds editable invitation content, image URLs, map URL, and gift QR configuration. |
| `src/components/reveal.jsx` | Provides viewport-triggered entrance animation and shared section heading markup. |
| `src/sections/hero-section.jsx` | Calculates and displays the live countdown, couple names, and event anchor link. |
| `src/sections/event-details-section.jsx` | Shows ceremony details and opens the configured Google Maps URL in a new tab. |
| `src/sections/gallery-section.jsx` | Displays gallery thumbnails and manages local selected-image modal state. |
| `src/sections/bank-qr-section.jsx` | Maps configured gift records into QR cards. |
| `src/styles.css` | Imports Tailwind, defines font tokens, global layout rules, and reduced-motion CSS overrides. |

## Build and Dependencies

`vite.config.js` enables the React and Tailwind Vite plugins. Runtime dependencies are React, React DOM, Motion, Vite, and the React plugin; Tailwind packages are development dependencies. The supported commands are `npm run dev`, `npm run build`, and `npm run preview`.

## External Boundaries

- Google Fonts provides Bodoni Moda and Jost.
- Unsplash hosts the image URLs referenced by the page data and hero section.
- QR Server generates gift QR images from values encoded in their URLs.
- Google Maps opens from the event-details link.

No backend service, data store, environment configuration, or internal HTTP API is present.

## References

- [Vite configuration](../vite.config.js)
- [Application entry](../src/main.jsx)
- [Section exports](../src/sections/index.js)
