# Development Roadmap

## Overview

This roadmap tracks the single-page wedding invitation for Ngọc Đạt and Nguyễn Thảo. It is a Vite/React site with a Cloudflare Pages Function endpoint for moderated guest wishes.

## Current Status

| Phase | Status | Delivered outcome |
| --- | --- | --- |
| Foundation and content contract | Complete | Vite, React, Tailwind, Motion, and centralized wedding data are in place. |
| Invitation sections and interactions | Complete | Hero countdown, couple story, separate Vu Quy and Thành Hôn details, gallery lightbox, gift QR cards, and closing section are implemented. |
| Quality and release | In progress | Production build and browser validation remain release gates. |
| Guest wishes | In progress | Form, moderated display, Turnstile validation, Supabase schema, and Pages Function are ready; cloud bindings await owner configuration. |

## Delivered Scope

- Vietnamese landing page for Ngọc Đạt and Nguyễn Thảo, with Vu Quy on 26 September 2026 in Thăng Điền, Đà Nẵng and Thành Hôn on 1 October 2026 in Đông Hà, Quảng Trị.
- Smooth in-page navigation, Google Maps outbound links for both ceremonies, and responsive layouts.
- Ten-image gallery with click-to-open modal and Escape/backdrop/close-button dismissal.
- One shared gift QR card populated from the shared content module, accompanied by guest-first gift and thank-you messaging.
- A guest-wish form plus public display of approved wishes. New submissions remain hidden until approved in Supabase.
- Reduced-motion support through Motion's user preference setting and CSS media query.

## Next Milestone

Create the Supabase project and Turnstile widget, add the documented Cloudflare Pages secrets, then validate a submission, approval, display, and deletion on production.

## References

- [Application composition](../src/app.jsx)
- [Wedding content contract](../src/data/wedding.js)
- [Build scripts](../package.json)
