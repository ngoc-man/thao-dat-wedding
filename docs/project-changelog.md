# Project Changelog

All notable project changes are recorded here.

## 2026-09-13

### Added

- React/Vite wedding invitation page for Ngọc Đạt and Nguyễn Thảo.
- Tailwind CSS integration through the Vite plugin and a warm editorial visual theme using Bodoni Moda and Jost.
- Shared `wedding` content model for couple profiles, ceremony dates and venues, map links, gallery images, and gift details.
- Hero countdown to `2026-09-26T11:00:00+07:00`.
- Couple, event, gallery, gift QR, and thank-you sections.
- Motion reveal effects and gallery modal animation.
- Keyboard and pointer controls to close the gallery modal, plus visible keyboard focus styling.

### Changed

- Root HTML document is Vietnamese (`lang="vi"`) and names the invitation in its title.
- Personalized the invitation for Ngọc Đạt and Nguyễn Thảo, including the displayed celebration dates.
- Split the ceremony details into Vu Quy in Thăng Điền, Đà Nẵng on 26 September 2026 and Thành Hôn in Đông Hà, Quảng Trị on 1 October 2026; each has its own Google Maps link.
- Revised the gift invitation and closing thank-you copy to emphasize that guests' presence and wishes are most valued.

### Notes

- Images and QR codes are currently requested from external Unsplash and QR Server URLs at runtime.
- The app has no API endpoints, persistence, RSVP form, authentication, or payment processing.

## References

- [Entry document](../index.html)
- [Wedding data](../src/data/wedding.js)
- [Gallery behavior](../src/sections/gallery-section.jsx)
