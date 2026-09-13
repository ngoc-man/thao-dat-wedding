# Development Roadmap

## Overview

This roadmap tracks the single-page wedding invitation for Ngọc Đạt and Nguyễn Thảo. It is a client-rendered Vite/React site; no server, database, or RSVP workflow is implemented.

## Current Status

| Phase | Status | Delivered outcome |
| --- | --- | --- |
| Foundation and content contract | Complete | Vite, React, Tailwind, Motion, and centralized wedding data are in place. |
| Invitation sections and interactions | Complete | Hero countdown, couple story, separate Vu Quy and Thành Hôn details, gallery lightbox, gift QR cards, and closing section are implemented. |
| Quality and release | In progress | Production build and browser validation remain release gates. |

## Delivered Scope

- Vietnamese landing page for Ngọc Đạt and Nguyễn Thảo, with Vu Quy on 26 September 2026 in Thăng Điền, Đà Nẵng and Thành Hôn on 1 October 2026 in Đông Hà, Quảng Trị.
- Smooth in-page navigation, Google Maps outbound links for both ceremonies, and responsive layouts.
- Ten-image gallery with click-to-open modal and Escape/backdrop/close-button dismissal.
- Two gift QR cards populated from the shared content module, accompanied by guest-first gift and thank-you messaging.
- Reduced-motion support through Motion's user preference setting and CSS media query.

## Next Milestone

Validate the production build, inspect the site at mobile and desktop breakpoints, and replace the current remote Unsplash and QR-service content only if production assets or payment details are approved.

## References

- [Application composition](../src/app.jsx)
- [Wedding content contract](../src/data/wedding.js)
- [Build scripts](../package.json)
