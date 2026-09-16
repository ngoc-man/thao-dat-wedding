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
- Moderated guest-wish section, Supabase table schema, and Cloudflare Pages Function API protected by Turnstile.

### Changed

- Root HTML document is Vietnamese (`lang="vi"`) and names the invitation in its title.
- Personalized the invitation for Ngọc Đạt and Nguyễn Thảo, including the displayed celebration dates.
- Split the ceremony details into Vu Quy in Thăng Điền, Đà Nẵng on 26 September 2026 and Thành Hôn in Đông Hà, Quảng Trị on 1 October 2026; each has its own Google Maps link.
- Revised the gift invitation and closing thank-you copy to emphasize that guests' presence and wishes are most valued.
- Replaced two QR cards with one shared QR image and added QR zoom plus an account-number copy icon.
- Changed guest wishes to show immediately after submission; unsuitable wishes can be deleted manually in Supabase.
- Restored one root invitation page with `qr.jpg` as the shared QR code, removed side-specific invitation routes, increased the QR card scale, and moved Vu Quy to 10:00.
- Replaced the ten placeholder gallery images with twenty-three optimized wedding photos supplied in `source-images/`.
- Expanded the gallery to twenty-four images with `DSC06367`, enlarged the desktop grid, and corrected four portrait crops to preserve faces.
- Added low-volume looping piano background music, a persistent sound toggle, subtle Hero sparkles, and a short heart burst after a successful wish submission.

### Notes

- Wedding images and QR are local public assets optimized for web delivery.
- Guest wishes require the documented Supabase and Cloudflare environment configuration before they accept submissions.

## References

- [Entry document](../index.html)
- [Wedding data](../src/data/wedding.js)
- [Gallery behavior](../src/sections/gallery-section.jsx)
