# Development Roadmap

## Overview

This roadmap tracks the single-page wedding invitation for Ngọc Đạt and Nguyễn Thảo. It is a Vite/React site with a Cloudflare Pages Function endpoint for moderated guest wishes.

## Current Status

| Phase | Status | Delivered outcome |
| --- | --- | --- |
| Foundation and content contract | Complete | Vite, React, Tailwind, Motion, and centralized wedding data are in place. |
| Invitation sections and interactions | Complete | Hero countdown, couple story, separate Vu Quy and Thành Hôn details, gallery lightbox, one shared QR card, and closing section are implemented. |
| Quality and release | In progress | Production build and browser validation remain release gates. |
| Guest wishes | In progress | Form, moderated display, Turnstile validation, Supabase schema, and Pages Function are ready; cloud bindings await owner configuration. |

## Delivered Scope

- Vietnamese landing page for Ngọc Đạt and Nguyễn Thảo, with Vu Quy on 26 September 2026 in Thăng Điền, Đà Nẵng and Thành Hôn on 1 October 2026 in Đông Hà, Quảng Trị.
- Smooth in-page navigation, Google Maps outbound links for both ceremonies, and responsive layouts.
- Ten-image gallery with click-to-open modal and Escape/backdrop/close-button dismissal.
- One public invitation at the root domain with a shared gift QR card and guest-first gift messaging.
- A guest-wish form plus public display of wishes. New submissions are visible immediately and may be deleted in Supabase if needed.
- Reduced-motion support through Motion's user preference setting and CSS media query.

## Next Milestone

Validate a production wish submission, display, and deletion before sharing the root invitation URL with guests.

## References

- [Application composition](../src/app.jsx)
- [Wedding content contract](../src/data/wedding.js)
- [Build scripts](../package.json)
