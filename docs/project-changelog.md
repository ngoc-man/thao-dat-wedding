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
- A polished root invitation selector that directs guests to the groom or bride invitation.
- Dedicated Vite HTML entries for direct `/groom` and `/bride` visits on Cloudflare Pages.

### Changed

- Root HTML document is Vietnamese (`lang="vi"`) and names the invitation in its title.
- Personalized the invitation for Ngọc Đạt and Nguyễn Thảo, including the displayed celebration dates.
- Split the ceremony details into Vu Quy in Thăng Điền, Đà Nẵng on 26 September 2026 and Thành Hôn in Đông Hà, Quảng Trị on 1 October 2026; each has its own Google Maps link.
- Revised the gift invitation and closing thank-you copy to emphasize that guests' presence and wishes are most valued.
- Replaced two QR cards with one shared QR image and added QR zoom plus an account-number copy icon.
- Split the public invitation into `/groom` and `/bride` while retaining one shared page implementation. The groom page uses the existing QR; the bride page uses Vietcombank account `1022565314` and `qr-bride.jpg`.
- Changed guest wishes to show immediately after submission; unsuitable wishes can be deleted manually in Supabase.
- Refined the invitation selector by raising the bride card image crop and removing its closing helper line.
- Stabilized invitation-card hover behavior: cards no longer shift position; only the background photo scales subtly.
- Made selector navigation client-side so selecting a side changes the invitation without requiring a full-page request.
- Replaced fallback-dependent route rewrites with dedicated entry documents, preventing Cloudflare Pages from redirecting invitation links to the selector.

### Notes

- Wedding images and QR are local public assets optimized for web delivery.
- Guest wishes require the documented Supabase and Cloudflare environment configuration before they accept submissions.

## References

- [Entry document](../index.html)
- [Wedding data](../src/data/wedding.js)
- [Gallery behavior](../src/sections/gallery-section.jsx)
